import { DeleteOutlined, EditOutlined, EyeOutlined, UserOutlined } from '@ant-design/icons'
import { mdiBed, mdiShower } from '@mdi/js'
import Icon from '@mdi/react'
import { Box, Card, CardContent, Stack, Typography } from '@mui/material'
import IconButton from 'components/@extended/IconButton'
import React from 'react'
import Carousel from 'react-material-ui-carousel'



const OfferCard = ({
  name,
  pictures = [],
  paxCount,
  price
}) => {

  return (
    <Box
      sx={{
        mb: 2,
      }}
    >
      <Card
        sx={{
          borderRadius: '14px',
          position: 'relative'
        }}
      >
        <Stack
          direction='row'
          spacing={1}
          sx={{
            position: 'absolute',
            zIndex: 999,
            right: 10,
            top: 10,
            boxShadow: 5
          }}
        >
          <IconButton
            style={{
              backgroundColor: `#fff`,
            }}
            color='primary'
          >
            <EyeOutlined />
          </IconButton>
          <IconButton
            style={{
              backgroundColor: `#fff`,
            }}
            color='info'
          >
            <EditOutlined />
          </IconButton>
          <IconButton
            style={{
              backgroundColor: `#fff`,
            }}
            color='error'
          >
            <DeleteOutlined />
          </IconButton>
        </Stack>
        <Carousel
          indicators={false}
          height={300}
          autoPlay={false}
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
          {pictures.map((item) => (
            <div
              style={{ height: `100%` }}
            >
              <img
                src={item}
                alt=""
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: `14px`
                }}
              />
            </div>
          ))}
        </Carousel>
      </Card>
      <Box marginBlock={1.5} sx={{ padding: " 15px" }}>
        <Stack direction='row' justifyContent='space-between'>
          <Box>
            <Typography variant='subtitle1'>
              {name}
            </Typography>
            <Typography variant='subtitle1' color='secondary' >
              ₱ {price} night
            </Typography>
          </Box>
          <Box>
            <Stack direction='row' spacing={1} alignItems='center'>
              <UserOutlined />
              <Typography variant='subtitle1' color='secondary' >
                {paxCount} pax
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Box >
  )
}

export default OfferCard