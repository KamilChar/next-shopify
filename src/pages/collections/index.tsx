import last from 'lodash/last';
import { NextSeo } from 'next-seo';
import { InfiniteData, useInfiniteQuery } from 'react-query';
import { DefaultLayout } from '@app/components/layouts/default-layout/default-layout';

import { COLLECTION_LIST_QUERY } from '@app/constants/query.constant';
import { CollectionService } from '@app/services/collection.service';
import { CollectionList } from '@app/components/sections/collection-list';
import { useMemo } from 'react';

interface Props {
  initialData: InfiniteData<CollectionService.CollectionList>;
}

export async function getStaticProps(): Promise<{ props: Props }> {
  const firstPage = await CollectionService.getList();

  return {
    props: { initialData: { pages: [firstPage], pageParams: [null] } },
  };
}

export default function Page({ initialData }: Props) {
  const collectionList = useInfiniteQuery(
    COLLECTION_LIST_QUERY,
    ({ pageParam }) => CollectionService.getList({ after: pageParam }),
    {
      initialData,
      getNextPageParam: (lastPage) => {
        if (lastPage.pageInfo.hasNextPage) {
          return last(lastPage.collections)?.cursor;
        }
      },
    }
  );

  const list = useMemo(
    () => collectionList.data?.pages.flatMap(({ collections }) => collections) || [],
    [collectionList]
  );

  if (collectionList.isFetching || collectionList.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <DefaultLayout>
      <NextSeo title="Collections" description="All Collections from Next Shopify Storefront" />
      <CollectionList collections={list} pagination={collectionList} />
    </DefaultLayout>
  );
}
