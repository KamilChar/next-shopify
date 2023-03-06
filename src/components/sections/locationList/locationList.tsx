import { LocationsService } from '@app/services/locations.service';
import { LocationItem } from '@app/components/snippets/locationItem';
import { Grid } from '@material-ui/core';

export interface LocationProps {
  locations: LocationsService.Location[];
}
export const LocationList: React.FC<LocationProps> = ({ locations }) => {
  return (
    <>
      {locations.map((location) => (
        <Grid key={location.id}>
          <LocationItem locations={location} />
        </Grid>
      ))}
    </>
  );
};
