import React from 'react';
import Navbar from 'layout/Wrapper/Navbar';
import Footer from './Footer';
import { Box, Stack } from '@mui/material';
import ScrollTop from 'components/ScrollTop';

const PageWrapper = ({ children }) => {
  return (
    <React.Fragment>

      <Stack>
        <ScrollTop />
        <Navbar />
        <Box sx={{ minHeight: '100vh' }}>{children}</Box>
        <Footer />
      </Stack>

    </React.Fragment>

  );
};

export default PageWrapper;
