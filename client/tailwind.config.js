/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  purge: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  theme: {

    
    extend: {
      backgroundImage:{
        'splash':"url('./components/assets/splash.jpg')"}
    },
  },
  plugins: [],
}