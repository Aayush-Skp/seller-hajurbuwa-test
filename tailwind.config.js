/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
      white: '#FFFFFF',
      black: '#000',
      red: {
        200: '#E50131',
        600: '#C70101',
        700: '#C30101',
      },
      blue: {
        700: '#1366A8',
      },
      gray: {
        100: '#F2F2F2',
        150: '#f5f5f5',
        200: '#D6D6D6',
        300: '#BDBDBD',
        400: '#828282',
        500: '#4F4F4F',
        600: '#333333',
      },
      success: {
        primary: '#219653',
        secondary: '#6AB482',
        tertiary: '#D6EADC',
      },
      accent: {
        primary: '#2F80ED',
        secondary: '#2D9CDB',
        tertiary: '#EAF2FD',
      },
      warning: {
        primary: '#F2994A',
        secondary: '#F7C864',
        tertiary: '#FDF1D8',
      },
      error: {
        primary: '#EB5757',
        secondary: '#E77B73',
        tertiary: '#FCEFEE',
      },
    },
  },
  plugins: [],
};
