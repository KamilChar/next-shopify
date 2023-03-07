import last from 'lodash/last';
import { NextSeo } from 'next-seo';
import { InfiniteData, useInfiniteQuery } from 'react-query';
import { ProductListDefaultWithSort } from '@app/components/sections/product-list';
import { DefaultLayout } from '@app/components/layouts/default-layout/default-layout';

import { PRODUCT_LIST_QUERY_V1 } from '@app/constants/query.constant';
import { ProductService } from '@app/services/product.service';
import { useMemo } from 'react';
import { GetServerSideProps } from 'next';
import { Box, CircularProgress } from '@material-ui/core';

interface Props {
  initialData: InfiniteData<ProductService.List>;
}

const PageV1 = ({ initialData }: Props) => {
  const productList = useInfiniteQuery(
    PRODUCT_LIST_QUERY_V1,
    ({ pageParam }) => ProductService.getList({ after: pageParam }),
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
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <DefaultLayout>
      <NextSeo title="Products" description="All Products from Next Shopify Storefront" />
      <ProductListDefaultWithSort products={list} pagination={productList} />
    </DefaultLayout>
  );
};

export const getStaticProps: GetServerSideProps = async () => {
  const firstPage = await ProductService.getList();

  return {
    props: { initialData: { pages: [firstPage], pageParams: [null] } },
  };
};

export default PageV1;
