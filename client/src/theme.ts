import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#17b978'
    },
    secondary: {
      main: '#086972'
    },
    error: {
      main: '#f44336'
    },
    background: {
      default: '#232323'
    },
    text: {
      primary: '#fefefe',
      secondary: '#a7ff83'
    }
  }
});

export default theme;
