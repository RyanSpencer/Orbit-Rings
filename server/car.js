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
    this.direction = 0;
    this.spriteWidth = 512;
    this.spriteHeight = 512;
    this.spriteColor = "red";
    this.velocity = {};
    this.velocity.x = 0;
    this.velocity.y = 0;
    this.acceleration = {};
    this.acceleration.x = 0;
    this.acceleration.y = 0;
    this.drag = 0.01;
    this.state = 0;
    this.fillStyle = 'red';
    this.size = 20;
    this.health = 30;
    this.pull = 4;
    this.image = undefined;
  }
}

module.exports = Car;
