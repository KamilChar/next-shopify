import React, { useMemo, useState } from 'react';
import {
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField as _TextField,
  Pagination,
} from '@material-ui/core';
import { UseInfiniteQueryResult } from 'react-query';
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

export const ProductList: React.FC<Props> = ({ products }) => {
  const [sortBy, setSortBy] = useState<SortType>(sortTypes[0]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
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

  const pagesCount = Math.ceil(sortedProducts.length / productsPerPage);

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const displayedProducts = sortedProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

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
        {displayedProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <ProductItem product={product} />
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
    </div>
  );
};
