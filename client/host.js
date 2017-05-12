const acknowledgeUser = (data) => {
  console.log('New User:');
  console.log(data.hash);
  hosted[data.hash] = data;
  cars[data.hash] = data;
};

const movementUpdate = (data) => {
  hosted[data.hash] = data;
  hosted[data.hash].lastUpdate = new Date().getTime();
  
  const car = cars[data.hash];
  
  if(!car) {
    return;
  }
  
  car.x = data.x;
  car.y = data.y;
  car.moveLeft = data.moveLeft;
  car.moveRight = data.moveRight;
  car.moveDown = data.moveDown;
  car.moveUp = data.moveUp;
  car.alpha = 0.05;
  car.velocity = data.velocity;
  car.acceleration = data.acceleration;
  car.drag = data.drag;
  car.state = data.state;
  car.fillStyle = data.fillStyle;
  car.size = data.size;
  car.health = data.health;
  
  socket.emit('hostUpdatedMovement', hosted[data.hash]);
};
