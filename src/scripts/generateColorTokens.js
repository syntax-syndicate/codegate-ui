// code mostly copied from my personal project and modified with ChatGPT
// used to generate color tokens based on contrast values

import { writeFileSync } from "fs";
import { join } from "path";
import path from "path";
import { fileURLToPath } from "url";
import { Theme, Color, BackgroundColor } from "@adobe/leonardo-contrast-colors";
import baseColors from "../baseColors.json" with { type: "json" };

console.log(baseColors);

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

// -------------------------------------
// 2. Utility Functions
// -------------------------------------
function generateRatios(multiplier = 1) {
  const baseRatio = 1.35;
  const ratioCount = 9;
  return Array.from(
    { length: ratioCount },
    (_, i) => (Math.pow(baseRatio, i + 1) - baseRatio + 1) * multiplier,
  );
}

function smoothRatios(ratios, windowSize = 3) {
  const smoothed = [...ratios];
  const halfWindow = Math.floor(windowSize / 2);

  for (let i = 0; i < ratios.length; i++) {
    let sum = 0;
    let count = 0;
    for (
      let j = Math.max(0, i - halfWindow);
      j < Math.min(ratios.length, i + halfWindow + 1);
      j++
    ) {
      sum += ratios[j];
      count++;
    }
    smoothed[i] = sum / count;
  }
  return smoothed;
}

// -------------------------------------
// 3. Generate Ratios for light, dark, and print modes
// -------------------------------------
const lightRatios = smoothRatios(generateRatios(1));
const darkRatios = smoothRatios(generateRatios(1.3));

// -------------------------------------
// 4. Generate the entire color scheme
// -------------------------------------
function generateColorScheme(baseColors, isLightMode, ratios) {
  const backgroundColor = isLightMode
    ? baseColors.background
    : baseColors.foreground;
  const textColor = isLightMode ? baseColors.foreground : baseColors.background;

  const background = new BackgroundColor({
    name: "gray",
    colorKeys: [backgroundColor, textColor],
    colorspace: "CAM02",
    output: "HSL",
    ratios,
    smooth: true,
  });

  // Generate color scales for all keys except background/foreground
  const colorScales = Object.entries(baseColors)
    .filter(([key]) => !["background", "foreground"].includes(key))
    .map(
      ([name, color]) =>
        new Color({
          name,
          colorKeys: [color],
          colorspace: "CAM02",
          output: "HSL",
          ratios,
          smooth: true,
        }),
    );

  const theme = new Theme({
    colors: [background, ...colorScales],
    output: "HSL",
    backgroundColor: background,
    lightness: isLightMode ? 100 : 0,
    contrast: 1,
  });

  return theme.contrastColorPairs;
}

// Generate light, dark, and print color schemes
const lightColors = generateColorScheme(baseColors, true, lightRatios);
const darkColors = generateColorScheme(baseColors, false, darkRatios);

// -------------------------------------
// 5. Utility to convert color objects into CSS variables
// -------------------------------------
function generateColorVariables(colors) {
  const variables = Object.entries(colors)
    .map(([key, value]) => {
      // Convert trailing digit to -digit, e.g. "red100" -> "red-100"
      const modifiedKey = key.replace(/(\d+)$/, "-$1");
      return `--${modifiedKey}: ${value.replace("hsl(", "").replace(")", "")};`;
    })
    .join("\n  ");

  const backgroundAlias = "var(--gray-100)";
  const foregroundAlias = "var(--gray-900)";
  const additionalVariables = `
  --background: ${backgroundAlias};
  --foreground: ${foregroundAlias};`;

  return variables + additionalVariables;
}

// -------------------------------------
// 6. Generate final CSS (without prefers-color-scheme)
// -------------------------------------
function generateThemeVariables(lightVars, darkVars) {
  return `

:root {
  ${lightVars}
}


@media (prefers-color-scheme: dark) {
  :root {
    ${darkVars}
  }
}
`;
}

function generateCssVariables() {
  const lightVariables = generateColorVariables(lightColors);
  const darkVariables = generateColorVariables(darkColors);

  return generateThemeVariables(lightVariables, darkVariables);
}

// -------------------------------------
// 7. Main logic to write to design-tokens.css
// -------------------------------------
function main() {
  const css = generateCssVariables();
  writeFileSync(join(__dirname, "..", "design-tokens.css"), css);
  console.log("Design tokens saved to design-tokens.css");
}

// -------------------------------------
// Run the script
// -------------------------------------
main();
