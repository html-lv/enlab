/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    colors: {
      'gray-light': '#506482',
      'gray-2light': '#F0F0F0',
      'dark-blue': '#1E293B',
      'gray-blue': '#C8CDE9',
      'ultra-grey': '#F9F9F9',
      stroke: '#F0F0F0',
      grey: '#595959',
      white: '#FFFFFF',
      'dark-grey': '#6A6E73',
      'darked-grey': '#94A3B8',
      'light-white': '#F8F6F6',
      'lightblue-white': '#F2FAFF',
      'grey-border': '#8A95A7',
      salad: '#DFF7CE',
      'darker-blue': '#0369a1',
      blue: '#1F5BDE',
      skin: '#FFF3DC',
      'dark-orange': '#DD7F04',
      'light-blue': '#CFD3EC',
      transparent: 'transparent',
      darkBlue: '#201F77',
      'main-bg': '#f5f5f5',
      black: '#000000',
      lightDarkBlue: '#204291',
      red: '#D62D23',
      'red-bg': '#FFE7E3',
    },
    extend: {
      transitionProperty: {
        height: 'max-height',
        position: 'top, left, right, bottom',
      },
    },
  },
  plugins: [],
}

