import TitleTag from 'components/TitleTag';
import TwoColumn from 'components/TwoColumn';
import React from 'react';

const index = () => {
  return (
    <React.Fragment>
      <TitleTag subtitle="LEARN MORE ABOUT PACIFIC SKY" title="About Us" />
      <TwoColumn
        image="https://th.bing.com/th/id/OIP.mGLrANuGJsE3elRgnUhb3QHaFj?rs=1&pid=ImgDetMain"
        title="OUR VISION"
        subtitle={
          <>
            A force of good that brings <br /> economic awareness
          </>
        }
        caption="& financial solutions to create wealth for families."
        description={
        <>
        To be a top financial institution in the insurance that brings <br/>
        economic awareness and financial solutions to create wealth for <br/>
        individual and families.
        </>

        }
      />
      <TwoColumn
        isInverted={true}
        image="https://lajollamom.com/wp-content/uploads/2018/10/pacific-beach-san-diego-hotels-pacific-terrace.jpg"
        title="OUR MISSION"
        subtitle={
          <>
           To help re-enfroce 
          </>
        }
        caption="& boost the value of a family's financial portfolio."
        description={
        <>
        To help individuals and families build a comfortable future byt assigning  <br/>
        them in reinforcing and increasing the value of their portfolio through <br/>
        financial(or economic) awareness, and well developed financial<br/>
        solutions that reduces risks and amplify growth.
        </>

        }
      />
    </React.Fragment>
  );
};

export default index;
