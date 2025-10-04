import {GameScene} from "../scenes/GameScene.ts";
import Body = Phaser.Physics.Arcade.Body;
import { StageObject } from "./StageObject";

export class FlyingObject extends StageObject {
    body: Body;
    public rotationSpeed: number = 0;

    constructor(scene: GameScene, x: number, y: number) {
        super(scene, x, y);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Set a circular physics body. The radius is approximated from the display size.
        const radius = (this.width + this.height) / 4;
        this.body.setCircle(radius);
        this.body.setBounce(1, 1);
        this.body.setCollideWorldBounds(false); // Allow objects to fly off-screen

        this.setMovement(Math.random() * 2 * Math.PI, Math.random() * 100 + 50, (Math.random() - 0.5) * 2);
    }

    setMovement(direction: number, speed: number, rotationSpeed: number) {
        const velocityX = Math.cos(direction) * speed;
        const velocityY = Math.sin(direction) * speed;
        this.body.setVelocity(velocityX, velocityY);
        this.rotationSpeed = rotationSpeed;
    }

    update(time: number, delta: number) {
        super.update(time, delta);
        // Position is now updated by the physics engine, so we only need to handle rotation and destruction.
        this.rotation += this.rotationSpeed * (delta / 1000);
        const cam = this.scene.cameras.main;
        const distance = Phaser.Math.Distance.Between(cam.width/2, cam.height/2, this.x, this.y);
        if (distance > 2000) {
            this.scene.events.emit('object-destroyed', this);
            this.destroy();
        }
    }
}
