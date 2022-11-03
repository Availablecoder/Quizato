import createTheme from '@mui/material/styles/createTheme';
import { purple, pink, grey } from '@mui/material/colors';

let theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          position: 'relative',
          margin: 0,
          paddingBottom: '80px',
          minHeight: '100vh',
          overflowX: 'hidden',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '50px',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: '20px',
          bgcolor: 'red',
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 991,
      xl: 1200,
    },
  },
  palette: {
    mode: 'light',
    primary: {
      main: purple['900'],
    },
    secondary: {
      main: pink['800'],
    },
    grey: {
      main: grey[700],
      contrastText: '#fff',
    },
  },
  typography: {
    allVariants: {
      fontFamily: 'Inter Tight, sans- serif',
      textTransform: 'none',
      fontSize: 16,
    },
    h1: {
      fontSize: 'clamp(35px, 6vw, 60px)',
      fontWeight: '500',
      // '@media(max-width: 768px)': {
      //   fontSize: '40px',
      // },
    },
    h2: {
      fontSize: 'clamp(30px, 4vw, 40px)',
      fontWeight: '500',
      // '@media(max-width: 768px)': {
      //   fontSize: '35px',
      // },
    },
    h3: {
      fontSize: '25px',
      fontWeight: '400',
    },
    h4: {
      fontSize: '22px',
      fontWeight: '600',
    },
    h5: {
      fontSize: '18px',
      fontWeight: '700',
    },
    h6: {
      fontSize: '15px',
      fontWeight: '700',
    },
  },
});

export default theme;
