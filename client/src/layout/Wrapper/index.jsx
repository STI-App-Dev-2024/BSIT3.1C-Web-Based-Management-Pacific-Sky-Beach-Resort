import React from 'react';
import Navbar from 'layout/Wrapper/Navbar';
import Footer from './Footer';
import { Box } from '@mui/material';
import ScrollTop from 'components/ScrollTop';

const PageWrapper = ({ children }) => {
  return (
    <React.Fragment>
      <ScrollTop />
      <Navbar />
      <Box sx={{ minHeight: '100vh', my: 2 }}>{children}</Box>
      <Footer />
    </React.Fragment>
  );
};

export default PageWrapper;
