/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        custom: "0px 0px 0px 1px #daedfd, 0px 4px 6px rgba(0, 0, 0, 0.1)", // Bordo + ombra
      },
      colors: {
        brand: {
          DEFAULT: "#3fb5bc",
          dark: "#00B3BC",
        },
        "teal-25": "#f5fbff",
        "blue-200": "#daedfd",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
