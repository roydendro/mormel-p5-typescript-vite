import type p5 from "p5";
import { GRAVITY, MAX_SPEED, MAX_INITIAL_POSITION } from "./sketch";

export class Key {
    x: number;
    y: number;
    size: number;
    letter: string;
    speed: number;
    alive: boolean;

    constructor(
        x: number,
        y: number,
        size: number,
        letter: string,
        speed: number = 4,
    ) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.letter = letter;
        this.speed = speed;
        this.alive = true;
    }

    show(p: p5) {
        if (!this.alive) {
            return;
        }

        // Drawing of the key
        p.noFill();
        p.stroke(255);
        p.strokeWeight(5);
        p.drawingContext.shadowOffsetX = 8;
        p.drawingContext.shadowOffsetY = 8;
        p.drawingContext.shadowBlur = 8;
        p.drawingContext.shadowColor = p.color(207, 7, 99);
        const width = this.size + (this.size / 1.5) * (this.letter.length - 1);
        p.rect(this.x, this.y, width, this.size, 15);

        // Drawing of the letter
        p.drawingContext.shadowOffsetX = 0;
        p.drawingContext.shadowOffsetY = 0;
        p.drawingContext.shadowBlur = 0;
        p.strokeWeight(1);
        p.fill(p.color(255, 255, 255));
        p.drawingContext.shadowColor = p.color(255, 255, 255, 0);
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(this.size - 10);
        p.text(this.letter, this.x + width / 2, this.y + this.size / 2);
    }

    update() {
        if (!this.alive) {
            return;
        }

        // Move in vertical direction.
        this.y = this.y - this.speed;
        // Update speed using gravity. Clamp to max speed.
        this.speed = Math.max(this.speed - GRAVITY, -MAX_SPEED);
    }

    checkEdges(p: p5) {
        if (!this.alive) {
            return;
        }

        if (this.y > p.height + 200 + MAX_INITIAL_POSITION) {
            this.alive = false;
        }
    }
}
