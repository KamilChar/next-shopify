import React from 'react';
import NextLink from 'next/link';
import { Card, CardContent, CardMedia, Typography, CardActionArea, Box, Grid } from '@material-ui/core';

import { IntlUtility } from '@app/utilities/intl.utility';
import { ProductService } from '@app/services/product.service';

interface Props {
  product: ProductService.ListItem;
}

export const BannerSingleObject: React.FC<Props> = ({ product }) => {
  return (
    <Card sx={{ height: '400px' }}>
      <NextLink href={product.url} passHref>
        <CardActionArea sx={{ height: '100%' }}>
          <Box sx={{ height: '50%' }}>
            <CardMedia
              sx={{
                flex: 'block',
                height: '100%',
                width: '100%',
                objectFit: 'contain',
              }}
              image={product.image.src}
              alt={product.image.alt}
              component="img"
            />
          </Box>
          <CardContent>
            <Typography
              gutterBottom
              variant="h6"
              component="h3"
              fontSize="20px"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                wordWrap: 'break-word',
                maxWidth: '100%',
              }}
            >
              {product.title}
            </Typography>
            <Typography fontSize="16px" sx={{ color: '#d32f2f' }} gutterBottom variant="body2" component="div">
              {IntlUtility.formatPrice(product.price)}
            </Typography>
            <Typography fontSize="12px" variant="body2" color="inherit">
              {product.description}
            </Typography>
            <Typography fontSize="12px" variant="body2" color="inherit">
              {product.totalInventory} pieces left
            </Typography>
          </CardContent>
        </CardActionArea>
      </NextLink>
    </Card>
  );
};
