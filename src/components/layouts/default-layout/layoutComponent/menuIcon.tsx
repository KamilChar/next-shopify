import { Button, Fade, Link, Menu, MenuItem } from '@material-ui/core';
import { MenuOpen } from '@material-ui/icons';
import { useState, MouseEvent, useEffect, ReactNode } from 'react';
import NextLink from 'next/link';
import NProgress from 'nprogress';

import { UseBaseQueryResult } from 'react-query';

interface Props {
  query?: UseBaseQueryResult;
  themeName: ReactNode;
}

export const MenuIcon: React.FC<Props> = ({ query, themeName }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (query?.isFetching) {
      NProgress.start();
    } else {
      NProgress.done(true);
    }
  }, [query?.isFetching]);

  return (
    <>
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
    </>
  );
};
