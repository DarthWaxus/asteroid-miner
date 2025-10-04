
import Graphics = Phaser.GameObjects.Graphics;
import { Rocket } from './Rocket';
import { GameScene } from "../scenes/GameScene.ts";
import { StageObject } from "./StageObject";

export class MainBase extends StageObject {

    constructor(scene: GameScene) {
        super(scene);
        scene.physics.add.existing(this);

        const graphics = new Graphics(this.scene);
        this.add(graphics);

        const radius = 60;

        const body = this.body as Phaser.Physics.Arcade.Body;
        body.setCircle(radius);
        body.setImmovable(true);

        graphics.fillStyle(0x0000ff, 0.5);
        graphics.fillCircle(0, 0, radius);

        const rocket = new Rocket(this.scene);
        this.add(rocket);

        const angle = Phaser.Math.Between(0, 360) * Phaser.Math.DEG_TO_RAD;

        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        rocket.x = x;
        rocket.y = y;
        rocket.rotation = angle + Math.PI / 2;
    }

    public update() {
        this.rotation += 0.01;
    }
}
