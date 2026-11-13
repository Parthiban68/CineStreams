/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      colors: {
        color: {
          primary: "#FEF19A",
          bg: "#0D0F11",
          btnbg: "#1D1D1D",
        },
        kids: {
          accent: "#FF7A59",
          sun: "#FFD166",
          mint: "#5EEAD4",
          sky: "#7DD3FC",
          violet: "#C4B5FD",
        },
      },
    },
  },
  plugins: [],
}