/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
      extend: {},
    },

    screens: {
        'sm': '576px',
        // => @media (min-width: 576px) { ... }
  
        'md': '960px',
        // => @media (min-width: 960px) { ... }
  
        'lg': '1440px',
        // => @media (min-width: 1440px) { ... }
    },
    colors:{
        lightbg : "#E2E9F0",
        lightbgPrimary : "#f8fAFC",
        lightBGSecondary : "0F172A",
    },

    plugins: [],
  }