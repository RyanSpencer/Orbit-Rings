//Array of colors for the cars to be
const colors = ["red","green","blue","yellow","orange","purple","pink","cyan"];

//Universal Constants for cars
const CAR = Object.freeze ({
    //Max Accel used to accelerate
    MAX_ACCELERATION: 2.5,
    //Max velocity used to clamp speed
    MAX_VELOCITY: 7,
    //Number of cars that are spawned
    NUMB_CARS: 2,
});

const CAR_STATE = Object.freeze({
    DEFAULT: 0,
    EXPLODING: 1,
    DEAD: 2,
});

//Used for FPS and dt
let lastTime = 0;

//to display who won
let lastAlive = 0;

//Array of Characters to chose
const character = [
    //Name of the planet
    //Size is the radius of each planet
    //Health will represent in game as Millions of people
    //Gravitational pull which is multipled by gravitational algorthims
    //Note: Planets will ignore the effects of planets with gravitational pulls less than them
    {
        name: "earth",
        size: 12.5,
        health: 30,
        pull: 2,
    },
    {
        name: "mars",
        size: 20,
        health: 40,
        pull: 3,
    },
    {
        name: "mercury",
        size: 8,
        health: 20,
        pull: 1,
    }
];

const moveCar = (dt, car) => {
    //console.log(car.velocity);
    car.velocity.x += car.acceleration.x * dt;
    car.velocity.y += car.acceleration.y * dt;

    //Velocity is slowed by drag
    if (car.velocity.x > 0) {
        car.velocity.x -= car.drag;
    }
    else if (car.velocity.x < 0) {
        car.velocity.x += car.drag;

    }
    if (car.velocity.y > 0) {
        car.velocity.y -= car.drag;
    }
    else if (car.velocity.y < 0) {
        car.velocity.y += car.drag;
    }                  
    //console.log(car.velocity);
    //to check gravitational pull towards the sun
    const length = distance(car, sun);
    //If its inside the area of the effect then continue
    if (length > sun.core && length < sun.size) {
        //Get vectors of the suns position and the cars position and subtract them,
        //then normalize it and rotate at a 90 degree angle to create a quasi gravitational field
        let vec = new Victor(car.x + (car.size),  car.y + (car.size));
        let vec2 = new Victor(sun.x, sun.y);
        vec = vec.subtract(vec2);
        vec = vec.normalize();
        vec = vec.rotate(Math.PI/2);
        //Using the standard gravational equation of F = Gm1 + gm2 / length squared and applys it to the velocity
        const force = (sun.pull) * (car.size * sun.core)/Math.pow(length, 2);
        car.velocity.x += (vec.x * force);
        car.velocity.y += (vec.y * force);
    }
    //Clamp the velocity based on the max velocity
    car.velocity.x = clamp(car.velocity.x, -CAR.MAX_VELOCITY, CAR.MAX_VELOCITY);
    car.velocity.y = clamp(car.velocity.y, -CAR.MAX_VELOCITY, CAR.MAX_VELOCITY);

    //move based on velocity
    car.x += car.velocity.x;
    car.y += car.velocity.y;
}


//Move all the cars
const moveCars = (dt) => {
    let car = cars[hash];

    //First car is controlled using arrow keys
    let accel = false;
    //Acceleration is set to a constant while keys are down and then reset to zero when not
    if (car.moveUp) {
        car.acceleration.y = -CAR.MAX_ACCELERATION;
        accel = true;
    }
    if (car.moveDown) {
        car.acceleration.y = CAR.MAX_ACCELERATION;
        accel = true;
    }
    if (car.moveLeft) { 
        car.acceleration.x = -CAR.MAX_ACCELERATION;;
        accel = true;
    }
    if (car.moveRight) {
        car.acceleration.x = CAR.MAX_ACCELERATION;;
        accel = true;
    }
    if (!accel) {
        car.acceleration.x = 0;
        car.acceleration.y = 0;
    }
  
    //If this is the host client
    if(isHost) {
        //cars update time
        car.lastUpdate = new Date().getTime();
        //Move the car
        moveCar(dt, car);
      
        //Set the hosted version of the host car to our new moved car
        hosted[hash] = car
        //Check collisions of all hosted cars
        checkCollisions(dt);
        //update the car again so the car and hosted car are the same
        car = hosted[hash];
        //Send to all clients
        socket.emit('hostUpdatedMovement', car);
    } else {
        //Send back to host, host will calculate physics
        socket.emit('movementUpdate', car);
    }
};

