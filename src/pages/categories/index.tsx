import { TAGS_LIST_QUERY } from '@app/constants/query.constant';
import { ProductService } from '@app/services/product.service';
import { useInfiniteQuery } from 'react-query';
import { useMemo } from 'react';
import { Box, Button, CircularProgress, Grid, Typography } from '@material-ui/core';
import { DefaultLayout } from '@app/components/layouts/default-layout';
import { useRouter } from 'next/router';

const ProductTagsPage = () => {
  const router = useRouter();

  const tagsList = useInfiniteQuery(TAGS_LIST_QUERY, async () => await ProductService.getTags());

  const list = useMemo(() => tagsList.data?.pages.flatMap(({ tags }) => tags) || [], [tagsList.data]);

  const showSelectedTagHandler = (tags: string) => {
    const fullPath = `categories/${tags.toString()}`;
    router.push(fullPath);
  };

  const AllTags = () => {
    let uniqueStrings = new Set(list.flatMap((tag) => tag.tags));
    let result = Array.from(uniqueStrings);
    return result;
  };

  if (tagsList.isLoading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <DefaultLayout>
      <Grid sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', m: 2 }}>
        <Typography fontFamily={'serif'} fontSize={'36px'} sx={{ m: 2 }}>
          Product categories:
        </Typography>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{ m: '2', flexWrap: 'wrap', justifyContent: 'space-between' }}
        >
          {AllTags().map((tags: string) => {
            return (
              <Grid item xs={2} key={tags}>
                <Button onClick={() => showSelectedTagHandler(tags)}>
                  <Typography fontSize={'12px'}>{tags}</Typography>
                </Button>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </DefaultLayout>
  );
};

export default ProductTagsPage;
