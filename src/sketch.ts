import type p5 from "p5";
import { Key } from "./Key";

// Create an array that will hold keys.
const keys: Key[] = [];

// Constants.
export const GRAVITY = 1.7;
export const MAX_SIZE = 120;
export const MIN_SIZE = 40;
export const MIN_INITIAL_SPEED = 50;
export const MAX_INITIAL_SPEED = 75;
export const MAX_SPEED = 100;
export const MIN_INITIAL_POSITION = 0;
export const MAX_INITIAL_POSITION = 400;

export default function sketch(p: p5) {
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
    };
    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    };

    p.draw = () => {
        p.background("black");

        for (const key of keys) {
            // Show the key.
            key.show(p);

            // Move the key.
            key.update();

            // Wrap around if they've moved off the canvas
            key.checkEdges(p);

            if (!key.alive) {
                keys.splice(keys.indexOf(key), 1);
            }
        }
    };
    /**
     * Handles key press events and creates new Key objects.
     * @param e - The keyboard event.
     */
    p.keyPressed = (e: KeyboardEvent) => {
        let key = null;

        // Map specific "special" keys to a different output.
        if (e.code === "Space") {
            key = "SPACE";
        } else if (e.code === "MetaLeft" || e.code === "MetaRight") {
            key = "CMD";
        } else if (e.code === "ShiftLeft" || e.code === "ShiftRight") {
            key = "SHIFT";
        } else if (e.code === "ControlRight" || e.code === "ControlLeft") {
            key = "CTRL";
        } else if (e.code === "AltRight" || e.code === "AltLeft") {
            key = "Opt";
        } else if (e.code === "ArrowLeft") {
            key = "←";
        } else if (e.code === "ArrowRight") {
            key = "→";
        } else if (e.code === "ArrowUp") {
            key = "↑";
        } else if (e.code === "ArrowDown") {
            key = "↓";
        }
        console.log(`hsl(${p.random(0, 360)}, 100%, 50%)`);
        // Create a new Key object with random position, size, and speed.
        // If the key is not a special key, use the pressed key's character.
        keys.push(
            new Key(
                p.random(0, p.windowWidth - MAX_SIZE),
                p.windowHeight +
                    p.random(MIN_INITIAL_POSITION, MAX_INITIAL_POSITION),
                p.random(MIN_SIZE, MAX_SIZE),
                key || p.key,
                p
                    .color(`hsl(${Math.round(p.random(0, 360))}, 100%, 50%)`)
                    .toString(),
                p.random(MIN_INITIAL_SPEED, MAX_INITIAL_SPEED),
            ),
        );
    };
}
