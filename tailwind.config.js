/* eslint-ignore */
const colors = require('./src/theme/colors.js')
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/**/*.{js,ts,jsx,tsx}'],
  important: true,
  theme: {
    screens: {
      xs: '420px',
      ms: '430px',
      sm: '767px',
      x: '1024px',
      xl: '1280px',
      '2xl': '1440px',
      '5xl': '1920px',
      '7xl': '2880px',
    },
    extend: {
      fontFamily: {
        sans: ['Brandon Grotesque', ...defaultTheme.fontFamily.sans],
      },
      width: {
        28: '445px',
        'move-fit': '997px',
      },
      maxWidth: {
        'screen-move-fit': '1007px',
        'screen-move-landing': '997px',
        'left-bar': '302px',
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
        text: {
          blue: colors.text.blue,
        },
        fill: {
          orange: colors.fill.orange,
          blue: colors.fill.blue,
          pink: colors.fill.pink,
          grey: colors.fill.grey,
          spice: colors.fill.spice2,
          lightBlue: colors.fill.lightBlue,
          lightBlue2: colors.fill.lightBlue2,
          hover: colors.fill.hover,
          landingBlack: colors.fill.landingBlack,
        },
        accent: {
          white: colors.accent.white,
        },
        border: {
          blue: colors.border.blue,
          grey: colors.border.grey,
          lightBlue: colors.border.lightBlue,
        },
      },
      borderRadius: {
        buttonRadius: '8px 8px 8px 8px',
      },
      boxShadow: {
        mainShadow: '0px 5px 6px rgba(50,161,199, 0.25), 0px 0px 1px rgba(50,161,199, 0.1)',
        secondaryShadow: '0px 5px 6px rgba(111,166,252, 0.3), 0px 0px 1px rgba(111,166,252, 0.1)',
        boxSelect: '0px 8px 8px rgba(0,0,0, 0.1)',
        buttonShadow: 'rgba(14, 208, 233, 0.1)',
        singleSelct: '0px 8px 8px rgba(45,146,181, 0.2)',
        logoShadow: '0px 10px 10px rgba(0,0,0, 0.2)',
        apple: '0 26px 26px 0 rgba(2, 32, 71, 0.12), 0 0 1px 0 rgba(2, 32, 71, 0.1)',
        glassShadow: '0 3px 4px 0 rgba(2, 32, 71, 0.1), 0 0 1px 0 rgba(2, 32, 71, 0.08)',
        buttonShadow2: '0 8px 10px 0 rgba(2, 32, 71, 0.1), 0 0 1px 0 rgba(2, 32, 71, 0.08)',
        buttonShadow3: '0 5px 4px 0 rgba(14, 208, 233, 0.1)',
        hoverShadow: '0 5px 10px 0 rgba(14, 208, 233, 0.3)',
      },
    },
  },
  plugins: [],
}
