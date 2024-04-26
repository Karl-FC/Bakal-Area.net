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
      neutral: {
        ...require("daisyui/src/theming/themes")["garden"],
        "primary": "#92C7CF", //header ng table
        "secondary": "#DBDACC", //Backdrop ng mga card
        "accent": "#E5E1DA", // Yun navbar at focused columns ng table
        "neutral": "#EDECDD", //Background ng table at dropdowns
        "base-50": "#FFFFF7",
        "base-100": "#FEFDED", //Main background
        "base-200": "#E5E1DA", //Hover background ng table
        "info": "#AAD7D9", //Main buttons at results
        "success": "#C6EBC5",
        "warning": "#FFBE98",
        "error": "#FA7070",
      },
      cad: {
        ...require("daisyui/src/theming/themes")["business"],
        "primary": "#46466E",
        "secondary": "#23282E",
        "accent": "#0b2338",
        "neutral": "#222A33",
        "base-50": "#FFFFF7",
        "base-100": "#0b2338",
        "base-200": "#0b2338",
        "info": "#46466E",
        "success": "#00f683",
        "warning": "#cea400",
        "error": "#ff3650",
      },
      steel: {
        ...require("daisyui/src/theming/themes")["lofi"],
        "primary": "#8B8F8F",
        "secondary": "#C7C7C8",
        "accent": "#A8A9AD",
        "neutral": "#D0D0D2",
        "base-50": "#FFFFF7",
        "base-100": "#EBECF1",
        "base-200": "#A8A9AD",
        "info": "#A8A9AD",
        "success": "#E4D674",
        "warning": "#CB6A52",
        "error": "#A22900",
      },
      meds: {
        ...require("daisyui/src/theming/themes")["garden"],
        "primary": "#cdfefff8",
        "secondary": "#89dee2", //Backdrop ng mga card
        "accent": "#ffbe6d",  // Yun navbar
        "neutral": "#FFBE98", //Background ng table at dropdowns
        "base-50": "#FFFFF7",
        "base-100": "#cdfefff8", //Main background
        "base-200": "#ffbe6d",
        "info": "#54fdbff8",
        "success": "#FFBEDA",
        "warning": "#EBE5BB",
        "error": "#c08b4c",
        "base-content": "#10217d"
      },
      coquette: {
        ...require("daisyui/src/theming/themes")["pastel"],
        "primary": "#EEB9E0",
        "secondary": "#F6DAF0",
        "accent": "#FFCCE7",
        "neutral": "#FDF2FA",
        "base-50": "#FDF2FA",
        "base-100": "#FCE9F6",
        "base-200": "#FFDDF4",
        "info": "#EED2FE",
        "success": "#C0DEBA",
        "warning": "#FDF4D0",
        "error": "#FFD19B",
        "base": "#EED2FE", // Kung alam ko lang kung ano classification sa input/forms
      },
      midnight: {
        ...require("daisyui/src/theming/themes")["dark"],
        "primary": "#393939",
        "secondary": "#191919",
        "accent": "#191E24",
        "neutral": "#23282E",
        "base-50": "#23282E",
        "base-100": "#202020",
        "base-200": "#191E24",
        "info": "#393939",
        "success": "#102A5B",
        "warning": "#310046",
        "error": "#4B0304",
      },
      three: {
        ...require("daisyui/src/theming/themes")["dark"],
        "primary": "#030F33",
        "secondary": "#000",
        "accent": "#2B0933",
        "neutral": "#2A233D",
        "base-50": "#23282E",
        "base-100": "#17021A",
        "base-200": "#2B0933",
        "info": "#02234D",
        "success": "#102A5B",
        "warning": "#310046",
        "error": "#4B0304",
        "base-content": "#8D79B3"
      },
      shrek: {
        ...require("daisyui/src/theming/themes")["garden"],
        "primary": "#D3CCA5",
        "secondary": "#d1ffdd",
        "accent": "#abffa4",
        "neutral": "#effff3",
        "base-50": "#effff3",
        "base-100": "#effff3",
        "base-200": "#ddffe6",
        "info": "#795A2D",
        "success": "#D5DE2E",
        "warning": "#B0C400",
        "error": "#523213",
      },
      loverainville: {
        ...require("daisyui/src/theming/themes")["luxury"],
        "primary": "#9E1711",
        "secondary": "#4A1414",
        "accent": "#8B0001",
        "neutral": "#760808",
        "base-50": "#ff9b9b",
        "base-100": "#760808",
        "base-200": "#8B0001",
        "info": "#b60000",
        "success": "#25524D",
        "warning": "#B37422",
        "error": "#8A0C18",
        "base-content": "#FFA500", //Default text
        
      },
    },  'pastel','garden', 'lofi','dark', 'business', 'luxury']
  }
}
