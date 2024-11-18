import React, { useState } from 'react'
import MainCard from './MainCard'
import { Box, Button, Stack, Typography } from '@mui/material'
import { getPositionLabel } from 'utils/getPositionLabel'
import Details from 'sections/portal/modules/staffs/StaffsDetails'

const UserCard = ({ user, title }) => {
  const {
    firstName,
    lastName,
    emailAddress,
    position,
    avatar
  } = user || {}

  const [open, setOpen] = useState(false)

  return (
    <React.Fragment>
      <MainCard title={title} >
        <Stack alignItems='center' justifyContent='center'>
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
          <Typography mb={1} variant='subtitle1' >{emailAddress}</Typography>
          <Typography variant='subtitle2' color='secondary'>{getPositionLabel(position)}</Typography>
          <Button onClick={() => setOpen(true)} variant='contained' size='small' sx={{ my: 2 }} >View</Button>
        </Stack>
      </MainCard>
      <Details
        open={open}
        handleClose={() => setOpen(false)}
        userId={user?.userId}
      />
    </React.Fragment>
  )
}

export default UserCard