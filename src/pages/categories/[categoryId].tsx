import { NextSeo } from 'next-seo';
import { useInfiniteQuery } from 'react-query';
import { ProductList } from '@app/components/sections/product-list';
import { DefaultLayout } from '@app/components/layouts/default-layout/default-layout';

import { PRODUCT_LIST_BY_TAG_QUERY } from '@app/constants/query.constant';
import { ProductService } from '@app/services/product.service';
import { useMemo } from 'react';
import { Box, CircularProgress } from '@material-ui/core';
import { useRouter } from 'next/router';

const ProductPageByTag = () => {
  const router = useRouter();
  const { asPath } = router;
  const tag = asPath.split('/').pop() || '';

  const productList = useInfiniteQuery(
    PRODUCT_LIST_BY_TAG_QUERY,
    async () => await ProductService.getListProductByTag({ tag: tag })
  );

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
      <NextSeo title={`${tag}`} description={`All Products from Category ${tag}`} />
      <ProductList products={list} />
    </DefaultLayout>
  );
};

export default ProductPageByTag;
