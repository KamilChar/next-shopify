import { Divider } from '@mui/material';

import { BannerPiecesLeft } from '@app/components/banner/bannerPiecesLeft';
import { BannerProductTypes } from '@app/components/banner/bannerProductTypes';

export const Welcome = () => {
  return (
    <>
      <Divider
        orientation="horizontal"
        sx={{
          color: 'inherit',
        }}
      />
      <BannerPiecesLeft />
      <Divider
        orientation="horizontal"
        sx={{
          color: 'inherit',
        }}
      />
      <BannerProductTypes />
      <Divider
        orientation="horizontal"
        sx={{
          color: 'inherit',
        }}
      />
    </>
  );
};
