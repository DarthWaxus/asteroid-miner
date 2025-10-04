
import Graphics = Phaser.GameObjects.Graphics;
import Container = Phaser.GameObjects.Container;
import Body = Phaser.Physics.Arcade.Body;
import {GameScene} from "../scenes/GameScene.ts";
import Vector2 = Phaser.Math.Vector2;

export class Player extends Container {

  public isDocked: boolean = true;

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

  public undock() {
    if (!this.isDocked) {
      return;
    }
    this.isDocked = false;

    const matrix = this.getWorldTransformMatrix();

    const worldPosition = new Vector2();
    matrix.transformPoint(0, 0, worldPosition);
    const worldRotation = matrix.rotation;

    const gameScene = this.scene as GameScene;
    gameScene.stage.add(this);

    this.x = worldPosition.x;
    this.y = worldPosition.y;
    this.rotation = worldRotation;

    const body = this.body as Body;
    const speed = 200;
    const velocityAngle = worldRotation - (Math.PI / 2);
    body.setVelocityFromRotation(velocityAngle, speed);
  }

  public dockTo(container: Container) {
    this.isDocked = true;

    this.x = 0;
    this.y = 0;
    this.rotation = 0;
    const body = this.body as Body;
    body.setVelocity(0, 0);
    container.add(this);
  }
}
