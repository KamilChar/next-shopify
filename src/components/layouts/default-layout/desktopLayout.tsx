import React from 'react';
import NextLink from 'next/link';
import NProgress from 'nprogress';
import { ShoppingBasket } from '@material-ui/icons';
import { useQuery, UseBaseQueryResult } from 'react-query';
import {
  Link,
  Badge,
  AppBar,
  Button,
  Toolbar,
  Container,
  IconButton,
  Alert,
  FormControlLabel,
  FormGroup,
  Switch,
} from '@material-ui/core';

import { CartService } from '@app/services/cart.service';
import { CART_ITEM_COUNT_QUERY } from '@app/constants/query.constant';
import { useColorMode } from '@app/utilities/hooks/ColorModeContainer';

interface Props {
  query?: UseBaseQueryResult;
}

const DesktopLayout: React.FC<Props> = ({ query }) => {
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
            <NextLink href="/" passHref>
              <Link
                variant="h6"
                noWrap
                component="div"
                sx={{
                  flexGrow: 1,
                  display: 'block',
                  color: '#fff',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  fontFamily: 'Montez, cursive',
                }}
              >
                Desktop
              </Link>
            </NextLink>

            <NextLink href="/products" passHref>
              <Button color="inherit">Products</Button>
            </NextLink>

            <NextLink href="/collections" passHref>
              <Button color="inherit">Collections</Button>
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

export { DesktopLayout };
