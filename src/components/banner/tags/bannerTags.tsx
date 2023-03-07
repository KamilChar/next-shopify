import { TAGS_LIST_QUERY } from '@app/constants/query.constant';
import { ProductService } from '@app/services/product.service';
import { useInfiniteQuery } from 'react-query';
import { useEffect, useState } from 'react';
import Chance from 'chance';
import { Button, Grid, Typography } from '@material-ui/core';

const chance = new Chance();

export const BannerTags = () => {
  const tagsList = useInfiniteQuery(TAGS_LIST_QUERY, async () => await ProductService.getTags());

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const generateRandomTags = () => {
    let uniqueStrings = new Set();
    for (let page of tagsList.data?.pages || []) {
      let products = page.products.flatMap((product) => product.tags);
      for (let str of products) {
        uniqueStrings.add(str);
      }
    }
    let result = Array.from(uniqueStrings) as string[];
    let randomTags = [];
    while (randomTags.length < 30 && result.length > 0) {
      let index = chance.natural({ max: result.length - 1 });
      randomTags.push(result[index]);
      result.splice(index, 1);
    }
    setSelectedTags(randomTags);
  };

  const handleRandomTags = () => {
    generateRandomTags();
  };

  return (
    <>
      <Grid sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', m: 2 }}>
        <Button sx={{ width: '350px' }} variant={'contained'} onClick={handleRandomTags}>
          Generate Product Tags from Storefront
        </Button>
        <Typography fontFamily={'serif'} fontSize={'36px'} sx={{ m: 2 }}>
          Product Tags:
        </Typography>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{ m: '2', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          {selectedTags.map((tags) => {
            return (
              <Grid item xs={2} key={tags}>
                <Typography fontSize={'12px'}>{tags}</Typography>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </>
  );
};
