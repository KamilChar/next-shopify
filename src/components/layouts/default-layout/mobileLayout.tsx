import React from 'react';
import NextLink from 'next/link';
import NProgress from 'nprogress';
import { MenuOpen, ShoppingBasket } from '@material-ui/icons';
import { useQuery, UseBaseQueryResult } from 'react-query';
import {
  Link,
  Badge,
  AppBar,
  Button,
  Toolbar,
  Container,
  IconButton,
  FormControlLabel,
  FormGroup,
  Switch,
  Menu,
  Fade,
  MenuItem,
} from '@material-ui/core';

import { CartService } from '@app/services/cart.service';
import { CART_ITEM_COUNT_QUERY } from '@app/constants/query.constant';
import { useColorMode } from '@app/utilities/hooks/ColorModeContainer';

interface Props {
  query?: UseBaseQueryResult;
}

const MobileLayout: React.FC<Props> = ({ query }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const itemCount = useQuery(CART_ITEM_COUNT_QUERY, () => CartService.getItemCount());
  const { toggleTheme, themeName } = useColorMode();
  React.useEffect(() => {
    if (query?.isFetching) {
      NProgress.start();
    } else {
      NProgress.done(true);
    }
  }, [query?.isFetching]);

  return (
    <div>
      <AppBar position="fixed">
        <Container>
          <Toolbar sx={{ padding: '0px !important' }}>
            <Button
              id="fade-button"
              aria-controls={open ? 'fade-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              sx={{ color: '#fff' }}
            >
              <MenuOpen />
            </Button>
            <Menu
              id="fade-menu"
              MenuListProps={{
                'aria-labelledby': 'fade-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
              PaperProps={{
                sx: {
                  bgcolor: themeName === 'dark' ? '' : '#5893df',
                },
              }}
            >
              <MenuItem>
                <NextLink href="/products" passHref>
                  <Link sx={{ textDecoration: 'none', color: '#fff' }}>Products</Link>
                </NextLink>
              </MenuItem>
              <MenuItem>
                <NextLink href="/collections" passHref>
                  <Link sx={{ textDecoration: 'none', color: '#fff' }}> Collections</Link>
                </NextLink>
              </MenuItem>
            </Menu>
            <NextLink href="/" passHref>
              <Link
                flex="1"
                width="fit-content"
                variant="h6"
                noWrap
                component="div"
                fontSize="24px"
                align="center"
                sx={{
                  display: 'block',
                  color: '#fff',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  fontFamily: 'Montez, cursive',
                  boxShadow: 1,
                  margin: '2px',
                }}
              >
                Mobile
              </Link>
            </NextLink>
            <NextLink href="/cart" passHref>
              <IconButton color="inherit">
                <Badge color="error" badgeContent={itemCount.data}>
                  <ShoppingBasket />
                </Badge>
              </IconButton>
            </NextLink>
            <FormGroup>
              <FormControlLabel
                checked={themeName === 'dark'}
                control={<Switch onClick={toggleTheme} defaultChecked />}
                label={themeName === 'dark' ? 'Dark Theme' : 'Light Theme'}
              />
            </FormGroup>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
    </div>
  );
};

export { MobileLayout };
