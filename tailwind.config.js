/* eslint-ignore */
const colors = require('./src/theme/colors.js')
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/**/*.{js,ts,jsx,tsx}'],
  important: true,
  theme: {
    extend: {
      fontFamily: {
        sans: ['Brandon Grotesque', ...defaultTheme.fontFamily.sans],
      },
      width: {
        28: '445px',
      },
      maxWidth: {
        'screen-move-fit': '1007px',
        'screen-2xl': '1440px',
        'screen-3xl': '1792px',
        'scree[n-4xl': '2048px',
        'screen-5xl': '2304px',
      },
      transitionProperty: {
        width: 'width',
      },
      grayscale: {
        90: '90%',
        80: '80%',
        70: '70%',
        50: '50%',
        30: '30%',
      },
      colors: {
        primary: {
          brand: colors.primary.main,
          black: colors.primary.dark,
          grey: colors.text.grey,
          white: colors.primary.light,
          transparent: colors.primary.transparent,
          light: {
            blue: colors.primary.lightBlue,
          },
        },
        secondary: {
          light: {
            blue: colors.accent.blue,
          },
        },
        fill: {
          orange: colors.fill.orange,
          blue: colors.fill.blue,
          pink: colors.fill.pink,
          grey: colors.fill.grey,
        },
        accent: {
          white: colors.accent.white,
        },
        border: {
          blue: colors.border.blue,
        },
      },
      borderRadius: {
        buttonRadius: '8px 8px 8px 8px',
      },
      boxShadow: {
        mainShadow: '0px 5px 6px rgba(50,161,199, 0.25), 0px 0px 1px rgba(50,161,199, 0.1)',
        secondaryShadow: '0px 5px 6px rgba(111,166,252, 0.3), 0px 0px 1px rgba(111,166,252, 0.1)',
        boxSelect: '0px 8px 8px rgba(0,0,0, 0.1)',
      },
    },
  },
  plugins: [],
}
