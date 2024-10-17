import React from 'react';
import { Helmet } from 'react-helmet';

const PageTitle = ({ title, isOnportal = true }) => {
  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`${title} - ${isOnportal ? 'Pacific Sky Beach Portal' : 'Pacific Sky Beach'}`}</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
    </React.Fragment>
  );
};

export default PageTitle;
