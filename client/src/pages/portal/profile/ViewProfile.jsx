import React from 'react'
import MainCard from 'components/MainCard'
import LabeledValue from 'components/LabeledValue'
import useAuth from 'hooks/useAuth'
import { IdcardOutlined, UserOutlined, MailOutlined, PhoneOutlined, CopyOutlined } from '@ant-design/icons'
import { Box, Divider, Grid, Stack, Typography } from '@mui/material'
import { useGetSingleUser } from 'api/users'
import { getPositionLabel } from 'utils/getPositionLabel'

const ViewProfile = () => {
  const { user: loggedInUser } = useAuth();
  const { user } = useGetSingleUser(loggedInUser?.userId)

  const {
    avatar,
    userId,
    firstName,
    lastName,
    emailAddress,
    mobileNumber,
    bio,
    position
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
                  src={avatar}
                  alt="Profile"
                />
              </Box>
              <Typography mb={1} variant='h5'>{firstName} {lastName}</Typography>
              <Typography variant='body1' color='#808080'>{getPositionLabel(position)}</Typography>
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