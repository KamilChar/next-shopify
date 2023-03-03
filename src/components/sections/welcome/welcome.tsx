import last from 'lodash/last';
import { InfiniteData, useInfiniteQuery } from 'react-query';
import { PRODUCT_LIST_QUERY } from '@app/constants/query.constant';
import { ProductService } from '@app/services/product.service';
import { useMemo } from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { BannerPiecesLeft } from '@app/components/banner/bannerPiecesLeft/bannerPiecesLeft';

interface Props {
  initialData: InfiniteData<ProductService.List>;
}

export const Welcome = ({ initialData }: Props) => {
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
    <Card>
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography sx={{ marginBottom: '12px', marginTop: '12px' }} gutterBottom variant="h2" component="h1">
          There are only a few pieces left
        </Typography>
        <BannerPiecesLeft products={list} pagination={productList} />
      </CardContent>
    </Card>
  );
};
