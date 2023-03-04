import last from 'lodash/last';
import { InfiniteData, useInfiniteQuery } from 'react-query';
import { PRODUCT_LIST_QUERY } from '@app/constants/query.constant';
import { ProductService } from '@app/services/product.service';
import { useMemo } from 'react';
import { Box, Card, CardContent, Divider, Typography } from '@material-ui/core';
import { BannerPiecesLeftObject } from '@app/components/banner/bannerPiecesLeft/bannerPiecesLeftObject';

interface Props {
  initialData: InfiniteData<ProductService.List>;
}

export const BannerPiecesLeft = () => {
  const productList = useInfiniteQuery(
    PRODUCT_LIST_QUERY,
    async ({ pageParam }) => await ProductService.getAllProduct({ cursor: pageParam }),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.pageInfo.hasNextPage) {
          return last(lastPage.products)?.cursor;
        }
      },
    }
  );

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
