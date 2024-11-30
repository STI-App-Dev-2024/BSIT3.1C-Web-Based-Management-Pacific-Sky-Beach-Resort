import React from 'react'
import { Box, Stack, Typography } from '@mui/material'
import Carousel from 'components/Carousel'

import pic1 from 'src/assets/images/upload/pic1.jpg'
import pic2 from 'src/assets/images/upload/pic2.jpg'
import pic3 from 'src/assets/images/upload/pic3.jpg'
import pic4 from 'src/assets/images/upload/pic4.jpg'

const Home = () => {
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
          top: '40%',
          left: '10%',
          zIndex: 1,
          maxWidth: '300px',
        }}
      >
        <Typography mb={2} variant="h2" color="#fff">
          Pacific Sky Beach
        </Typography>
        <Typography variant="body1" color="#fff">
          “Pacific” means “family” in the ancient Sanskrit language, a return to meaningful family traditions is at the core of everything at Pacific Sky Beach.
        </Typography>
      </Box>

    </Stack>
  )
}

export default Home
