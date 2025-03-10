export default {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        customPalette: {
          lightPurple: '#e4c1f9',
          lightBlue: '#a9def9',
          lightGreen: '#d0f4de',
          lightYellow: '#fcf6bd',
          lightPink: '#ff99c8',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};