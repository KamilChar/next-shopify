import React, { useMemo, useState } from 'react';
import {
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  ListItem,
  Stack,
  TextField as _TextField,
} from '@material-ui/core';
import { UseInfiniteQueryResult } from 'react-query';
import { PageLoader } from '@app/components/snippets/page-loader';
import { ProductItem } from '@app/components/snippets/product-item';
import { ProductService } from '@app/services/product.service';
import { styled } from '@material-ui/system';

interface Props {
  products: ProductService.ListItem[];
  pagination: Pick<UseInfiniteQueryResult, 'fetchNextPage' | 'hasNextPage' | 'isFetchingNextPage' | 'error'>;
}

const MySelect = styled(Select)`
  color: red;
`;
const TextField = styled(_TextField)`
  min-width: 250px;
  text-decoration: none;
`;

const sortTypes = ['Name Asc', 'Name Desc', 'Price Asc', 'Price Desc'] as const;
type SortType = typeof sortTypes[number];

export const ProductList: React.FC<Props> = ({ products, pagination }) => {
  const [sortBy, setSortBy] = useState<SortType>('Name Asc');
  const [search, setSearch] = useState('');
  const sortedProducts = useMemo(
    () =>
      products
        .filter(
          (p) =>
            p.description.toLowerCase().includes(search.toLowerCase()) ||
            p.title.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) =>
          sortBy === 'Name Asc'
            ? a.title.localeCompare(b.title)
            : sortBy === 'Name Desc'
            ? b.title.localeCompare(a.title)
            : sortBy === 'Price Asc'
            ? b.price.amount - a.price.amount
            : a.price.amount - b.price.amount
        ),

    [sortBy, products, search]
  );

  return (
    <div>
      <Stack direction="row" gap="1rem" marginBottom={2}>
        <FormControl>
          <InputLabel id="sort-by-label">Sort by</InputLabel>
          <MySelect
            label="Sort by"
            labelId="sort-by-label"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortType)}
          >
            {sortTypes.map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </MySelect>
        </FormControl>
        <TextField
          id="outlined-controlled"
          label="Search by title and description"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Keyword"
        />
      </Stack>

      <Grid container spacing={3} sx={{ marginBottom: '20px' }}>
        {sortedProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <ProductItem product={product} />
          </Grid>
        ))}
      </Grid>
      <PageLoader {...pagination} />
    </div>
  );
};

// import React from 'react';
// import { Grid } from '@material-ui/core';
// import { UseInfiniteQueryResult } from 'react-query';
// import { PageLoader } from '@app/components/snippets/page-loader';
// import { ProductItem } from '@app/components/snippets/product-item';
// import { ProductService } from '@app/services/product.service';

// export interface Props {
//   products: ProductService.ListItem[];
//   pagination: Pick<UseInfiniteQueryResult, 'fetchNextPage' | 'hasNextPage' | 'isFetchingNextPage' | 'error'>;
// }

// export const ProductList: React.FC<Props> = ({ products, pagination }) => {
//   return (
//     <div>
//       <Grid container spacing={3} sx={{ marginBottom: '20px' }}>
//         {products.map((product) => (
//           <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
//             <ProductItem product={product} />
//           </Grid>
//         ))}
//       </Grid>
//       <PageLoader {...pagination} />
//     </div>
//   );
// };
