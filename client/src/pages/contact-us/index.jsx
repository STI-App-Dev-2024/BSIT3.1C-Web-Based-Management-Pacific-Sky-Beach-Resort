import { Box, Container, Divider, Grid, Stack, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react';

import PageTitle from 'components/PageTitle';
import TitleTag from 'components/TitleTag';
import Form from 'sections/contact-us/Form';

const ContactUs = () => {
  const theme = useTheme();

  return (
    <React.Fragment>
      <PageTitle title="Contact-Us" isOnportal={false} />
      <TitleTag subtitle="If You Need Help" title="Contact Us" />
      
        <Box           
          sx={{
            backgroundColor: theme.palette.primary.dark,
            height: '80vh',
            width:'100%',
            position: 'absolute',
            paddingBlock:13,
            paddingInline:10
            
          }}>
      
        <Box sx={{ 
          position:'relative', 
          zIndex:10,
          backgroundColor:'white',
          margin:0,
          padding:0,
          flexDirection:'column',
          flexWrap:'wrap',
          justifyContent:'center',
          alignItems:'flex-start',
          borderRadius:2
    
        }}>
          <Form />
        </Box>
        </Box>
    </React.Fragment>
  );
};

export default ContactUs;
