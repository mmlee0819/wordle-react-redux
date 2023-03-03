/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: { max: "370px" },
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
    },
  },
  plugins: [],
}
