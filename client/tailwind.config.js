/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors:{
        primary:'#FFA500'
      }
    },
  },
  plugins: [],
  corePlugins:{
    preflight:false
  }
}

