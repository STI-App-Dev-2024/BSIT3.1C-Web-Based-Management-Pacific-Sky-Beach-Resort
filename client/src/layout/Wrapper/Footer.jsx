import React from 'react';
import Icon from '@mdi/react';
import { useTheme } from '@mui/material/styles';
import { Grid, Box, Typography, Stack } from '@mui/material';
import { CopyrightOutlined } from '@ant-design/icons';

import address from 'layout/footer-items/address';
import quickLinks from 'layout/footer-items/quickLinks';

const Footer = () => {
  const theme = useTheme();
  const date = new Date();
  const currentYear = date.getFullYear();
  return (
    <React.Fragment>
      <Grid
        container
        sx={{
          backgroundColor: theme.palette.primary.main,
          p: 3
        }}
      >
        <Grid item md={4} sm={12}>
          <Typography  mb={2}variant="h4" color="#ffffff">
            Our Office
          </Typography>
          {address.map((ad) => (
            <Stack key={ad.name} direction="row" alignItems="center" spacing={2} mb={1.5} >
              <Icon path={ad.icon} color={ad.color} size={0.8} />
              <Typography variant="subtitle2" color="#ffffff">
                {ad.name}
              </Typography>
            </Stack>
          ))}
        </Grid>

        <Grid item md={4} sm={12}>
          <Typography  mb={2}variant="h4" color="#ffffff">
           Quick Links
          </Typography>
          {quickLinks.map((ql) => (
            <Stack key={ql.name} direction="row" alignItems="center" spacing={2} mb={1.5} >
              <Icon path={ql.icon} color={ql.color} size={0.8} />
              <Typography variant="subtitle2" color="#ffffff">
                {ql.name}
              </Typography>
            </Stack>
          ))}
        </Grid>

        <Grid item md={4} sm={12}>
          <Typography  mb={2}variant="h4" color="#ffffff">
           Come join us!
          </Typography>
          <Typography  mb={1}variant="subtitle2" color="#ffffff">
           Experience unrivated support, cutting-edge technology, and game-changing tools to thrive
           in the industry. Join us today and elevate your real estate career reach new heights
          </Typography>
        </Grid>

        
      </Grid>
      <Box
        sx={{
          backgroundColor: theme.palette.secondary.dark,
          pl: 5,
          paddingBlock: 1
        }}
      >
        <Typography variant="subtitle2" color="#ffffff">
          <CopyrightOutlined /> Pacific Sky Beach, All Rights Reserved {currentYear}
        </Typography>
      </Box>
    </React.Fragment>
  );
};

export default Footer;
