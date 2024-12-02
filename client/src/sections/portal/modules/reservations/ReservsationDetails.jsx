import { CalendarOutlined, CloseOutlined, EditOutlined, EnvironmentOutlined, MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons'
import { Box, Button, Chip, Dialog, Grid, IconButton, Stack, Typography } from '@mui/material'
import agent from 'api'
import { useGetSingleBookingById } from 'api/booking/book-rooms'
import ConfirmationDialog from 'components/ConfirmationDialog'
import ConvertDate from 'components/ConvertDate'
import LabeledValue from 'components/LabeledValue'
import Logo from 'components/logo/LogoMain'
import MainCard from 'components/MainCard'
import { useSnackbar } from 'contexts/SnackbarContext'
import React, { useState } from 'react'

const ReservsationDetails = ({ open, handleClose, bookingId }) => {

  const { openSnackbar } = useSnackbar()

  const { bookData, mutate } = useGetSingleBookingById(bookingId)
  const [loading, setLoading] = useState(false)

  const [__open, setOpen] = useState(false)

  const {
    bookedRooms,
    customerInformation
  } = bookData || {}

  const {
    startDate,
    endDate,
    reservationProof,
    isReserved
  } = bookedRooms || {}

  const {
    customerFirstName,
    customerLastName,
    customerEmail,
    customerPhone,
    customerAddress
  } = customerInformation || {}

  const handleConfirm = async () => {
    setLoading(true)
    try {
      await agent.BookRooms.updateReservationStatus(bookingId, 1)
      openSnackbar({
        message: `${bookingId.slice(0, 6)}... status successfully updated.`,
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        alert: { color: 'success' },
        duration: 3000,
      });
      await mutate()
    } catch (error) {
      openSnackbar({
        message: error.message || 'An error occurred.',
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        alert: { color: 'error' },
        duration: 3000,
      });
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  return (
    <Dialog
      fullWidth
      maxWidth='md'
      open={open}
      onClose={handleClose}
    >
      <Stack direction='row' alignItems='center' justifyContent='flex-end' margin={2}>
        <IconButton color='secondary' onClick={handleClose}>
          <CloseOutlined />
        </IconButton>
      </Stack>
      <Stack direction='row' alignItems='center' justifyContent='flex-end' margin={2}>
        <Button onClick={() => setOpen(true)} color='info' variant='contained' startIcon={<EditOutlined />} size='small' >
          Edit
        </Button>
      </Stack>
      <Box padding={2}>
        <MainCard>
          <Grid container spacing={2}>
            <Grid item sm={12} md={6}>
              <MainCard>
                <Box
                  component='img'
                  src={reservationProof}
                  sx={{
                    width: '100%',
                    height: 390,
                    objectFit: 'cover',
                    borderRadius: 4.5
                  }}
                />
                <Typography variant='subtitle1' textAlign='center' marginBlock={2}>
                  Proof of reservation
                </Typography>
              </MainCard>
            </Grid>
            <Grid item sm={12} md={6}>
              <Stack direction='row' justifyContent='center' alignItems='center'>
                <Logo />
              </Stack>
              <Box marginBottom={2}>
                <LabeledValue
                  title='Full Name'
                  subTitle={`${customerFirstName} ${customerLastName}`}
                  icon={<UserOutlined />}
                />
              </Box>
              <Box marginBottom={2}>
                <LabeledValue
                  title='Email Address'
                  subTitle={customerEmail}
                  icon={<MailOutlined />}
                />
              </Box>
              <Box marginBottom={2}>
                <LabeledValue
                  title='Phone Number'
                  subTitle={customerPhone}
                  icon={<PhoneOutlined />}
                />
              </Box>
              <Box marginBottom={2}>
                <LabeledValue
                  title='Address'
                  subTitle={customerAddress}
                  icon={<EnvironmentOutlined />}
                />
              </Box>
              <Box marginBottom={2}>
                <LabeledValue
                  title='Booked Dates'
                  subTitle={
                    <Typography>
                      <ConvertDate dateString={startDate} /> - <ConvertDate dateString={endDate} />
                    </Typography>
                  }
                  icon={<CalendarOutlined />}
                />
              </Box>
              <Box marginBottom={2}>
                <LabeledValue
                  title='Status'
                  subTitle={
                    <>
                      <Chip
                        label={isReserved ? 'Approved' : 'Pending'}
                        color={isReserved ? 'success' : 'primary'}
                      />
                    </>
                  }
                  icon={<CalendarOutlined />}
                />
              </Box>
            </Grid>
          </Grid>
        </MainCard>
      </Box>
      <ConfirmationDialog
        open={__open}
        title='Update reservation status to booked?'
        description={`By confirming, you'll update the ${bookingId} status to booked.`}
        handleClose={() => setOpen(false)}
        handleConfirm={handleConfirm}
      />
    </Dialog>
  )
}

export default ReservsationDetails