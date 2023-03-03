import { CART_ITEM_COUNT_QUERY } from '@app/constants/query.constant';
import { Badge, IconButton } from '@material-ui/core';
import { ShoppingBasket } from '@material-ui/icons';
import { useQuery } from 'react-query';
import NextLink from 'next/link';
import { CartService } from '@app/services/cart.service';

export const CartIcon = () => {
  const itemCount = useQuery(CART_ITEM_COUNT_QUERY, () => CartService.getItemCount());

  return (
    <>
      <NextLink href="/cart" passHref>
        <IconButton color="inherit">
          <Badge color="error" badgeContent={itemCount.data}>
            <ShoppingBasket />
          </Badge>
        </IconButton>
      </NextLink>
    </>
  );
};
