/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.jsx"],
  theme: {
    extend: {
      colors: {
        primary: "#1F2B6C",
        secondary: "#159EEC",
        accent: "#BFD2F8",
        textPrimary: "#FCFEFE",
        textSecondary: "#212124",
      },
      fontFamily: {
        header: ["Yeseva One", "serif"],
      },
    },
  },
  plugins: [],
};
