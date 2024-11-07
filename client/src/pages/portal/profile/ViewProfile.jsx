import React from 'react'
import MainCard from 'components/MainCard'
import LabeledValue from 'components/LabeledValue'
import useAuth from 'hooks/useAuth'
import { IdcardOutlined, UserOutlined, MailOutlined, PhoneOutlined, CopyOutlined } from '@ant-design/icons'
import { Box, Divider, Grid, Stack, Typography } from '@mui/material'

const ViewProfile = () => {
  const { user } = useAuth()
  const {
    userId,
    firstName,
    lastName,
    emailAddress,
    mobileNumber,
    bio
  } = user || {}

  return (
    <React.Fragment>
      <Grid container justifyContent='center' spacing={2} >
        <Grid item xs={12} sm={12} md={3} >
          <MainCard >
            <Stack alignItems='center'>
              <Box mb={3}>
                <img
                  style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '1px',
                    borderStyle: 'dotted',
                    borderColor: '#0070ff'
                  }}
                  src="https://scontent.fmnl19-1.fna.fbcdn.net/v/t39.30808-6/450548394_3755161084802321_2675326203838675255_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFVumhKVn0bQkDiOkwE-wcOUHuPbiwLvMRQe49uLAu8xJauGGXxjuFFU2etXveXtHv9FjXpPaKd92c-9NiIUjuv&_nc_ohc=fBIBWnxpYQ8Q7kNvgGdyM3t&_nc_zt=23&_nc_ht=scontent.fmnl19-1.fna&_nc_gid=AqUXXe-w8TagNRGHCEgM7Qc&oh=00_AYAXvrB4GbWCGaNcUuJlVPn9WhVA8zor950Yw2AToQAlGA&oe=672FFDFE"
                  alt="Profile"
                />
              </Box>
              <Typography mb={1} variant='h5' color='#000000'>Master Admin</Typography>
              <Typography variant='body1' color='#808080'>Agent</Typography>
            </Stack>
          </MainCard>
        </Grid>
        <Grid item xs={12} sm={12} md={9}   >
          <MainCard style={{ minHeight: '70dvh' }}>
            <Typography variant='h5' color='#000000'>Personal Information</Typography>
            <Divider sx={{ marginBlock: 2 }} />
            <Box>
              <LabeledValue
                title='User ID'
                subTitle={userId}
                icon={<IdcardOutlined />}
              />
            </Box>
            <Grid container my={3}>
              <Grid item md={12}>
                <LabeledValue
                  title='Full Name'
                  subTitle={`${firstName} ${lastName}`}
                  icon={<UserOutlined />}
                />
              </Grid>
            </Grid>
            <Grid container my={3}>
              <Grid item md={6}>
                <LabeledValue
                  title='Email Address'
                  subTitle={emailAddress}
                  icon={<MailOutlined />}
                />
              </Grid>
              <Grid item md={6}>
                <LabeledValue
                  title='Mobile Number'
                  subTitle={mobileNumber}
                  icon={<PhoneOutlined />}
                />
              </Grid>
            </Grid>
            <Box>
              <LabeledValue
                title='Biography'
                subTitle={bio}
                icon={<CopyOutlined />}
              />
            </Box>
          </MainCard>
        </Grid>
      </Grid>
    </React.Fragment >
  )
}

export default ViewProfile