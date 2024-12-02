import React from 'react'
import { Box, Stack, Typography, useMediaQuery } from '@mui/material'
import Carousel from 'components/Carousel'

import pic1 from 'src/assets/images/upload/pic1.jpg'
import pic2 from 'src/assets/images/upload/pic2.jpg'
import pic3 from 'src/assets/images/upload/pic3.jpg'
import pic4 from 'src/assets/images/upload/pic4.jpg'

const Home = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  return (
    <Stack
      sx={{
        height: '100vh',
        width: '100%',
        margin: 0,
        padding: 0,
        position: 'relative',

      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          zIndex: -1,
        }}
      >
        <Carousel
          items={[
            pic1, pic2, pic3, pic4
          ]}
        />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          zIndex: 1,
          maxWidth: '350px',
          top: '50%',
          left: isMobile ? '50%' : '20%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: isMobile && 'center'
        }}
      >
        <Box sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          p: 2,
          borderRadius: 2,
        }}>
          <Typography mb={2} variant="h2" color="#fff">
            Pacific Sky Beach
          </Typography>
          <Typography variant="body1" color="#fff">
            “Pacific” means “family” in the ancient Sanskrit language, a return to meaningful family traditions is at the core of everything at Pacific Sky Beach.
          </Typography>
        </Box></Box>
    </Stack >
  )
}

export default Home
