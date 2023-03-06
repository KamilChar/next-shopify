import last from 'lodash/last';
import { InfiniteData, useInfiniteQuery } from 'react-query';
import { BANNER_LIST_QUERY } from '@app/constants/query.constant';
import { ProductService } from '@app/services/product.service';
import { useMemo } from 'react';
import { Box, CardContent, Typography } from '@material-ui/core';
import { BannerPiecesLeftObject } from '@app/components/banner/bannerPiecesLeft/bannerPiecesLeftObject';

export const BannerPiecesLeft = () => {
  const productList = useInfiniteQuery(BANNER_LIST_QUERY, async () => await ProductService.getAllProduct());

  const list = useMemo(() => productList.data?.pages.flatMap(({ products }) => products) || [], [productList]);

  if (productList.isLoading || productList.isFetching) {
    return <div>Loading...</div>;
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
          <BannerPiecesLeftObject products={list} />
        </CardContent>
      </Box>
    </>
  );
};
