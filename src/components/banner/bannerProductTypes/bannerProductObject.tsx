import { styled, CardActionArea, Box, CardMedia, Typography } from '@mui/material';
import NextLink from 'next/link';

const StyledActionArea = styled(CardActionArea)({
  m: 1,
  height: '100%',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
});

const StyledBoxTopography = styled(Box)({
  width: 'auto',
  height: 'auto',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  color: 'white',
  textAlign: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  padding: '10px',
  borderRadius: '5px',
});

type Props = {
  type: string;
};

export const BannerProductObject: React.FC<Props> = ({ type }) => {
  return (
    <>
      <NextLink href={`/categories/${type}`} passHref>
        <StyledActionArea>
          <CardMedia
            sx={{ height: '300px', width: '100%', objectFit: 'fill' }}
            image={`/images/${type}.jpg`}
            component="img"
          />
          <StyledBoxTopography>
            <Typography color="#fff" fontSize={'12px'}>
              {type}
            </Typography>
          </StyledBoxTopography>
        </StyledActionArea>
      </NextLink>
    </>
  );
};
