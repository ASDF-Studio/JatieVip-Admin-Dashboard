import { createTheme, CssBaseline, ThemeProvider as MuiThemeProvider, useTheme as muiUseTheme } from '@mui/material'
import React, { createContext, useContext } from 'react'
import colors from './colors'
import type {} from '@mui/x-date-pickers/themeAugmentation'

export const MoveTheme = {
  spacing: 4,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1280,
      xl: 1536,
    },
  },
  palette: colors,

  typography: {
    fontFamily: ['Avenir Next', 'sans-serif'].join(','),
    heading1: {
      fontSize: '45px',
      fontWeight: '600',
      '@media (max-width:768px)': {
        fontSize: '30px',
        lineHeight: 1.33,
        fontWeight: 600,
      },
      // '@media (max-width:600px)': {
      //   fontSize: '32px',
      //   lineHeight: '40px',
      //   fontWeight: 800,
      // },
    },
    heading2: {
      fontSize: '34px',
      lineHeight: '40px',
      fontWeight: 700,
      // '@media (max-width:900px)': {
      //   fontSize: '24px',
      //   lineHeight: '30px',
      //   fontWeight: 700,
      // },
      // '@media (max-width:600px)': {
      //   fontSize: '24px',
      //   lineHeight: '30px',
      //   fontWeight: 700,
      // },
    },
    heading3: {
      fontSize: '22px',
      fontWeight: 600,
      '@media (max-width:768px)': {
        fontSize: '22px',
        lineHeight: 'normal',
        fontWeight: 600,
      },
      // '@media (max-width:600px)': {
      //   fontSize: '24px',
      //   lineHeight: '30px',
      //   fontWeight: 700,
      // },
    },
    heading4: {
      fontSize: '22px',
      fontWeight: 600,
      '@media (max-width:1023px)': {
        fontSize: '22px',
        lineHeight: 'normal',
        fontWeight: 600,
      },
      // '@media (max-width:600px)': {
      //   fontSize: '24px',
      //   lineHeight: '30px',
      //   fontWeight: 700,
      // },
    },
    heading5: {
      fontSize: '50px',
      fontWeight: 700,
      '@media (max-width:1023px)': {
        fontSize: '40px',
        // lineHeight: '30px',
        fontWeight: 700,
      },
      '@media (max-width:767px)': {
        fontSize: '35px',
        // lineHeight: '30px',
        fontWeight: 700,
      },
    },
    heading6: {
      fontSize: '40.5px',
      fontWeight: 700,
      // '@media (max-width:1023px)': {
      //   fontSize: '40px',
      //   // lineHeight: '30px',
      //   fontWeight: 700,
      // },
      '@media (max-width:767px)': {
        fontSize: '29.5px',
        // lineHeight: '30px',
        fontWeight: 700,
      },
    },
    heading7: {
      fontSize: '40.5px',
      fontWeight: 700,
      lineHeight: 1.11,
      // '@media (max-width:1023px)': {
      //   fontSize: '40px',
      //   // lineHeight: '30px',
      //   fontWeight: 700,
      // },
      '@media (max-width:1024px)': {
        fontSize: '35px',
        lineHeight: 1.57,
        // lineHeight: '30px',
        fontWeight: 700,
      },
    },
    title1: {
      fontSize: '22px',
      lineHeight: '28px',
      fontWeight: 600,
      // '@media (max-width:900px)': {
      //   fontSize: '16px',
      //   lineHeight: '24px',
      //   fontWeight: 600,
      // },
      // '@media (max-width:600px)': {
      //   fontSize: '16px',
      //   lineHeight: '24px',
      //   fontWeight: 600,
      // },
    },
    title2: {
      fontSize: '18px',
      lineHeight: '24px',
      fontWeight: 700,
      // '@media (max-width:900px)': {
      //   fontSize: '16px',
      //   lineHeight: '24px',
      //   fontWeight: 700,
      // },
      // '@media (max-width:600px)': {
      //   fontSize: '16px',
      //   lineHeight: '24px',
      //   fontWeight: 700,
      // },
    },
    title3: {
      fontSize: '18px',
      fontWeight: 600,
      textTransform: 'capitalize',
      '@media (max-width:1023px)': {
        fontSize: '18px',
        fontWeight: 600,
      },
      '@media (max-width:767px)': {
        fontSize: '16px',
        fontWeight: 600,
      },
    },
    title4: {
      fontSize: '20px',
      fontWeight: 600,
      // '@media (max-width:900px)': {
      //   fontSize: '16px',
      //   lineHeight: '24px',
      //   fontWeight: 600,
      // },
      // '@media (max-width:600px)': {
      //   fontSize: '16px',
      //   lineHeight: '24px',
      //   fontWeight: 600,
      // },
    },
    desc: {
      fontSize: '15px',
      fontWeight: 500,
    },
    titleSemiBold: {
      fontSize: '45px',
      lineHeight: 1.11,
      fontWeight: 600,
      '@media (max-width:1023px)': {
        fontSize: '30px',
        lineHeight: 1.33,
      },
    },

    bodyBold: {
      fontSize: '16px',
      fontWeight: 600,
      // '@media (max-width:900px)': {
      //   fontSize: '16px',
      //   lineHeight: '24px',
      //   fontWeight: 700,
      // },
      // '@media (max-width:600px)': {
      //   fontSize: '16px',
      //   lineHeight: '24px',
      //   fontWeight: 700,
      // },
    },
    body1: {
      fontSize: '16px',
      lineHeight: '24px',
      fontWeight: 600,
      // '@media (max-width:900px)': {
      //   fontSize: '16px',
      //   lineHeight: '24px',
      //   fontWeight: 600,
      // },
      // '@media (max-width:600px)': {
      //   fontSize: '16px',
      //   lineHeight: '24px',
      //   fontWeight: 600,
      // },
    },
    body2: {
      fontSize: '16px',
      fontWeight: 500,
      // '@media (max-width:900px)': {
      //   fontSize: '14px',
      //   lineHeight: '22px',
      //   fontWeight: 500,
      // },
      // '@media (max-width:600px)': {
      //   fontSize: '14px',
      //   lineHeight: '22px',
      //   fontWeight: 500,
      // },
    },
    body: {
      fontSize: '16px',
      lineHeight: '24px',
      fontWeight: 'normal',
      // '@media (max-width:900px)': {
      //   fontSize: '14px',
      //   lineHeight: '22px',
      //   fontWeight: 400,
      // },
      '@media (max-width:768px)': {
        fontSize: '14px',
        lineHeight: 'normal',
        fontWeight: 'normal',
      },
    },
    body3: {
      fontSize: '18px',
      lineHeight: 1.44,
      fontWeight: 600,
      '@media (max-width:767px)': {
        fontSize: '16px',
        lineHeight: 1.63,
        fontWeight: 600,
      },
    },
    body4: {
      fontSize: '18px',
      fontWeight: 600,
      lineHeight: 'normal',
    },
    subhead: {
      fontSize: '14px',
      lineHeight: '22px',
      fontWeight: 500,
      // '@media (max-width:900px)': {
      //   fontSize: '12px',
      //   lineHeight: '16px',
      //   fontWeight: 400,
      // },
      // '@media (max-width:600px)': {
      //   fontSize: '12px',
      //   lineHeight: '16px',
      //   fontWeight: 400,
      // },
    },
    subheadBold: {
      fontSize: '14px',

      fontWeight: 600,
      // '@media (max-width:900px)': {
      //   fontSize: '12px',
      //   lineHeight: '18px',
      //   fontWeight: 600,
      // },
      // '@media (max-width:600px)': {
      //   fontSize: '12px',
      //   lineHeight: '18px',
      //   fontWeight: 600,
      // },
    },
    subheadBold1: {
      fontSize: '14px',

      fontWeight: 700,
      // '@media (max-width:900px)': {
      //   fontSize: '12px',
      //   lineHeight: '18px',
      //   fontWeight: 600,
      // },
      // '@media (max-width:600px)': {
      //   fontSize: '12px',
      //   lineHeight: '18px',
      //   fontWeight: 600,
      // },
    },
    label1: {
      fontSize: '14px',
      lineHeight: '22px',
      fontWeight: '600',
      textTransform: 'capitalize',
      // '@media (max-width:900px)': {
      //   fontSize: '12px',
      //   lineHeight: '18px',
      //   fontWeight: 400,
      // },
      // '@media (max-width:600px)': {
      //   fontSize: '12px',
      //   lineHeight: '18px',
      //   fontWeight: 400,
      // },
    },
    label2: {
      fontSize: '13px',
      fontWeight: '600',
      textTransform: 'capitalize',
      // '@media (max-width:900px)': {
      //   fontSize: '12px',
      //   lineHeight: '18px',
      //   fontWeight: 400,
      // },
      // '@media (max-width:600px)': {
      //   fontSize: '12px',
      //   lineHeight: '18px',
      //   fontWeight: 400,
      // },
    },
  },
}

interface ThemeContextInterface {
  toggle?: () => void
  isDark?: boolean
}

const ThemeContext = createContext<ThemeContextInterface>({})

export const ThemeProvider: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const theme = createTheme({
    ...MoveTheme,
    palette: {
      mode: 'light',
      ...colors,
    },

    components: {
      MuiDatePicker: {
        styleOverrides: {
          root: {
            'Mui-selected': {
              backgroundColor: 'red',
            },
          },
        },
      },
      MuiCircularProgress: {
        styleOverrides: {
          circle: {
            height: 20,
            width: 20,
          },
        },
      },
    },
  })

  return (
    <ThemeContext.Provider value={{}}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  )
}

export const useColorMode: () => ThemeContextInterface = () => useContext(ThemeContext)

export const useTheme = (): typeof MoveTheme => {
  return muiUseTheme<typeof MoveTheme>()
}
