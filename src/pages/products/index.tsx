import { DefaultLayout } from '@app/components/layouts/default-layout';
import { Box, Button } from '@material-ui/core';
import NextLink from 'next/link';

const SwitchProductPage = () => {
  return (
    <DefaultLayout>
      <Box
        sx={{
          '& button': { p: 2, m: 1, textAlign: 'center' },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <NextLink href="/products/default" passHref>
          <Button sx={{ margin: '12px ' }} variant="contained" size="large">
            Default page of products
          </Button>
        </NextLink>
        <NextLink href="/products/v1" passHref>
          <Button sx={{ margin: '12px ' }} variant="contained" size="large">
            Default page of products with sort
          </Button>
        </NextLink>

        <NextLink href="/products/v2" passHref>
          <Button sx={{ margin: '12px ' }} variant="contained" size="large">
            Product page with pagination
          </Button>
        </NextLink>
      </Box>
    </DefaultLayout>
  );
};

export default SwitchProductPage;
