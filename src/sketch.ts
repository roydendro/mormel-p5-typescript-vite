import type p5 from "p5";
import { Key } from "./Key";

// Create an array that will hold keys.
const keys: Key[] = [];

// Constants.
export const GRAVITY = 1.7;
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const MAX_SIZE = 120;
const MIN_SIZE = 40;
const MIN_INITIAL_SPEED = 50;
const MAX_INITIAL_SPEED = 75;
export const MAX_SPEED = 100;
const MIN_INITIAL_POSITION = 0;
export const MAX_INITIAL_POSITION = 400;

export default function sketch(p: p5) {
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);

        // Add Key objects to the array.
        for (let i = 0; i < 5; i += 1) {
            // Calculate random coordinates and size.
            const x = p.random(0, p.windowWidth);
            const y = p.random(0, p.windowHeight);
            const size = p.random(MIN_SIZE, MAX_SIZE);
            const letter = p.random(0, 25);

            // Create a new Key object.
            const key = new Key(x, y, size, LETTERS[Math.round(letter)]);

            // Add the Key to the array.
            keys.push(key);
        }

        // Slow the frame rate.
        p.frameRate(60);
    };

    p.draw = () => {
        p.background("black");

        for (const key of keys) {
            // Show the key.
            key.show(p);

            // Move the key.
            key.update(p);

            // Wrap around if they've moved off the canvas
            key.checkEdges(p);
        }
    };
    p.keyPressed = (e: KeyboardEvent) => {
        let key = null;
        if (e.code === "ENTER") {
            key = "ENTER";
        } else if (e.code === "Space") {
            key = "SPACE";
        } else if (e.code === "MetaLeft" || e.code === "MetaRight") {
            key = "CMD";
        } else if (e.code === "ShiftLeft" || e.code === "ShiftRight") {
            key = "SHIFT";
        } else if (e.code === "ControlRight" || e.code === "ControlRight") {
            key = "CTRL";
        } else if (e.code === "AltRight" || e.code === "AltLeft") {
            key = "Opt";
        }

        keys.push(
            new Key(
                p.random(0, p.windowWidth - MAX_SIZE),
                p.windowHeight +
                    p.random(MIN_INITIAL_POSITION, MAX_INITIAL_POSITION),
                p.random(MIN_SIZE, MAX_SIZE),
                key || p.key,
                p.random(MIN_INITIAL_SPEED, MAX_INITIAL_SPEED),
            ),
        );
    };
}
