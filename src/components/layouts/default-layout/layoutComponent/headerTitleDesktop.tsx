import { Card, Link } from '@material-ui/core';
import NextLink from 'next/link';

export const HeaderTitleDesktop = () => {
  return (
    <NextLink href="/" passHref>
      <Link
        flex="1"
        variant="h6"
        noWrap
        component="div"
        fontSize="24px"
        color="inherit"
        sx={{
          display: 'block',
          textDecoration: 'none',
          cursor: 'pointer',
          fontFamily: 'Montez, cursive',
        }}
      >
        Desktop
      </Link>
    </NextLink>
  );
};
