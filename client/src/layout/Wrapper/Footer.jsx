import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Container, Divider, Stack, Typography } from '@mui/material';


const Footer = () => {
  const theme = useTheme();
  const date = new Date();
  const currentYear = date.getFullYear();
  return (
    <React.Fragment>
      <Box
        sx={{
          backgroundColor: theme.palette.primary.dark,
          padding: 2,
          mt: 2
        }}
      >
        <Container>
          <Stack spacing={5} direction="row" justifyContent="center">
            <Box>
              <Typography marginBlock="1em .5em" variant="h5" color="white">
                Company Info
              </Typography>
              <Typography variant="body2" color="white">
                About Us
                <br />
                Our Mission
                <br />
                Our Vission
              </Typography>
            </Box>

            <Box>
              <Typography marginBlock="1em .5em" variant="h5" color="white">
                Solutions
              </Typography>
              <Typography variant="body2" color="white">
                For Families
                <br />
                For Individuals
                <br />
                For Agents
              </Typography>
            </Box>

            <Box>
              <Typography marginBlock="1em .5em" variant="h5" color="white">
                Features
              </Typography>
              <Typography variant="body2" color="white">
                CFS Edge
                <br />
                CFS Advantage
              </Typography>
            </Box>

            <Box>
              <Typography marginBlock="1em .5em" variant="h5" color="white">
                Resources
              </Typography>
              <Typography variant="body2" color="white">
                Free Agent Training
                <br />
                Blog
              </Typography>
            </Box>

            <Box>
              <Typography marginBlock="1em .5em" variant="h5" color="white">
                Get In Touch
              </Typography>
              <Typography variant="body2" color="white">
                +1(702) 900-5666
                <br />
                Las Vegas, NV
              </Typography>
            </Box>
          </Stack>
        </Container>
        <Divider
          sx={{
            mx: 30,
            marginTop: 10
          }}
        />
        <Typography marginInline="5em" paddingBlock="3em 1em" variant="body1" color="white">
          Copyright  {currentYear} | Pacific Sky Beach
        </Typography>
      </Box>

      <Box
        sx={{
          backgroundColor: theme.palette.error.main,
          padding: 2
        }}
      ></Box>
    </React.Fragment>
  );
};

export default Footer;
