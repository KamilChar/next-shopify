import { DefaultLayout } from '@app/components/layouts/default-layout';
import { Welcome } from '@app/components/sections/welcome';
import { PRODUCT_LIST_QUERY } from '@app/constants/query.constant';
import { ShopifyService } from '@app/services/shopify.service';
import { SipOutlined } from '@material-ui/icons';
import { useQuery } from 'react-query';

const fetch = async () => {
  const prod = await ShopifyService.getProductList();
  return prod;
};
export default function Page() {
  const { data, isLoading, error } = useQuery(PRODUCT_LIST_QUERY, fetch, {
    onError: (e) => console.log('nie udalo sie', e),
    onSuccess: (e) => console.log('udalo sie', e.products),
  });
  if (isLoading) {
    return <SipOutlined />;
  }
  if (data) {
    return <div>{data.products.edges.toString()}</div>;
  }
  return <></>;
}
