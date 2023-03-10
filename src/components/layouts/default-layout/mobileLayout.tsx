import {
  CartIcon,
  HeaderTitleMobile,
  MenuIcon,
  ThemeToggle,
} from '@app/components/layouts/default-layout/layoutComponent';
import { useColorMode } from '@app/utilities/hooks/ColorModeContainer';
import { AppBar, Grid, Toolbar } from '@mui/material';

export const MobileLayout = () => {
  const { toggleTheme, themeName } = useColorMode();
  return (
    <>
      <AppBar position="fixed">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Grid>
            <MenuIcon themeName={themeName} />
          </Grid>
          <Grid>
            <HeaderTitleMobile themeName={themeName} />
          </Grid>
          <Grid sx={{ display: 'flex', alignItems: 'center' }}>
            <CartIcon />
            <ThemeToggle themeName={themeName} toggleTheme={toggleTheme} />
          </Grid>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};
