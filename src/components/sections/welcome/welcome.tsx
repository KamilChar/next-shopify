import { BannerPiecesLeft } from '@app/components/banner/bannerPiecesLeft/bannerPiecesLeft';
import { Divider } from '@material-ui/core';

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
    </>
  );
};
