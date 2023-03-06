import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { LocationsService } from '@app/services/locations.service';

interface Props {
  locations: LocationsService.Location;
}

export const LocationItem: React.FC<Props> = ({ locations }) => {
  return (
    <Card sx={{ height: '400px' }}>
      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          component="h3"
          fontSize="20px"
          sx={{
            maxWidth: '100%',
          }}
        >
          {locations.name}
        </Typography>
        <Typography fontSize="12px" variant="body2" color="inherit">
          {locations.address}
        </Typography>
      </CardContent>
    </Card>
  );
};
