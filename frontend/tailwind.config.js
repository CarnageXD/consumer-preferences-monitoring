const withMT = require("@material-tailwind/react/utils/withMT");
const fontFamily = ["Nunito", "Inter", "Arial", "sans-serif"];

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: fontFamily,
      display: fontFamily,
      body: fontFamily,
      serif: ["ui-serif"],
    },
    colors: {
      "primary-white": "#fffffb",
      "primary-crimson": "#9b014a",
      "primary-blue": "#22338f",
      "primary-yellow": "#ffdd3e",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
});
