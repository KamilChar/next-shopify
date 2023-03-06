import { useInfiniteQuery } from 'react-query';
import { RANDOM_LIST_QUERY } from '@app/constants/query.constant';
import { ProductService } from '@app/services/product.service';
import { useMemo } from 'react';
import { Box, CardContent } from '@material-ui/core';
import { RandomItemsOne } from '@app/components/sections/product-single/randomItemOne';

export const RandomItems = () => {
  const productList = useInfiniteQuery(RANDOM_LIST_QUERY, async () => await ProductService.getAllProduct());

  const list = useMemo(() => productList.data?.pages.flatMap(({ products }) => products) || [], [productList]);

  if (productList.isLoading || productList.isFetching) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Box>
        <CardContent sx={{ textAlign: 'center' }}>
          <RandomItemsOne products={list} />
        </CardContent>
      </Box>
    </>
  );
};
