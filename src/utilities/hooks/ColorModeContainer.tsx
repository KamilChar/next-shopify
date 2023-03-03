import { useEffect, useState } from 'react';
import { createContainer } from 'unstated-next';

import { createTheme, Theme } from '@material-ui/core/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#5893df',
    },
    secondary: {
      main: '#2ec5d3',
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
