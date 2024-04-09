/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
      modgarden: {
        ...require("daisyui/src/theming/themes")["garden"],
        "primary": "#92C7CF",
        "secondary": "#E5E1DA",
        "accent": "#AAD7D9",
        "neutral": "#E5E1DA",
        "base-50": "#FFFFF7",
        "base-100": "#FEFDED",
        "base-200": "#EDECDD",
        "base-300": "#DBDACC",
        "info": "#A1C398",
        "success": "#C6EBC5",
        "warning": "#FFBE98",
        "error": "#FA7070",
      },
    }, 'dark', 'retro', 'business','garden']
  }
}
