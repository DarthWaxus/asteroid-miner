
import Graphics = Phaser.GameObjects.Graphics;
import { Rocket } from './Rocket';
import { GameScene } from "../scenes/GameScene.ts";
import { StageObject } from "./StageObject";
import { Player } from "./Player";

export class MainBase extends StageObject {
radius:number = 60;
    constructor(scene: GameScene) {
        super(scene);
        scene.physics.add.existing(this);

        const graphics = new Graphics(this.scene);
        this.add(graphics);

        const body = this.body as Phaser.Physics.Arcade.Body;
        body.setCircle(this.radius);
        body.setImmovable(true);

        graphics.fillStyle(0x0000ff, 0.5);
        graphics.fillCircle(0, 0, this.radius);

        const rocket = new Rocket(this.scene);
        this.add(rocket);

        this.setRandomPositionOnSurface(rocket);

        const player = new Player(scene);
        this.add(player);

        this.setRandomPositionOnSurface(player);
    }

    private setRandomPositionOnSurface(obj:StageObject){
        const angle = Phaser.Math.Between(0, 360) * Phaser.Math.DEG_TO_RAD;

        const x = Math.cos(angle) * this.radius;
        const y = Math.sin(angle) * this.radius;

        obj.x = x;
        obj.y = y;
        obj.rotation = angle + Math.PI / 2;
    }

    public update() {
        this.rotation += 0.01;
    }
}
