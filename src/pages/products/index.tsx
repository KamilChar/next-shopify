import { DefaultLayout } from '@app/components/layouts/default-layout';
import { Box, Button, Tooltip } from '@mui/material';
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
          <Tooltip title={'Standard version of Page'}>
            <Button sx={{ margin: '12px ' }} variant="contained" size="large">
              Default page of products
            </Button>
          </Tooltip>
        </NextLink>
        <NextLink href="/products/v1" passHref>
          <Tooltip title={'Standard version of Page with some changes'}>
            <Button sx={{ margin: '12px ' }} variant="contained" size="large">
              Default page of products with sort
            </Button>
          </Tooltip>
        </NextLink>

        <NextLink href="/products/v2" passHref>
          <Tooltip
            title={
              'This is the standard version of the page that downloads the entire product list and uses pagination.'
            }
          >
            <Button sx={{ margin: '12px ' }} variant="contained" size="large">
              Product page with pagination
            </Button>
          </Tooltip>
        </NextLink>
      </Box>
    </DefaultLayout>
  );
};

export default SwitchProductPage;
