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

    //console.log(car.x);
    //console.log(car.moveLeft);
    //console.log(car.acceleration.x);
    //console.log(dt);

    //set the regular cars array
    const car2 = cars[car.hash];

    if(!car2) {
      return;
    }

    car2.prevX = car.prevX;
    car2.prevY = car.prevY;
    car2.destX = car.destX;
    car2.destY = car.destY;
    car2.x = car.x;
    car2.y = car.y;
    car2.moveLeft = car.moveLeft;
    car2.moveRight = car.moveRight;
    car2.moveDown = car.moveDown;
    car2.moveUp = car.moveUp;
    car2.alpha = 0.05;
    car2.velocity = car.velocity;
    car2.acceleration = car.acceleration;
    car2.drag = car.drag;
    car2.state = car.state;
    car2.fillStyle = car.fillStyle;
    car2.size = car.size;
    car2.health = car.health;
    car2.pull = car.pull;

  socket.emit('hostUpdatedMovement', car);
  }
  
};

//Sends other players information to the host
const movementUpdate = (data) => {
  //if (data.lastUpdate < hosted[data.hash].lastUpdate) return;
  //Update the hosted car
  hosted[data.hash] = data;
};
