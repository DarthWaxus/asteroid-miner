
import Graphics = Phaser.GameObjects.Graphics;
import { StageObject } from "./StageObject";

export class Rocket extends StageObject {

  constructor(scene) {
    super(scene);

    const graphics = new Graphics(this.scene);
    this.add(graphics);

    graphics.fillStyle(0xffffff);

    graphics.fillRect(-15, 0, 30, 50);

    graphics.beginPath();
    graphics.moveTo(0, -20);
    graphics.lineTo(-15, 0);
    graphics.lineTo(15, 0);
    graphics.closePath();
    graphics.fillPath();
    graphics.y = -45;
  }
}
