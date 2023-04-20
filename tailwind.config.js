/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        Sedgwick: ["Sedgwick Ave Display", "cursive"],
      },
    },
  },
  plugins: [],
};
