import React from 'react';
import { Button } from '@material-ui/core';
import { UseInfiniteQueryResult } from 'react-query';

export type PageLoaderArrowProps = Pick<
  UseInfiniteQueryResult,
  'fetchNextPage' | 'hasNextPage' | 'isFetchingNextPage' | 'error' | 'fetchPreviousPage' | 'hasPreviousPage'
>;

export const PageLoaderArrow: React.FC<PageLoaderArrowProps> = (props) => {
  return (
    <div css={{ textAlign: 'center' }}>
      {(() => {
        if (props.isFetchingNextPage) {
          return <Button color="warning">Loading...</Button>;
        }

        if (props.error) {
          return (
            <Button onClick={() => props.fetchNextPage()} color="error">
              Try Again to Load More
            </Button>
          );
        }

        if (props.hasNextPage) {
          return <Button onClick={() => props.fetchNextPage()}>Load More</Button>;
        }
        if (props.hasPreviousPage) {
          return <Button onClick={() => props.fetchPreviousPage()}>Load Less</Button>;
        }

        return <Button disabled>Nothing more to load</Button>;
      })()}
    </div>
  );
};
