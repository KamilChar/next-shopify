import React from 'react';
import { Grid } from '@material-ui/core';
import { ProductService } from '@app/services/product.service';
import { useMemo, useState } from 'react';
import { Pagination } from '@material-ui/lab';
import { BannerSingleObject } from '@app/components/banner/bannerObject/bannerSingleObject';

interface Props {
  products: ProductService.ListItem[];
}

export const BannerPiecesLeftObject: React.FC<Props> = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;

  const filteredProduct = useMemo(
    () =>
      products
        .filter((p) => p.totalInventory > 0 && p.totalInventory < 6)
        .sort((a, b) => a.totalInventory - b.totalInventory),
    [products]
  );

  const pagesCount = Math.ceil(filteredProduct.length / productsPerPage);

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const displayedProducts = filteredProduct.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

  return (
    <>
      <Grid
        container
        spacing={3}
        sx={{ marginBottom: '20px', display: 'flex', justifyContent: 'center', margin: '20px auto 0 auto' }}
      >
        {displayedProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <BannerSingleObject product={product} />
          </Grid>
        ))}
      </Grid>
      <Pagination
        sx={{
          display: 'flex',
          justifyContent: 'center',
          margin: '20px auto 0 auto',
        }}
        count={pagesCount}
        page={currentPage}
        onChange={handleChangePage}
        color="primary"
        size="large"
        siblingCount={1}
        boundaryCount={1}
        showFirstButton
        showLastButton
      />
    </>
  );
};

// import { Grid } from '@material-ui/core';
// import { ProductService } from '@app/services/product.service';
// import { ProductItem } from '@app/components/snippets/product-item';
// import { useMemo } from 'react';

// interface Props {
//   products: ProductService.ListItem[];
// }

// export const BannerPiecesLeft: React.FC<Props> = ({ products }) => {
//   const filteredProduct = useMemo(
//     () =>
//       products
//         .filter((p) => p.totalInventory > 0 && p.totalInventory < 6)
//         .sort((a, b) => a.totalInventory - b.totalInventory),
//     [products]
//   );

//   return (
//     <>
//       <Grid container spacing={3} sx={{ marginBottom: '20px' }}>
//         {filteredProduct.map((product) => (
//           <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
//             <ProductItem product={product} />
//           </Grid>
//         ))}
//       </Grid>
//     </>
//   );
// };
