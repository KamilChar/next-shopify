import { CART_ITEM_COUNT_QUERY } from '@app/constants/query.constant';
import { Badge, IconButton } from '@mui/material';

import { useQuery } from 'react-query';
import NextLink from 'next/link';
import { CartService } from '@app/services/cart.service';
import { ShoppingBasket } from '@mui/icons-material';

export const CartIcon = () => {
  const itemCount = useQuery(CART_ITEM_COUNT_QUERY, () => CartService.getItemCount());

  return (
    <>
      <NextLink href="/cart" passHref>
        <IconButton sx={{ margin: '12px' }} color="inherit">
          <Badge color="error" badgeContent={itemCount.data}>
            <ShoppingBasket />
          </Badge>
        </IconButton>
      </NextLink>
    </>
  );
};
