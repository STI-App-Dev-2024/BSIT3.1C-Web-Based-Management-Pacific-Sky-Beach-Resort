import React from 'react';
import Navbar from 'layout/Wrapper/Navbar';
import Footer from './Footer';
import { Box } from '@mui/material';

const PageWrapper = ({ children }) => {
  return (
    <React.Fragment>
      <Navbar />
      <Box sx={{ minHeight: '100vh' }}>{children}</Box>
      <Footer />
    </React.Fragment>
  );
};

export default PageWrapper;
