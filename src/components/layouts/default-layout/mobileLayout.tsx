import {
  CartIcon,
  HeaderTitleMobile,
  MenuIcon,
  ThemeToggle,
} from '@app/components/layouts/default-layout/layoutComponent';
import { useColorMode } from '@app/utilities/hooks/ColorModeContainer';
import { AppBar, Toolbar } from '@material-ui/core';

export const MobileLayout = () => {
  const { toggleTheme, themeName } = useColorMode();
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <MenuIcon themeName={themeName} />
          <HeaderTitleMobile />
          <CartIcon />
          <ThemeToggle themeName={themeName} toggleTheme={toggleTheme} />
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};
