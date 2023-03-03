import React from 'react';
import NextLink from 'next/link';
import NProgress from 'nprogress';
import { ShoppingBasket } from '@material-ui/icons';
import { useQuery, UseBaseQueryResult } from 'react-query';
import { AppBar, Toolbar } from '@material-ui/core';
import { useColorMode } from '@app/utilities/hooks/ColorModeContainer';
import {
  CartIcon,
  HeaderTitleDesktop,
  NavComponent,
  ThemeToggle,
} from '@app/components/layouts/default-layout/layoutComponent';

const DesktopLayout = () => {
  const { toggleTheme, themeName } = useColorMode();

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <HeaderTitleDesktop />
          <NavComponent />
          <CartIcon />
          <ThemeToggle themeName={themeName} toggleTheme={toggleTheme} />
        </Toolbar>
      </AppBar>

      <Toolbar />
    </>
  );
};

export { DesktopLayout };
