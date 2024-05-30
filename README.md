# P5.js experience for Mormel

## Introduction

This is an experience made for Mormel, built with p5.js and TypeScript.

The project is built with Vite and deployed to GitHub Pages using GitHub Actions.

Enabled linting using ESLint and formatting using Prettier.

Visit the project at https://mormel.roydendro.com

BTW: [This](/docs/mormel.jpg) is Mormel.

## Description

Mormel likes pushing random buttons on the keyboard, so I made this website especially for him so he can play around and get some nice visual feedback.

Secondly, this is my first time working with P5.js; I wanted to explore a bit how it works.

## Getting Started

To get started with development, you need to run the following commands.

```
nvm use
npm i
npm run dev
```

## Notes and caveats

-   Formatting and linting using Prettier and ESLint are not automatically executed before pushing or during the GitHub Actions workflow.
-   Mormel would love some sound effects as well.
-   Currently, the speeds of the keys are static and not based on the viewport size, so on small windows, the keys might fly by a bit too fast.
-   Due to physics, Mormel can't operate a touch screen, and thus I did not build support for it.
