import React from 'react';
import NextLink from 'next/link';
import { Card, CardContent, CardMedia, Typography, CardActionArea } from '@material-ui/core';

import { IntlUtility } from '@app/utilities/intl.utility';
import { ProductService } from '@app/services/product.service';

interface Props {
  product: ProductService.ListItem;
}

export const BannerPiecesLeftObject: React.FC<Props> = ({ product }) => {
  return (
    <Card sx={{ height: '100%' }}>
      <NextLink href={product.url} passHref>
        <CardActionArea sx={{ display: 'block', height: '100%' }}>
          <CardMedia height={150} width={30} image={product.image.src} alt={product.image.alt} component="img" />
          <CardContent>
            <Typography gutterBottom variant="h6" component="h3" fontSize="20px">
              {product.title}
            </Typography>
            <Typography fontSize="16px" sx={{ color: '#d32f2f' }} gutterBottom variant="body2" component="div">
              {IntlUtility.formatPrice(product.price)}
            </Typography>
            <Typography fontSize="12px" variant="body2" color="text.secondary">
              {product.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </NextLink>
    </Card>
  );
};
