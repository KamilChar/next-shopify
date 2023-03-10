import { useInfiniteQuery } from 'react-query';
import { BANNER_LIST_QUERY } from '@app/constants/query.constant';
import { ProductService } from '@app/services/product.service';
import { useMemo } from 'react';
import { Box, CardContent, CircularProgress, Typography } from '@mui/material';
import { BannerPiecesLeftItems } from '@app/components/banner/bannerPiecesLeft/bannerPiecesLeftItems';

export const BannerPiecesLeft = () => {
  const productList = useInfiniteQuery(BANNER_LIST_QUERY, async () => await ProductService.getAllProduct());

  const list = useMemo(() => productList.data?.pages.flatMap(({ products }) => products) || [], [productList]);
  if (productList.isLoading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Box>
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography
            sx={{ marginBottom: '12px', marginTop: '12px' }}
            fontSize="32px"
            gutterBottom
            variant="h2"
            component="h1"
          >
            There are only a few pieces left
          </Typography>
          <BannerPiecesLeftItems products={list} />
        </CardContent>
      </Box>
    </>
  );
};
