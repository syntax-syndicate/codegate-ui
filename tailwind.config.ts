/* eslint-disable @typescript-eslint/no-require-imports */

import baseColors from "./src/baseColors.json" with { type: "json" };

const colors = {};

[
  ...Object.keys(baseColors).filter(
    (key) => !["background", "foreground"].includes(key),
  ),
  "gray",
].forEach((colorName) => {
  ["100", "200", "300", "400", "500", "600", "700", "800", "900"].forEach(
    (shade) => {
      const colorId = `${colorName}-${shade}`;
      colors[colorId] = `hsl(var(--${colorId}))`;
    },
  );
});

console.log(colors);

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@shadcn/ui/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      ...colors,
      white: "hsl(var(--gray-100))",
      black: "hsl(var(--gray-900))",
      //"blue-200": "#daedfd",
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",
      card: {
        DEFAULT: "hsl(var(--card))",
        foreground: "hsl(var(--card-foreground))",
      },
      popover: {
        DEFAULT: "hsl(var(--popover))",
        foreground: "hsl(var(--popover-foreground))",
      },
      primary: {
        DEFAULT: "hsl(var(--primary))",
        foreground: "hsl(var(--primary-foreground))",
      },
      secondary: {
        DEFAULT: "hsl(var(--secondary))",
        foreground: "hsl(var(--secondary-foreground))",
      },
      muted: {
        DEFAULT: "hsl(var(--muted))",
        foreground: "hsl(var(--muted-foreground))",
      },
      accent: {
        DEFAULT: "hsl(var(--accent))",
        foreground: "hsl(var(--accent-foreground))",
      },
      destructive: {
        DEFAULT: "hsl(var(--destructive))",
        foreground: "hsl(var(--destructive-foreground))",
      },
      border: "hsl(var(--border))",
      input: "hsl(var(--input))",
      ring: "hsl(var(--ring))",
      chart: {
        "1": "hsl(var(--chart-1))",
        "2": "hsl(var(--chart-2))",
        "3": "hsl(var(--chart-3))",
        "4": "hsl(var(--chart-4))",
        "5": "hsl(var(--chart-5))",
      },
      sidebar: {
        DEFAULT: "hsl(var(--sidebar-background))",
        foreground: "hsl(var(--sidebar-foreground))",
        primary: "hsl(var(--sidebar-primary))",
        "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
        accent: "hsl(var(--sidebar-accent))",
        "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
        border: "hsl(var(--sidebar-border))",
        ring: "hsl(var(--sidebar-ring))",
      },
    },
    extend: {
      typography: () => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": "var(--gray-900)",
            "--tw-prose-headings": "var(--gray-900)",
            "--tw-prose-lead": "var(--gray-600)",
            "--tw-prose-links": "var(--gray-900)",
            "--tw-prose-bold": "var(--gray-900)",
            "--tw-prose-counters": "var(--gray-500)",
            "--tw-prose-bullets": "var(--gray-300)",
            "--tw-prose-hr": "var(--gray-200)",
            "--tw-prose-quotes": "var(--gray-900)",
            "--tw-prose-quote-borders": "var(--gray-200)",
            "--tw-prose-captions": "var(--gray-500)",
            "--tw-prose-code": "var(--gray-900)",
            "--tw-prose-pre-code": "var(--gray-200)",
            "--tw-prose-pre-bg": "var(--gray-800)",
            "--tw-prose-th-borders": "var(--gray-300)",
            "--tw-prose-td-borders": "var(--gray-200)",
            "h1, h2, h3, h4, h5, h6": {
              fontFamily: "var(--font-title)",
              fontWeight: "600",
            },
          },
        },
      }),
      boxShadow: {
        custom: "0px 0px 0px 1px #daedfd, 0px 4px 6px rgba(0, 0, 0, 0.1)",
      },

      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
