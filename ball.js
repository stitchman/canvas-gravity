export class Ball {
  constructor(x, y, color, radius, vx, vy) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = radius;
    this.vx = vx;
    this.vy = vy;
  }

  update(stageWidth, stageHeight, gravity, frictionAir, frictionGround) {
    if (this.x - this.radius < 0 || this.x + this.radius > stageWidth) {
      this.vx *= -1 * frictionGround;
      this.x += this.vx;
    } else {
      this.vx *= frictionAir;
      this.vy *= frictionAir;
      this.x += this.vx;
      this.y += this.vy;
    }

    if (this.y + this.radius + this.vy >= stageHeight && this.vy >= -gravity) {
      this.vy *= -1 * frictionGround;
    } else {
      this.vy += gravity;
    }
    this.y += this.vy;
  }

  draw(ctx, stageWidth, stageHeight, gravity, frictionAir, frictionGround) {
    this.update(stageWidth, stageHeight, gravity, frictionAir, frictionGround);

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }
}
