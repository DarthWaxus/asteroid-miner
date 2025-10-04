
import Graphics = Phaser.GameObjects.Graphics;
import Container = Phaser.GameObjects.Container;
import Body = Phaser.Physics.Arcade.Body;
import {GameScene} from "../scenes/GameScene.ts";

export class Player extends Container {

  constructor(scene:GameScene) {
    super(scene);

    const graphics = new Graphics(this.scene);
    this.add(graphics);

    graphics.fillStyle(0xffffff);

    // Draw the rectangle
    graphics.fillRect(-6, -8, 12, 16);

    // Draw the circle on top
    graphics.fillCircle(0, -10, 10);

    this.scene.physics.add.existing(this);
    const body = this.body as Body;
    body.setSize(12, 16);
  }
}
