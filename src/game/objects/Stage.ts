import {GameScene} from "../scenes/GameScene.ts";
import {Asteroid} from "./Asteroid.ts";
import {FlyingObject} from "./FlyingObject.ts";
import Container = Phaser.GameObjects.Container;
import {MainBase} from "./MainBase.ts";

export class Stage extends Container {
    public mainBase: MainBase;
    private maxAsteroids: number = 30;
    private asteroidCreationTimer: Phaser.Time.TimerEvent;

    constructor(scene: GameScene, x: number, y: number) {
        super(scene, x, y);
        scene.add.existing(this);

        this.mainBase = new MainBase(scene);
        this.add(this.mainBase);
        this.mainBase.x = this.scene.cameras.main.width / 2;
        this.mainBase.y = this.scene.cameras.main.height / 2;

        this.scene.events.on('object-destroyed', this.onObjectDestroyed, this);

        // Create initial asteroids
        const initialAsteroidCount = Math.floor(Math.random() * 11) + 5; // 5 to 15
        for (let i = 0; i < initialAsteroidCount; i++) {
            this.createInitialAsteroid();
        }

        this.asteroidCreationTimer = this.scene.time.addEvent({
            delay: 5000,
            callback: this.createAsteroid,
            callbackScope: this,
            loop: true
        });
    }

    private createInitialAsteroid() {
        const camera = this.scene.cameras.main;
        const x = Math.random() * camera.width;
        const y = Math.random() * camera.height;

        const asteroid = new Asteroid(this.scene as GameScene, x, y);
        this.add(asteroid);

        const direction = Math.random() * 2 * Math.PI;
        const speed = Math.random() * 30 + 20;
        const rotationSpeed = (Math.random() - 0.5) * 2;
        asteroid.setMovement(direction, speed, rotationSpeed);
    }

    private createAsteroid() {
        if (this.list.length >= this.maxAsteroids) {
            return; // Stop creating asteroids if the limit is reached
        }

        const radius = 1500;
        const angle = Math.random() * Math.PI * 2;

        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        const asteroid = new Asteroid(this.scene as GameScene, x, y);
        this.add(asteroid);

        // Target is (0,0) with a small random offset
        const targetX = this.scene.cameras.main.width / 2 + (Math.random() - 0.5) * 400; // Random offset up to 200 from origin
        const targetY = this.scene.cameras.main.height / 2 + (Math.random() - 0.5) * 400;

        const direction = Math.atan2(targetY - y, targetX - x);
        const speed = Math.random() * 30 + 50;
        const rotationSpeed = (Math.random() - 0.5) * 2;

        asteroid.setMovement(direction, speed, rotationSpeed);
    }

    private onObjectDestroyed(object: FlyingObject) {
        if (object instanceof Asteroid) {
            const creationCount = Math.floor(Math.random() * 3) + 1; // 1 to 3
            for (let i = 0; i < creationCount; i++) {
                this.createAsteroid();
            }
        }
    }

    destroy(fromScene?: boolean) {
        this.asteroidCreationTimer?.destroy();
        super.destroy(fromScene);
    }
}
