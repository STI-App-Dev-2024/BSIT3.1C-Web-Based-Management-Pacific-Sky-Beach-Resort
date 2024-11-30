import React from 'react';
import Navbar from 'layout/Wrapper/Navbar';
import Footer from './Footer';
import { Box, Stack } from '@mui/material';
import ScrollTop from 'components/ScrollTop';

const PageWrapper = ({ children, isHomePage }) => {
  return (
    <React.Fragment>
      {!isHomePage && (
        <Stack>
          <ScrollTop />
          <Navbar />
          <Box sx={{ minHeight: '100vh' }}>{children}</Box>
          <Footer />
        </Stack>
      )}
      {isHomePage && (
        <Stack p={0} m={0}>
          <Navbar isHomepage={true} />
          <Box sx={{ minHeight: '100vh' }}>{children}</Box>
          <Footer isHomePage={true} />
        </Stack>
      )}
    </React.Fragment>

  );
};

export default PageWrapper;