//Collision detection oooooooh boi
const checkCollisions = (dt) => {
    
    const keys = Object.keys(hosted);
    //Loop through all cars
    for (let i = 0; i < keys.length; i++)
    {
        const car = hosted[keys[i]];
        //If they are dead ignore em
        if (car.state === CAR_STATE.DEAD) {
            continue;
        }
        //If cars are at any of the screen edges they bounce a little bit and can't move past them
        if (car.x <= 0) {
            car.velocity.x *= -0.4;
            car.x = 0;
            moveCar(dt, car);
        }
        if (car.x + car.size * 2 >= WIDTH){
            car.velocity.x *= -0.4;
            car.x = WIDTH - car.size * 2;
            moveCar(dt, car);
        }
        if (car.y <= 0 ){
            car.velocity.y *= -0.4;
            car.y = 0;
            moveCar(dt, car);
        }
        if (car.y + car.size * 2 >= HEIGHT){
            car.velocity.y *= -0.4;
            car.y = HEIGHT - car.size * 2;
            moveCar(dt, car);
        }

        //They also bounce off the sun
        if (distance(car, sun) < (car.size + sun.core) ) {
            car.velocity.y *= -0.8;
            car.velocity.x *= -0.8;
            moveCar(dt, car);
        }
        //loop through the cars a second time to check car on car action
        for (let j = 0; j < keys.length; j++) {
            const car2 = hosted[keys[j]];
            
            //skip through if the car is dead or its the same car
            if (car2.state === CAR_STATE.DEAD) continue;
            if (i == j) {continue; }

            //Call collision on the two cars
            if (aabb(car, car2)) {

                //make them bounce off of each other
                car.velocity.y *= -0.8;
                car.velocity.x *= -0.8;
                car2.velocity.y *= -0.8;
                car2.velocity.x *= -0.8;

                //Cody created code to stop them from going inside one another
                //Basically move them slightly in the x or y direciton when they collide
                if (car.x > car2.x) {
                    car.x++;
                }
                else {
                    car2.x++;
                }

                if (car.y > car2.y) {
                    car.y++;
                }
                else {
                    car2.y++;
                }

                //Call move once to make sure actions actualy take palce
                moveCar(dt, car);
                moveCar(dt, car2);

                //Calculate health loss
                //Larger cars take less damage agaisnt smaller cars and vice versa
                let sizeDif = car2.size/car.size;
                //Cars which have a slower x velocity do bad agasint ones with faster x velocity
                let xVelDif = (Math.abs(car2.velocity.x) - Math.abs(car.velocity.x));
                //If its too small change it to prevent odd corner cases
                if (xVelDif <= 0.5) xVelDif = 0.5;
                //Same thing with y velocity
                let yVelDif = (Math.abs(car2.velocity.y) - Math.abs(car.velocity.y));
                if (yVelDif <= 0.5) yVelDif = 0.5;

                //Subtract from overall health based on all factors
                car.health -= sizeDif * xVelDif * yVelDif;

                //Same thing for the other car colliding
                sizeDif = car.size/car2.size;
                xVelDif = (Math.abs(car.velocity.x) - Math.abs(car2.velocity.x));
                if (xVelDif <= 0.5) xVelDif = 0.5;
                yVelDif = (Math.abs(car.velocity.y) - Math.abs(car2.velocity.y));
                if (yVelDif <= 0.5) yVelDif = 0.5;

                car2.health -=  sizeDif * xVelDif * yVelDif;

                //If either car drops to zero health or less they die
                if (car.health <= 0) {
                    car.state = CAR_STATE.DEAD;
                }
                if (car2.health <= 0) {
                    car2.state = CAR_STATE.DEAD;
                }
            }
        }
    }
};
//Take from boomshine to smooth animation
const calculateDeltaTime = () =>{
    let now,fps;
    now = performance.now(); 
    fps = 1000 / (now - lastTime);
    fps = clamp(fps, 12, 60);
    lastTime = now; 
    return 1/fps;
};     
