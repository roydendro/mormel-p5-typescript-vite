import type p5 from "p5";
import { Key } from "./Key";

// Constants.
export const BACKGROUND_COLOR = "black";
export const GRAVITY = 1.7;
export const MAX_SIZE = 120;
export const MIN_SIZE = 30;
export const MIN_INITIAL_SPEED = 40;
export const MAX_INITIAL_SPEED = 75;
export const MAX_SPEED = 100;
export const MIN_INITIAL_POSITION = 0;
export const MAX_INITIAL_POSITION = 400;
export const MAX_ROTATION_SPEED = 2;
export const HEADER_TEXT = "Mormel's website";
export const HEADER_MAX_LETTER_ROTATION = 15;
export const HEADER_MULTILINE_BREAKPOINT = 900;
export const HEADER_LETTER_SPACING = 10;

// Create arrays to hold keys.
let keys: Key[] = [];
let header: Key[] = [];

/**
 * Main sketch function.
 * @param {p5} p - The p5 instance
 */
export default function sketch(p: p5) {
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.angleMode(p.DEGREES);
        p.rectMode(p.CENTER);
        createHeaderKeys(p);
    };

    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        createHeaderKeys(p);
    };

    p.draw = () => {
        p.background(BACKGROUND_COLOR);

        header.forEach((key) => {
            key.show(p);
            // No need to update, always render the heading
        });

        keys.forEach((key) => {
            key.show(p);
            key.update();
            key.checkEdges(p);
        });

        keys = keys.filter((key) => key.alive);
    };

    const specialKeys: { [key: string]: string } = {
        Space: "SPACE",
        MetaLeft: "⌘",
        MetaRight: "⌘",
        ShiftLeft: "SHIFT",
        ShiftRight: "SHIFT",
        ControlLeft: "CTRL",
        ControlRight: "CTRL",
        AltLeft: "Alt",
        AltRight: "Alt",
        ArrowLeft: "←",
        ArrowRight: "→",
        ArrowUp: "↑",
        ArrowDown: "↓",
    };

    p.keyPressed = (e: KeyboardEvent) => {
        const key = specialKeys[e.code] || p.key;
        const x = p.random(0, p.windowWidth - MAX_SIZE);
        const y =
            p.windowHeight +
            p.random(MIN_INITIAL_POSITION, MAX_INITIAL_POSITION);
        const size = p.random(MIN_SIZE, MAX_SIZE);
        const speed = p.random(MIN_INITIAL_SPEED, MAX_INITIAL_SPEED);
        const color = getRandomBrightColor(p);
        const rotationSpeed = p.random(-MAX_ROTATION_SPEED, MAX_ROTATION_SPEED);

        keys.push(new Key(x, y, size, key, color, speed, 0, rotationSpeed));
    };
    p.mouseClicked = (e: MouseEvent) => {
        const key = "❤";
        const x = e.clientX;
        const y =
            p.windowHeight +
            p.random(MIN_INITIAL_POSITION, MAX_INITIAL_POSITION);
        const size = p.random(MIN_SIZE, MAX_SIZE);
        const speed = p.random(MIN_INITIAL_SPEED, MAX_INITIAL_SPEED);
        const color = getRandomBrightColor(p);
        const rotationSpeed = p.random(-MAX_ROTATION_SPEED, MAX_ROTATION_SPEED);

        keys.push(new Key(x, y, size, key, color, speed, 0, rotationSpeed));
        return false;
    };
}

/**
 * Function to create the header keys based on the window width.
 * @param {p5} p - The p5 instance
 */
const createHeaderKeys = (p: p5) => {
    // Reset header
    header = [];

    // Determine render mode
    const shouldMultiLine = p.windowWidth < HEADER_MULTILINE_BREAKPOINT;
    const lines = shouldMultiLine ? HEADER_TEXT.split(" ") : [HEADER_TEXT];

    // Determine letter size
    let currentLine = 1;
    const maxLineLength = shouldMultiLine
        ? lines.reduce((maxLength, str) => Math.max(maxLength, str.length), 0)
        : HEADER_TEXT.length;
    const size = p.windowWidth / (maxLineLength * 1.4);

    // Render each line
    for (const line of lines) {
        // Render each letter
        for (let i = 0; i < line.length; i++) {
            // Prevent spaces from being rendered as keys.
            if (line.charAt(i) !== " ") {
                const x =
                    p.width / 2 +
                    (size + HEADER_LETTER_SPACING) * (i - line.length / 2) +
                    size / 2;
                const y = currentLine * size * 1.1;
                const color = getRandomBrightColor(p);
                const rotation = p.random(
                    -HEADER_MAX_LETTER_ROTATION,
                    HEADER_MAX_LETTER_ROTATION,
                );

                header.push(
                    new Key(x, y, size, line.charAt(i), color, 0, rotation, 0),
                );
            }
        }
        currentLine++;
    }
};

/**
 * Function to get a random bright color.
 * @param {p5} p - The p5 instance
 * @returns {string} - A random bright color in HSL format.
 */
const getRandomBrightColor = (p: p5): string => {
    return p
        .color(`hsl(${Math.round(p.random(0, 360))}, 100%, 50%)`)
        .toString();
};
