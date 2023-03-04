import { Grid } from '@material-ui/core';
import { ProductService } from '@app/services/product.service';
import { UseInfiniteQueryResult } from 'react-query';
import { ProductItem } from '@app/components/snippets/product-item';
import { useMemo } from 'react';

interface Props {
  products: ProductService.ListItem[];
  pagination: Pick<UseInfiniteQueryResult, 'fetchNextPage' | 'hasNextPage' | 'isFetchingNextPage' | 'error'>;
}

export const BannerPiecesLeft: React.FC<Props> = ({ products }) => {
  const filteredProduct = useMemo(
    () =>
      products
        .filter((p) => p.totalInventory < 5 || p.totalInventory > 1)
        .sort((a, b) => a.title.localeCompare(b.title)),
    [products]
  );

  return (
    <>
      <Grid container spacing={3} sx={{ marginBottom: '20px' }}>
        {filteredProduct.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <ProductItem product={product} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
