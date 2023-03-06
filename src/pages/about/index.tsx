import { DefaultLayout } from '@app/components/layouts/default-layout/default-layout';

import { LocationList } from '@app/components/sections/locationList';
import { LOCATIONS_LIST_QUERY } from '@app/constants/query.constant';
import { LocationsService } from '@app/services/locations.service';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

const About = () => {
  const locationList = useInfiniteQuery(LOCATIONS_LIST_QUERY, async () => await LocationsService.getAllLocations(), {
    keepPreviousData: true,
  });

  const list = useMemo(() => locationList.data?.pages.flatMap(({ locations }) => locations) || [], [locationList]);

  if (locationList.isLoading || locationList.isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <DefaultLayout>
      <LocationList locations={list} />
    </DefaultLayout>
  );
};

export default About;
