/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    
    extend: {
      
      fontFamily:{
         manrope:['Manrope'],
      },
      
      colors:{
      "dark-blue":"#214091",
      "dash-color":"#F2F3F7",
      "gradient-1":"#1A0292",
      "gradient-2":"#0D004C",
      "light-white":"rgba(255,255,255,0.18)"
      }
    },
  },
  plugins: [require("daisyui")],

  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#214091",
          secondary: "#E6E6E6",
          accent: "#37cdbe",
          neutral: "#3d4451",
          "base-100": "#ffffff",
        },
      },
      "dark",
      "coporate",
    ],
  },

}