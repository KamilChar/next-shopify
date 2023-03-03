import last from 'lodash/last';
import { NextSeo } from 'next-seo';
import { InfiniteData, useInfiniteQuery } from 'react-query';
import { ProductList } from '@app/components/sections/product-list';
import { DefaultLayout } from '@app/components/layouts/default-layout/default-layout';

import { PRODUCT_LIST_QUERY } from '@app/constants/query.constant';
import { ProductService } from '@app/services/product.service';
import { useMemo } from 'react';
import { GetServerSideProps } from 'next';

interface Props {
  initialData: InfiniteData<ProductService.List>;
}

const ProductPage = ({ initialData }: Props) => {
  const productList = useInfiniteQuery(
    PRODUCT_LIST_QUERY,
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
    return <div>Loading...</div>;
  }

  return (
    <DefaultLayout>
      <NextSeo title="Products" description="All Products from Next Shopify Storefront" />
      <ProductList products={list} pagination={productList} />
    </DefaultLayout>
  );
};

export const getStaticProps: GetServerSideProps = async () => {
  const firstPage = await ProductService.getList();

  return {
    props: { initialData: { pages: [firstPage], pageParams: [null] } },
  };
};

export default ProductPage;
