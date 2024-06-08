/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ["Satoshi", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        logo: ["Special Elite"],
      },
      colors: {
        "primary-orange": "#FF5722",
        "almost-white": "#f5f5f5",
        "pink-red": "#C7135B",
      },
    },
  },
  plugins: [],
};
