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
    /**
     * The setup function is called once when the program starts.
     * It initializes the canvas and sets up any necessary variables.
     */
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
    };

    /**
     * The windowResized function is called whenever the window is resized.
     * It updates the canvas size to match the new window dimensions.
     */
    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    };

    /**
     * The main draw loop of the p5 sketch.
     * This function is called repeatedly until the program is stopped.
     * It is responsible for drawing the canvas and updating the state of the keys.
     */
    p.draw = () => {
        p.background("black");

        for (const key of keys) {
            // Call the show method of the key to draw it on the canvas.
            key.show(p);

            // Call the update method of the key to update its position and speed.
            key.update();

            // Call the checkEdges method of the key to check if it has moved off the canvas
            key.checkEdges(p);

            // If the key is no longer alive, remove it from the keys array so we don't draw and update it anymore.
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
