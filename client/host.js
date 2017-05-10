const acknowledgeUser = (data) => {
  console.log('New User:');
  console.log(data.hash);
  hosted[data.hash] = data;
  cars[data.hash] = data;
};

const updateClientCar = (dt) => {
  const keys = Object.keys(hosted);
  for (let i = 0; i < keys.length; i++) {
    let car = hosted[keys[i]];
    if (car.hash === hash) continue;
    //Get dt, then move the car and check collisons
    moveCar(dt, car);
    checkCollisions(dt)

    //Update last time updated
    car.lastUpdate = new Date().getTime();

    console.log(car.x);
    console.log(car.y);
    console.log(car.destX);
    console.log(car.destY);
    //console.log(car.alpha);
    console.log(car.velocity.x);
    console.log(dt);

    //set the regular cars array
    const car2 = cars[car.hash];

    if(!car2) {
      return;
    }

    car2.prevX = car.prevX;
    car2.prevY = car.prevY;
    car2.destX = car.destX;
    car2.destY = car.destY;
    car2.moveLeft = car.moveLeft;
    car2.moveRight = car.moveRight;
    car2.moveDown = car.moveDown;
    car2.moveUp = car.moveUp;
    car2.velocity = car.velocity;
    car2.acceleration = car.acceleration;
    car2.state = car.state;
    car2.health = car.health;

  socket.emit('hostUpdatedMovement', car);
  }
  
};

//Sends other players information to the host
const movementUpdate = (data) => {
  if((cars[data.hash].lastUpdate < data.lastUpdate)) {
     //Update the hosted car
    const car = hosted[data.hash];
    car.prevX = data.prevX;
    car.prevX = data.prevX;
    car.prevY = data.prevY;
    car.destX = data.destX;
    car.destY = data.destY;
    car.moveLeft = data.moveLeft;
    car.moveRight = data.moveRight;
    car.moveUp = data.moveUp;
    car.moveDown = data.moveDown;
    car.alpha = 0.05;
    car.velocity = data.velocity;
    car.acceleration = data.acceleration;
    car.drag = data.drag;
    car.state = data.state;
    car.health = data.health;
    car.fillStyle =data.fillStyle;
  }
};
