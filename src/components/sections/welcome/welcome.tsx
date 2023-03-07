import { Divider } from '@material-ui/core';

import { BannerPiecesLeft } from '@app/components/banner/bannerPiecesLeft';
import { BannerTags } from '@app/components/banner/tags';

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
      <BannerTags />
      <Divider
        orientation="horizontal"
        sx={{
          color: 'inherit',
        }}
      />
    </>
  );
};
