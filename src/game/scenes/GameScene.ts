import { Scene } from 'phaser';
import { Stage } from '../objects/Stage.ts';
import { FlyingObject } from '../objects/FlyingObject.ts';
import {StageObject} from "../objects/StageObject.ts";
import {Asteroid} from "../objects/Asteroid.ts";
import {Player} from "../objects/Player.ts";

export class GameScene extends Scene
{
    public camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    msg_text : Phaser.GameObjects.Text;
    stage: Stage;

    constructor ()
    {
        // We must enable physics for this scene
        super({
            key: 'GameScene',
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 0 } // No gravity in space
                }
            }
        });
    }

    create ()
    {
        this.camera = this.cameras.main;

        this.stage = new Stage(this, 0, 0);

        // Now, tell the physics engine to handle collisions between all objects in the stage.
        // The objects will bounce off each other automatically.
        this.physics.add.collider(this.stage.list, this.stage.list);

        this.input.on('pointerdown', () => {
            this.stage.mainBase.player.undock();
        });

        this.physics.add.collider(
            this.stage.mainBase.player,
            this.stage.list.filter(obj => obj instanceof Asteroid),
            (player, asteroid) => {
                const p = player as Player;
                if (!p.isDocked) {
                    p.dockTo(asteroid as Asteroid);
                }
            }
        );
    }

    update(time: number, delta: number) {
        // The physics engine handles all movement and collisions.
        // We just need to call our custom update method for things like rotation and the off-screen check.
        this.stage.list.forEach((child) => {
            if (child instanceof StageObject) {
                child.update(time, delta);
            }
        });
    }
}
