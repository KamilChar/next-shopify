import { useInfiniteQuery } from 'react-query';
import { RANDOM_LIST_QUERY } from '@app/constants/query.constant';
import { ProductService } from '@app/services/product.service';
import { useMemo } from 'react';
import { Box, CardContent, CircularProgress } from '@mui/material';
import { RandomItemsDisplay } from '@app/components/sections/product-single/randomItemsDisplay';

export const RandomItems = () => {
  const productList = useInfiniteQuery(RANDOM_LIST_QUERY, async () => await ProductService.getAllProduct());

  const list = useMemo(() => productList.data?.pages.flatMap(({ products }) => products) || [], [productList]);

  if (productList.isLoading || productList.isFetching) {
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
          <RandomItemsDisplay products={list} />
        </CardContent>
      </Box>
    </>
  );
};
