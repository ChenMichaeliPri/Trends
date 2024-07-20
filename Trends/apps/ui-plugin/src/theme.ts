import { createTheme,PaletteMode } from '@mui/material';

const lightThemeOptions = {
  palette: {
    mode: 'light' as PaletteMode,
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#fff',
      paper: '#f4f6f8',
    },
    text: {
      primary: '#000',
      secondary: '#333',
    },
  },
};

const darkThemeOptions = {
  palette: {
    mode: 'dark' as PaletteMode,
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#121212',
      paper: '#424242',
    },
    text: {
      primary: '#fff',
      secondary: '#ddd',
    },
  },
};

export const getTheme = (isDarkMode: boolean) => {
  return createTheme({
    ... (isDarkMode ? darkThemeOptions : lightThemeOptions)
  });
};
