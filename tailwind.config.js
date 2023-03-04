/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: { max: "370px" },
        maxMd: { max: "768px" },
      },
      borderColor: {
        gloomy: "#3a3a3c",
        wrong: "#3a3a3c",
        wrongSpot: "#b59f3b",
        correct: "#538d4e",
      },
      colors: {
        wrong: "#3a3a3c",
        wrongSpot: "#b59f3b",
        correct: "#538d4e",
      },
      fontSize: {
        "2.5xl": ["28px", "40px"],
        "3.5xl": [
          "32px",
          { lineHeight: "65px", letterSpacing: "0.01em", fontWeight: "700" },
        ],
      },
    },
  },
  plugins: [],
}
