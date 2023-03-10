import { AppBar, Grid, Toolbar } from '@mui/material';
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
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Grid sx={{ alignItems: 'center' }}>
            <HeaderTitleDesktop />
          </Grid>
          <Grid sx={{ display: 'flex', alignItems: 'center' }}>
            <NavComponent />
            <CartIcon />
            <ThemeToggle themeName={themeName} toggleTheme={toggleTheme} />
          </Grid>
        </Toolbar>
      </AppBar>

      <Toolbar />
    </>
  );
};

export { DesktopLayout };
