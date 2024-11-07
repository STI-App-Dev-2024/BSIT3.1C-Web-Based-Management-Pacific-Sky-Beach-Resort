import { DeleteOutlined, EditOutlined, EyeOutlined, UserOutlined } from '@ant-design/icons'
import { mdiBed, mdiShower } from '@mdi/js'
import Icon from '@mdi/react'
import { Box, Card, CardContent, Stack, Typography } from '@mui/material'
import IconButton from 'components/@extended/IconButton'
import React from 'react'
import Carousel from 'react-material-ui-carousel'

const fakeImages = [
  `https://th.bing.com/th/id/OIP.NiM24KZ1d_g_f2GJl_jAyAHaFj?rs=1&pid=ImgDetMain`,
  ` https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
  `https://images.pexels.com/photos/4138152/pexels-photo-4138152.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
]

const OfferCard = ({
  name,
  pictures,
  paxCount,
  bathCount,
  bedCount,
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
            boxShadow: 10
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
          height={320}
          autoPlay={false}
          animation="slide"
          navButtonsAlwaysVisible={false}
          navButtonsProps={{
            // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
            style: {
              backgroundColor: 'transparent',
              borderRadius: 0
            }
          }}
          navButtonsWrapperProps={{
            // Move the buttons to the bottom. Unsetting top here to override default style.
            className: 'navButtons',
            style: {
              bottom: '0',
              top: 'unset'
            }
          }}
          indicatorIconButtonProps={{
            style: {
              padding: '0 0 3px 0',
              color: 'rgba(255, 255, 255, 0.5)',
              width: '15px',
              height: '8px'
            }
          }}
          activeIndicatorIconButtonProps={{
            style: {
              color: `white`
            }
          }}
          indicatorContainerProps={{
            style: {
              zIndex: 999,
              padding: '0 5px',
              marginTop: '0',
              height: '20px',
              margin: '0 auto',
              textAlign: 'center',
              width: 'fit-content',
              marginBottom: '5px',
              position: 'relative',
              borderRadius: '16px',
              backgroundColor: 'rgba(0,0,0,0.3)'
            }
          }}
          sx={{
            '&:hover .navButtons button': {
              backgroundColor: 'rgba(0,0,0,0.5) !important'
            }
          }}
        >
          {fakeImages.map((item) => (
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
      <Box marginBlock={1.5} >
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
            <Stack direction='row' spacing={1} alignItems='center'>
              <Stack direction='row' spacing={1} alignItems='center'>
                <Icon style={{ color: `#333` }} path={mdiShower} size={.7} />
                <Typography variant='subtitle1' color='secondary' >
                  {bathCount}
                </Typography>
              </Stack>
              <Stack direction='row' spacing={1} alignItems='center'>
                <Icon style={{ color: `#333` }} path={mdiBed} size={.7} />
                <Typography variant='subtitle1' color='secondary' >
                  {bedCount}
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Box>
  )
}

export default OfferCard