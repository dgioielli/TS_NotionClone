/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.tsx",
  ],
  theme: {
    extend: {
      fontFamily : {
        accent: [ "Nunito Sans", "Arial", "sans-serif" ],
        regular: [ "Roboto", "Arial", "sans-serif" ]
      },
      colors : {
        appBase : {
          100 : "#0F2E53",
          500 : "#EDEDED",
          700 : "#F5F6FB",
          800 : "#484848"
        }
      }
    },
  },
  plugins: [],
}
