import {FlyingObject} from "./FlyingObject.ts";
import {GameScene} from "../scenes/GameScene.ts";

export class Asteroid extends FlyingObject{
    private static readonly ASTEROID_COLOR = 0xffffff;
    private static readonly CRATER_COLOR = 0xffffff; // Darker color for craters

    constructor(scene: GameScene, x: number, y: number) {
        super(scene,x,y);

        const graphics = scene.add.graphics();
        this.add(graphics);
        const radius = 50;

        // Draw asteroid body
        graphics.fillStyle(Asteroid.ASTEROID_COLOR, 1);
        graphics.fillCircle(0, 0, radius);

        // Draw craters
        graphics.fillStyle(Asteroid.CRATER_COLOR, 1);
        let currentAngle = 0;
        while (currentAngle < 2 * Math.PI) {
            const craterWidth = 15 + Math.random() * 15;
            const craterHeight = 8 + Math.random() * 8;

            const angularWidth = Math.atan2(craterWidth, radius);

            if (currentAngle + angularWidth > 2 * Math.PI) {
                break; // No more space for another crater
            }

            const angle = currentAngle + angularWidth / 2;

            const craterX = Math.cos(angle) * (radius - craterHeight / 2);
            const craterY = Math.sin(angle) * (radius - craterHeight / 2);

            const hw = craterWidth / 2;
            const hh = craterHeight / 2;
            const points = [
                { x: -hw, y: -hh },
                { x:  hw, y: -hh },
                { x:  hw, y:  hh },
                { x: -hw, y:  hh }
            ];

            const cos = Math.cos(angle);
            const sin = Math.sin(angle);

            const finalPoints = points.map(p => {
                const rotatedX = p.x * cos - p.y * sin;
                const rotatedY = p.x * sin + p.y * cos;
                return {
                    x: rotatedX + craterX,
                    y: rotatedY + craterY
                };
            });

            graphics.fillPoints(finalPoints, true);

            const gap = Math.random() * 0.3 + 0.1; // Add a random gap
            currentAngle += angularWidth + gap;
        }
    }
}