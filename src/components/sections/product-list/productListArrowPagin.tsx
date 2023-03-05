import React from 'react';
import { Grid } from '@material-ui/core';
import { UseInfiniteQueryResult } from 'react-query';
import { PageLoaderArrow } from '@app/components/snippets/page-loader';
import { ProductItem } from '@app/components/snippets/product-item';
import { ProductService } from '@app/services/product.service';

export interface PropsArrow {
  products: ProductService.ListItem[];
  pagination: Pick<
    UseInfiniteQueryResult,
    'fetchNextPage' | 'hasNextPage' | 'isFetchingNextPage' | 'error' | 'fetchPreviousPage' | 'hasPreviousPage'
  >;
}

export const ProductListArrow: React.FC<PropsArrow> = ({ products, pagination }) => {
  return (
    <div>
      <Grid container spacing={3} sx={{ marginBottom: '20px' }}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <ProductItem product={product} />
          </Grid>
        ))}
      </Grid>
      <PageLoaderArrow {...pagination} />
    </div>
  );
};
