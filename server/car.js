class Car {
  constructor(hash, initX, initY) {
    this.hash = hash;
    this.lastUpdate = new Date().getTime();
    this.x = initX;
    this.y = initY;
    this.prevX = 0;
    this.prevY = 0;
    this.destX = 0;
    this.destY = 0;
    this.height = 100;
    this.width = 100;
    this.alpha = 0;
    this.moveLeft = false;
    this.moveRight = false;
    this.moveDown = false;
    this.moveUp = false;
    this.velocity = {};
    this.velocity.x = 0;
    this.velocity.y = 0;
    this.acceleration = {};
    this.acceleration.x = 0;
    this.acceleration.y = 0;
    this.drag = 0.01;
    this.state = 0;
    this.fillStyle = 'red';
    this.size = 12.5;
    this.health = 30;
    this.pull = 4;
  }
}

module.exports = Car;
