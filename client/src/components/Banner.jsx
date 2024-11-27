import React from 'react'

import { Divider, Stack, Typography } from '@mui/material'

const Banner = ({ image, title, subtitle, description }) => {
  return (

    <Stack
      sx={{
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover', // Ensures the image covers the box
        backgroundPosition: 'center', // Centers the image
        backgroundRepeat: 'no-repeat', // Prevents the image from repeating
      }}
    >
      <Stack paddingBlock='20%' alignItems='center' alignContent='center'>
        <Stack backgroundColor='rgba(0, 0, 0, 0.7)' paddingBlock={5} alignItems='center' alignContent='center' >
          <Typography textAlign='center' variant="body2" color="#ffff">{title}</Typography>
          <Typography textAlign='center' paddingBottom={2} variant="h4" color="#ffff">{subtitle}</Typography>
          <Divider width='20%' />
          <Typography textAlign='center' pt={5} width='62%' variant="caption" color="#ffff">{description}</Typography>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Banner