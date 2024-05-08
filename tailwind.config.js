/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        fade: 'fadeOut 0.5s ease-in-out',
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
