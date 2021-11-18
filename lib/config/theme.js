import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    brand: {
      primary: {
        100: '#dad3de',
        300: '#8f7b9b',
        500: '#442359',
        600: '#35194C',
        700: '#281140',
        800: '#1C0B33',
        900: '#14062A',
      },
      secondary: {
        100: '#fad9d1',
        300: '#f09566',
        500: '#e64e00',
        600: '#C53600',
        700: '#A52300',
        800: '#851300',
        900: '#6E0900',
      },
      tertiary: {
        100: '#daf0ed',
        300: '#8fd2ca',
        500: '#44b4a6',
        600: '#319A97',
        700: '#227B81',
        800: '#155B68',
        900: '#0D4456',
      },
      accent: {
        100: '#ede8d9',
        300: '#c9b98c',
        500: '#a58b3f',
      },
    },
  },
})

export default theme
