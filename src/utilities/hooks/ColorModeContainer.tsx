import { useEffect, useState } from 'react';
import { createContainer } from 'unstated-next';

import { createTheme, Theme } from '@mui/material/styles';

const darkTheme = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#ffffff',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          color: '#ffffff',
        },
      },
    },
  },
  palette: {
    mode: 'dark',
  },
});
const lightTheme = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#000000',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          color: '#000000',
        },
      },
    },
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#dfdd58',
    },
    secondary: {
      main: '#b3b036',
    },
  },
});
export type ThemeMode = 'light' | 'dark';

const ColorModeContainer = createContainer(() => {
  const [theme, setTheme] = useState<Theme>(darkTheme);
  const [themeName, setThemeName] = useState<ThemeMode>('light');

  useEffect(() => {
    const themeName = localStorage.getItem('themeName');
    if (!themeName) {
      localStorage.setItem('themeName', 'dark');
    } else {
      themeName === 'light' ? setTheme(lightTheme) : setTheme(darkTheme);
    }
  }, []);

  const toggleTheme = () => {
    localStorage.setItem('themeName', themeName === 'light' ? 'dark' : 'light');
    setTheme(themeName === 'dark' ? lightTheme : darkTheme);
    setThemeName(themeName === 'light' ? 'dark' : 'light');
  };

  return {
    theme,
    themeName,
    toggleTheme,
  };
});

export const useColorMode = ColorModeContainer.useContainer;
export const ColorModeProvider = ColorModeContainer.Provider;
