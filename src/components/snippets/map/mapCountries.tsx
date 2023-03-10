import { Countries } from '@app/components/snippets/map/countries';
import { Box, Button, Card, Typography } from '@mui/material';
import { Chance } from 'chance';
import { useEffect, useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

const geoUrl = 'https://raw.githubusercontent.com/deldersveld/topojson/master/continents/europe.json';

export const MapCountries = () => {
  const [randomCountries, setRandomCountries] = useState<string[]>([]);

  useEffect(() => {
    generateRandomCountries();
  }, []);

  const generateRandomCountries = () => {
    const chance = new Chance();
    const chanceCountries = chance.pickset(Countries, 3);
    setRandomCountries(chanceCountries);
  };

  const handleNewCountriesClick = () => {
    generateRandomCountries();
  };

  return (
    <Box
      sx={{
        m: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          height: '400px',
          width: '400px',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ComposableMap
          width={800}
          height={800}
          projection="geoAzimuthalEqualArea"
          projectionConfig={{
            rotate: [-18.0, -59.0, 0],
            scale: 930,
          }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) => {
              return geographies.map((geo, index) => {
                const selected = randomCountries.find((s) => s === geo.properties.geounit);
                return (
                  <Geography
                    key={index}
                    geography={geo}
                    fill={selected ? 'red' : 'inherit'}
                    strokeWidth={2}
                    stroke="white"
                  />
                );
              });
            }}
          </Geographies>
        </ComposableMap>
      </Box>
      <Button onClick={handleNewCountriesClick} variant="contained">
        New Countries
      </Button>
      <Typography fontSize={'36px'} sx={{ m: 2 }}>
        You can find us in:
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          m: 2,
          height: '100%',
          width: 'auto',
        }}
      >
        {randomCountries.map((country) => {
          return (
            <Card
              key={country}
              sx={{ height: '150px', width: 'auto', display: 'flex', flexDirection: 'column', m: 2, p: 2 }}
            >
              <Typography
                fontFamily={'sans-serif'}
                fontSize={'20px'}
                gutterBottom
                variant="h4"
                component="h3"
                sx={{ alignSelf: 'center' }}
              >
                {country}
              </Typography>
              <Typography fontSize={'16px'} gutterBottom variant="h5" component="h3">
                City of {country}
              </Typography>
              <Typography fontSize={'12px'} gutterBottom variant="h6" component="h3">
                Address of {country}
              </Typography>
              <Typography fontSize={'12px'} gutterBottom variant="h6" component="h3">
                Postal Code of {country}
              </Typography>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
};
