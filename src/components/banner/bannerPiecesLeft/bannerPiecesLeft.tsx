import { BannerPiecesLeftObject } from '@app/components/banner/bannerPiecesLeft/bannerPiecesLeftObject';
import { Grid } from '@material-ui/core';
import { PageLoader } from '@app/components/snippets/page-loader';
import { ProductService } from '@app/services/product.service';
import { UseInfiniteQueryResult } from 'react-query';

interface Props {
  // products: ProductService.ListItem[];
  products: Omit<ProductService.Single, 'variants' | 'seo'>[];
  pagination: Pick<UseInfiniteQueryResult, 'fetchNextPage' | 'hasNextPage' | 'isFetchingNextPage' | 'error'>;
}

export const BannerPiecesLeft: React.FC<Props> = ({ products, pagination }) => {
  return (
    <>
      <Grid container spacing={3} sx={{ marginBottom: '20px' }}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <BannerPiecesLeftObject product={product} />
          </Grid>
        ))}
      </Grid>
      <PageLoader {...pagination} />
    </>
  );
};
