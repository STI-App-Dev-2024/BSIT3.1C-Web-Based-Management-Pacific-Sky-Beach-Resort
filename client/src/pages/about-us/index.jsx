import React from 'react';
import { Container } from '@mui/material';
import TitleTag from 'components/TitleTag';
import TwoColumn from 'components/TwoColumn';

import pic6 from '/src/assets/images/upload/pic6.jpeg'
import pic5 from '/src/assets/images/upload/pic5.jpeg'

const index = () => {
  return (
    <React.Fragment >
      <TitleTag subtitle="LEARN MORE ABOUT PACIFIC SKY" title="About Us" />
      <Container>
        <TwoColumn
          image={pic5}
          title="OUR VISION"
          subtitle="A force of good that brings economic awareness"
          caption="& financial solutions to create wealth for families."
          description=" To be a top financial institution in the insurance that brings economic awareness and financial solutions to create wealth for
              individual and families."
        />
        <TwoColumn
          isInverted={true}
          image={pic6}
          title="OUR MISSION"
          subtitle="To help re-enfroce"
          caption="& boost the value of a family's financial portfolio."
          description="To help individuals and families build a comfortable future byt assigning them in reinforcing and increasing the value of
              their portfolio through financial(or economic) awareness, and well developed financial solutions that reduces risks and
              amplify growth."
        />
      </Container>
    </React.Fragment>
  );
};

export default index;
