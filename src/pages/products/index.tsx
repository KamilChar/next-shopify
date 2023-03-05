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
          <Button color="inherit" sx={{ margin: '12px ' }} variant="outlined" size="small">
            Default page products
          </Button>
        </NextLink>
        <NextLink href="/products/v1" passHref>
          <Button color="inherit" sx={{ margin: '12px ' }} variant="outlined" size="medium">
            Products page with numeric pagination
          </Button>
        </NextLink>

        <NextLink href="/products/v2" passHref>
          <Button sx={{ margin: '12px ' }} variant="contained" size="large">
            Product page with arrow pagination
          </Button>
        </NextLink>
      </Box>
    </DefaultLayout>
  );
};

export default SwitchProductPage;
