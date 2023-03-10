import { PRODUCT_TYPE_LIST_QUERY } from '@app/constants/query.constant';
import { ProductService } from '@app/services/product.service';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';
import { styled } from '@material-ui/styles';
import Carousel from 'react-material-ui-carousel';
import { BannerProductObject } from '@app/components/banner/bannerProductTypes/bannerProductObject';

const StyledDiv = styled('div')({
  m: 2,
  p: 1,
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
});

const StyledCarousel = styled(Carousel)({
  width: '400px',
  height: '100%',
  margin: 0,
  padding: 0,
});

export const BannerProductTypes = () => {
  const typeList = useInfiniteQuery(PRODUCT_TYPE_LIST_QUERY, async () => await ProductService.getTypes());

  const list = useMemo(() => typeList.data?.pages.flatMap(({ productType }) => productType) || [], [typeList.data]);

  const allTypes = () => {
    let uniqueStrings = new Set(list.flatMap((type) => type.productType));
    let result = Array.from(uniqueStrings);
    return result;
  };

  return (
    <StyledDiv>
      <StyledCarousel>
        {allTypes().map((type, index) => (
          <BannerProductObject type={type} key={index} />
        ))}
      </StyledCarousel>
    </StyledDiv>
  );
};
