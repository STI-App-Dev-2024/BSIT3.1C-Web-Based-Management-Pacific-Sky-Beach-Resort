import React from 'react';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import PageTitle from 'components/PageTitle';
import TitleTag from 'components/TitleTag';
import Form from 'sections/contact-us/Form';

const ContactUs = () => {
  const theme = useTheme();

  return (
    <React.Fragment>
      <PageTitle title="Contact-Us" isOnportal={false} />
      <TitleTag subtitle="If You Need Help" title="Contact Us" />

      <Box>
        <Form />
      </Box>
    </React.Fragment>
  );
};

export default ContactUs;
