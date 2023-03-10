import { NextSeo } from 'next-seo';
import { useInfiniteQuery } from 'react-query';
import { ProductList } from '@app/components/sections/product-list';
import { DefaultLayout } from '@app/components/layouts/default-layout/default-layout';

import { PRODUCT_LIST_QUERY_V2 } from '@app/constants/query.constant';
import { ProductService } from '@app/services/product.service';
import { useMemo } from 'react';
import { Box, CircularProgress } from '@mui/material';

const ProductPage = () => {
  const productList = useInfiniteQuery(PRODUCT_LIST_QUERY_V2, async () => await ProductService.getAllProduct(), {
    keepPreviousData: true,
  });

  const list = useMemo(() => productList.data?.pages.flatMap(({ products }) => products) || [], [productList]);

  if (productList.isLoading || productList.isFetching) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <DefaultLayout>
      <NextSeo title="Products" description="All Products from Next Shopify Storefront" />
      <ProductList products={list} />
    </DefaultLayout>
  );
};

export default ProductPage;
