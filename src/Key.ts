import type p5 from "p5";

import { GRAVITY, MAX_SPEED } from "./sketch";

export class Key {
    // Positioning parameters
    x: number;
    y: number;
    // Properties for rendering
    size: number;
    letter: string;
    color: string;
    // Movement parameters
    speed: number;
    alive: boolean;
    angle: number;
    rotationSpeed: number;

    constructor(
        x: number,
        y: number,
        size: number,
        letter: string,
        color: string,
        speed: number = 4,
        angle: number = 0,
        rotationSpeed: number,
    ) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.letter = letter;
        this.color = color;
        this.speed = speed;
        this.alive = true;
        this.angle = angle;
        this.rotationSpeed = rotationSpeed;
    }

    show(p: p5) {
        if (!this.alive) {
            return;
        }

        p.push();
        p.translate(this.x, this.y);
        p.rotate(this.angle);

        // Start drawing of the key
        // Neon glow efect properties
        const ctx = p.drawingContext;
        ctx.shadowOffsetX = 4;
        ctx.shadowOffsetY = 4;
        ctx.shadowBlur = 12;
        ctx.shadowColor = this.color;

        // Shape properties
        p.fill(0);
        p.stroke(255);
        p.strokeWeight(5);
        // Sizing bases on amount of letters
        const width = this.size + (this.size / 1.5) * (this.letter.length - 1);
        // Render
        p.rect(0, 0, width, this.size, 15);

        // Start drawing of the letter
        // Neon glow efect properties
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 4;
        // Text render properties
        p.strokeWeight(0);
        p.fill(p.color(255, 255, 255));
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(this.size - 10);
        // Render
        p.text(this.letter, 0, 0);

        p.pop();
    }

    update() {
        if (!this.alive) {
            return;
        }

        // Move in vertical direction.
        this.y = this.y - this.speed;
        // Update speed using gravity. Clamp to max speed.
        this.speed = Math.max(this.speed - GRAVITY, -MAX_SPEED);
        // Update the angle of the key based on the rotation speed. Use modulus to keep the angle between 0 and 360.
        this.angle = (this.angle + this.rotationSpeed) % 360;
    }

    checkEdges(p: p5) {
        if (!this.alive) {
            return;
        }

        // If the key is off the bottom of the screen, it is no longer alive.
        // Take into account the speed, so we don't kill it while its still moving up.
        if (this.speed < 0 && this.y > p.height) {
            this.alive = false;
        }
    }
}
