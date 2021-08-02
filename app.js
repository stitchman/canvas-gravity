import { Splash } from "./splash.js";

const GRAVITY = 0.3;
const FRICTION_GROUND = 0.99;
const FRICTION_AIR = 0.99;
const TOTALBALLS = 15;
const BALL_RADIUS = 12;
const BALL_VELOCITY = 10;
const COLORS = ["#4285F4", "#DB4437", "#F4B400", "#0F9D58"];

class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    this.splashes = [];
    document.addEventListener("click", (e) => {
      const splash = new Splash(
        e.clientX,
        e.clientY,
        COLORS,
        TOTALBALLS,
        BALL_RADIUS,
        BALL_VELOCITY
      );
      this.splashes.push(splash);
      console.log(this.splashes);
    });

    window.requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;

    this.ctx.scale(this.pixelRatio, this.pixelRatio);
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));

    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    this.splashes.forEach((splash) => {
      splash.draw(
        this.ctx,
        this.stageWidth,
        this.stageHeight,
        GRAVITY,
        FRICTION_AIR,
        FRICTION_GROUND
      );
    });
  }
}

window.onload = () => {
  new App();
};
