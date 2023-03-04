import React from 'react';
import Image from 'next/image';
import truncate from 'lodash/truncate';
import { Swiper as SwiperSlider, SwiperSlide } from 'swiper/react';
import { Card, Grid, Typography } from '@material-ui/core';

import { ProductService } from '@app/services/product.service';

interface Props {
  product: ProductService.Single;
}

export const BannerPiecesLeftObject: React.FC<Props> = ({ product }) => {
  return (
    <section>
      <Card sx={{ marginBottom: '20px' }}>
        <Grid container>
          <Grid item xs={12} sm={5}>
            <SwiperSlider>
              {product.images.map(({ id, src, alt }) => (
                <SwiperSlide key={id}>
                  <Image src={src} alt={alt} width="768" height="1024" layout="responsive" />
                </SwiperSlide>
              ))}
            </SwiperSlider>
          </Grid>
          <Grid item xs={12} sm={7}>
            <div css={{ padding: '20px' }}>
              <Typography sx={{ marginBottom: '20px' }} gutterBottom variant="h5" component="h1">
                {product.title}
              </Typography>
              <Typography sx={{ marginBottom: '20px' }} gutterBottom variant="h6" component="h2">
                Pieces left: {product.totalInventory}
              </Typography>

              <Typography sx={{ marginBottom: '15px' }} variant="body2" color="text.secondary">
                {truncate(product.description, { length: 120 })}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Card>
    </section>
  );
};

// import React from 'react';
// import Image from 'next/image';
// import truncate from 'lodash/truncate';
// import { Swiper as SwiperSlider, SwiperSlide } from 'swiper/react';
// import { Card, Grid, Typography } from '@material-ui/core';

// import { ProductService } from '@app/services/product.service';

// interface Props {
//   product: ProductService.Single;
// }

// export const BannerPiecesLeftObject: React.FC<Props> = ({ product }) => {
//   return (
//     <section>
//       <Card sx={{ marginBottom: '20px' }}>
//         <Grid container>
//           <Grid item xs={12} sm={5}>
//             <SwiperSlider>
//               {product.images.map(({ id, src, alt }) => (
//                 <SwiperSlide key={id}>
//                   <Image src={src} alt={alt} width="768" height="1024" layout="responsive" />
//                 </SwiperSlide>
//               ))}
//             </SwiperSlider>
//           </Grid>
//           <Grid item xs={12} sm={7}>
//             <div css={{ padding: '20px' }}>
//               <Typography sx={{ marginBottom: '20px' }} gutterBottom variant="h5" component="h1">
//                 {product.title}
//               </Typography>
//               <Typography sx={{ marginBottom: '20px' }} gutterBottom variant="h6" component="h2">
//                 Pieces left: {product.totalInventory}
//               </Typography>

//               <Typography sx={{ marginBottom: '15px' }} variant="body2" color="text.secondary">
//                 {truncate(product.description, { length: 120 })}
//               </Typography>
//             </div>
//           </Grid>
//         </Grid>
//       </Card>
//     </section>
//   );
// };
