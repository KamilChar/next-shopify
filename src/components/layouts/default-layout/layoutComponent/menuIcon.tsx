import React from 'react';
import { Button, Fade, Link, Menu, MenuItem } from '@mui/material';

import { useState, MouseEvent, useEffect, ReactNode } from 'react';
import NextLink from 'next/link';
import NProgress from 'nprogress';

import { UseBaseQueryResult } from 'react-query';
import { MenuOpen } from '@mui/icons-material';

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
        color="inherit"
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
            bgcolor: themeName === 'dark' ? '' : '#dfdd58',
          },
        }}
      >
        <MenuItem>
          <NextLink href="/about" passHref>
            <Link sx={{ textDecoration: 'none', color: 'inherit' }}> About</Link>
          </NextLink>
        </MenuItem>
        <MenuItem sx={{ borderColor: 'inherit' }}>
          <NextLink href="/products" passHref>
            <Link sx={{ textDecoration: 'none', color: 'inherit' }}>Products</Link>
          </NextLink>
        </MenuItem>
        <MenuItem>
          <NextLink href="/categories" passHref>
            <Link sx={{ textDecoration: 'none', color: 'inherit' }}>Categories</Link>
          </NextLink>
        </MenuItem>
        <MenuItem>
          <NextLink href="/collections" passHref>
            <Link sx={{ textDecoration: 'none', color: 'inherit' }}> Collections</Link>
          </NextLink>
        </MenuItem>
      </Menu>
    </>
  );
};
