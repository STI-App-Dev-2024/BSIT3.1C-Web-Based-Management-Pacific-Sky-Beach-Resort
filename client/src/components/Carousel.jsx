import React from 'react'
import { CardMedia } from '@mui/material'
import MUICarousel from 'react-material-ui-carousel'

const Carousel = ({ items = [] }) => {
  return (

    <MUICarousel
      indicators={false}
      height={617}
      autoPlay={true}
      animation="fade"
      navButtonsAlwaysVisible={false}
      navButtonsProps={{
        style: {
          borderRadius: 50
        }
      }}
      navButtonsWrapperProps={{
        className: 'navButtons',
        style: {
          bottom: '0',
          top: 'unset'
        }
      }}
      sx={{
        '&:hover .navButtons button': {
          backgroundColor: '#fff !important',
          color: '#000'
        }
      }}
    >
      {items.map((image, index) => (
        <div
          style={{ height: `100%` }}
        >
          <CardMedia
            key={index}
            component="img"
            height="100%"
            width="100%"
            image={image}
            alt={`Image ${index + 1}`}
          />
        </div>
      ))}
    </MUICarousel>

  )
}

export default Carousel