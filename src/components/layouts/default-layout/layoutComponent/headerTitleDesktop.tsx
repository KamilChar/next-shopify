import { Link } from '@material-ui/core';
import NextLink from 'next/link';

export const HeaderTitleDesktop = () => {
  return (
    <NextLink href="/" passHref>
      <Link
        flex="1"
        width="fit-content"
        variant="h6"
        noWrap
        component="div"
        fontSize="24px"
        sx={{
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
  );
};
