import { Link } from '@material-ui/core';
import NextLink from 'next/link';

export const HeaderTitleMobile = () => {
  return (
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
        }}
      >
        Mobile
      </Link>
    </NextLink>
  );
};
