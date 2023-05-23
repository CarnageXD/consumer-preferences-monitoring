const withMT = require("@material-tailwind/react/utils/withMT");
const fontFamily = ["Nunito", "Inter", "Arial", "sans-serif"];

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./theme/**/*.{js,ts,tsx,jsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: fontFamily,
      display: fontFamily,
      body: fontFamily,
      serif: ["ui-serif"],
    },
    colors: {
      "primary-crimson": "#9b014a",
      "primary-blue": "#041a72",
      "primary-yellow": "#f8d000",
    },
    extend: {},
  },
  plugins: [],
});
