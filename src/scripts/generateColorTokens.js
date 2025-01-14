// code mostly copied from my personal project and modified with ChatGPT
// used to generate color tokens based on contrast values

import { writeFileSync } from "fs";
import { join } from "path";
import path from "path";
import { fileURLToPath } from "url";
import { Theme, Color, BackgroundColor } from "@adobe/leonardo-contrast-colors";

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

// ------------------------
// 1. Define our base colors
// ------------------------
const baseColors = {
  background: "#d3c6aa",
  foreground: "#1e2326",
  green: "#a7c080",
  red: "#e67e80",
  blue: "#7fbbb3",
  purple: "#d699b6",
  orange: "#ff5100",
  yellow: "#dbbc7f",
};

const printBaseColors = {
  ...baseColors,
  background: "#ffffff",
  foreground: "#000000",
};

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
const printRatios = smoothRatios(generateRatios(2));

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
          ratios,
          smooth: true,
        }),
    );

  const theme = new Theme({
    colors: [background, ...colorScales],
    backgroundColor: background,
    lightness: isLightMode ? 100 : 0,
    contrast: 1,
  });

  return theme.contrastColorPairs;
}

// Generate light, dark, and print color schemes
const lightColors = generateColorScheme(baseColors, true, lightRatios);
const darkColors = generateColorScheme(baseColors, false, darkRatios);
const printColors = generateColorScheme(printBaseColors, true, printRatios);

// -------------------------------------
// 5. Utility to convert color objects into CSS variables
// -------------------------------------
function generateColorVariables(colors, isPrint) {
  const variables = Object.entries(colors)
    .map(([key, value]) => {
      // Convert trailing digit to -digit, e.g. "red100" -> "red-100"
      const modifiedKey = key.replace(/(\d+)$/, "-$1");
      return `--${modifiedKey}: ${value};`;
    })
    .join("\n  ");

  const backgroundAlias = isPrint
    ? "var(--gray-100)"
    : "color-mix(in srgb, var(--gray-100) 50%, var(--gray-200) 50%)";
  const foregroundAlias = isPrint ? "var(--gray-900)" : "var(--gray-800)";
  const additionalVariables = `
  --background: ${backgroundAlias};
  --foreground: ${foregroundAlias};`;

  return variables + additionalVariables;
}

// -------------------------------------
// 6. Generate final CSS (without prefers-color-scheme)
// -------------------------------------
function generateThemeVariables(lightVars, darkVars, printVars) {
  return `
:root[data-theme="dark"] {
  ${darkVars}
}

:root[data-theme="light"] {
  ${lightVars}
}

@media print {
  :root,
  :root[data-theme="light"],
  :root[data-theme="dark"] {
    ${printVars}
  }
}
`;
}

function generateCssVariables() {
  const lightVariables = generateColorVariables(lightColors, false);
  const darkVariables = generateColorVariables(darkColors, false);
  const printVariables = generateColorVariables(printColors, true);

  return generateThemeVariables(lightVariables, darkVariables, printVariables);
}

// -------------------------------------
// 7. Main logic to write to design-tokens.css
// -------------------------------------
function main() {
  const css = generateCssVariables();
  writeFileSync(join(__dirname, "design-tokens.css"), css);
  console.log("Design tokens saved to design-tokens.css");
}

// -------------------------------------
// Run the script
// -------------------------------------
main();
