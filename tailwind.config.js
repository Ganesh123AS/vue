/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '320px',
      'sm': '460px',
      'md': '768px',
      'lg': '1024px',
      'xl': '2560px',
    },
    extend: {
      backgroundColor: {
        'nav': 'rgb(58 104 64)',
      }
    },
  },
  plugins: [],
}

