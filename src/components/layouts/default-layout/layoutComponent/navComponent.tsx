import { Button, Divider } from '@material-ui/core';
import NextLink from 'next/link';

export const NavComponent = () => {
  return (
    <>
      <NextLink href="/about" passHref>
        <Button color="inherit">About</Button>
      </NextLink>
      <Divider
        orientation="vertical"
        flexItem
        sx={{
          color: 'white',
        }}
      />
      <NextLink href="/products" passHref>
        <Button color="inherit">Products</Button>
      </NextLink>
      <Divider
        orientation="vertical"
        flexItem
        sx={{
          color: 'white',
        }}
      />
      <NextLink href="/categories" passHref>
        <Button color="inherit">Categories</Button>
      </NextLink>
      <Divider
        orientation="vertical"
        flexItem
        sx={{
          color: 'white',
        }}
      />
      <NextLink href="/collections" passHref>
        <Button color="inherit">Collections</Button>
      </NextLink>
      <Divider
        orientation="vertical"
        flexItem
        sx={{
          color: 'white',
        }}
      />
    </>
  );
};
