import React from 'react';
import { Button } from '@material-ui/core';
import { UseInfiniteQueryResult } from 'react-query';

export type PageLoaderArrowPrev = Pick<
  UseInfiniteQueryResult,
  'fetchPreviousPage' | 'hasPreviousPage' | 'isFetchingPreviousPage' | 'error'
>;

export const PageLoaderArrowPrev: React.FC<PageLoaderArrowPrev> = (props) => {
  return (
    <div css={{ textAlign: 'center' }}>
      {(() => {
        if (props.isFetchingPreviousPage) {
          return <Button color="warning">Loading...</Button>;
        }

        if (props.error) {
          return (
            <Button onClick={() => props.fetchPreviousPage()} color="error">
              Try Again to Load More
            </Button>
          );
        }
        if (props.hasPreviousPage) {
          return <Button onClick={() => props.fetchPreviousPage()}>Load Less</Button>;
        }
      })()}
    </div>
  );
};
