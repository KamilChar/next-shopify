import last from 'lodash/last';
import { InfiniteData, useInfiniteQuery } from 'react-query';
import { PRODUCT_LIST_QUERY } from '@app/constants/query.constant';
import { ProductService } from '@app/services/product.service';
import { useMemo } from 'react';
import { Box, Card, CardContent, Divider, Typography } from '@material-ui/core';
import { BannerPiecesLeft } from '@app/components/banner/bannerPiecesLeft/bannerPiecesLeft';
import { BannerRandomTags } from '@app/components/banner/BannerRandomTags/BannerRandomTags';

interface Props {
  initialData: InfiniteData<ProductService.List>;
}

export const Welcome = ({ initialData }: Props) => {
  const productList = useInfiniteQuery(
    PRODUCT_LIST_QUERY,
    ({ pageParam }) => ProductService.getAllProduct({ cursor: pageParam }),
    {
      initialData,
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
      <Divider
        orientation="horizontal"
        sx={{
          color: 'black',
        }}
      />
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
          <BannerPiecesLeft products={list} />
        </CardContent>
      </Box>
      <Divider
        orientation="horizontal"
        sx={{
          color: 'black',
        }}
      />
      <Divider
        orientation="horizontal"
        sx={{
          color: 'black',
        }}
      />
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
          <BannerRandomTags products={list} />
        </CardContent>
      </Box>
      <Divider
        orientation="horizontal"
        sx={{
          color: 'black',
        }}
      />
    </>
  );
};
