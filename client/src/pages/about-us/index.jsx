import React from 'react';
import { Container } from '@mui/material';
import TitleTag from 'components/TitleTag';
import TwoColumn from 'components/TwoColumn';

const index = () => {
  return (
    <React.Fragment >
      <TitleTag subtitle="LEARN MORE ABOUT PACIFIC SKY" title="About Us" />
      <Container>
        <TwoColumn
          image="https://th.bing.com/th/id/OIP.mGLrANuGJsE3elRgnUhb3QHaFj?rs=1&pid=ImgDetMain"
          title="OUR VISION"
          subtitle="A force of good that brings economic awareness"
          caption="& financial solutions to create wealth for families."
          description=" To be a top financial institution in the insurance that brings economic awareness and financial solutions to create wealth for
              individual and families."
        />
        <TwoColumn
          isInverted={true}
          image="https://th.bing.com/th/id/OIP.mGLrANuGJsE3elRgnUhb3QHaFj?rs=1&pid=ImgDetMain"
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
