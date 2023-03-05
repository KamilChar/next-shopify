import { Link } from '@material-ui/core';
import NextLink from 'next/link';
import { ReactNode } from 'react';

interface Props {
  themeName: ReactNode;
}

export const HeaderTitleMobile: React.FC<Props> = ({ themeName }) => {
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
          color: themeName === 'dark' ? 'white' : 'black',
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
