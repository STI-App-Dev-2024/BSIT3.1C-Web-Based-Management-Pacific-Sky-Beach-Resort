import React, { useState } from 'react'
import { CloseOutlined, DeleteOutlined, MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons'
import { Box, Dialog, Grid, Stack } from '@mui/material'
import { useGetSingleUser } from 'api/users'
import { CardAccountDetailsOutline } from 'mdi-material-ui'
import { getPositionLabel } from 'utils/getPositionLabel'
import { useSnackbar } from 'contexts/SnackbarContext'
import LabeledValue from 'components/LabeledValue'
import Logo from 'components/logo/LogoMain'
import MainCard from 'components/MainCard'
import IconButton from 'components/@extended/IconButton'
import ConfirmationDialog from 'components/ConfirmationDialog'
import agent from 'api'
import AnimateButton from 'components/@extended/AnimateButton'
import LoadingButton from 'components/@extended/LoadingButton'
import useAuth from 'hooks/useAuth'
import { POSITIONS } from 'constants/constants'

const Details = ({ open, handleClose, userId, mutate }) => {
  const { user: loggedInUser } = useAuth()
  const { user } = useGetSingleUser(userId)
  const { openSnackbar } = useSnackbar()

  const {
    avatar,
    firstName,
    lastName,
    emailAddress,
    mobileNumber,
    position
  } = user || {}

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    setLoading(true)
    try {
      await agent.Users.deleteUser(userId)
      openSnackbar({
        message: `Deleted successfully.`,
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        alert: { color: 'success' },
        duration: 3000
      });
    } catch (error) {
      openSnackbar({
        message: error,
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        alert: { color: 'error' },
        duration: 3000
      });
    } finally {
      setLoading(false)
      setOpenDeleteDialog(false)
      handleClose()
      await mutate()
    }
  }

  const isSameRole = loggedInUser?.position === user?.position
  const hasNoAccess = isSameRole || user?.position === POSITIONS.POSITIONS_MASTER_ADMIN

  return (
    <React.Fragment>
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
        <Box padding={2}>
          <MainCard>
            <Grid container spacing={2}>
              <Grid item sm={12} md={6}>
                <MainCard>
                  <Box
                    component='img'
                    src={avatar}
                    sx={{
                      width: '100%',
                      height: 390,
                      objectFit: 'cover',
                      borderRadius: 4.5
                    }}
                  />
                </MainCard>
              </Grid>
              <Grid item sm={12} md={6}>
                <Stack direction='row' justifyContent='center' alignItems='center'>
                  <Logo />
                </Stack>
                <Box marginBottom={4}>
                  <LabeledValue
                    title='Full Name'
                    subTitle={firstName?.concat(' ', lastName)}
                    icon={<UserOutlined />}
                  />
                </Box>
                <Box marginBottom={4}>
                  <LabeledValue
                    title='Email Address'
                    subTitle={emailAddress}
                    icon={<MailOutlined />}
                  />
                </Box>
                <Box marginBottom={4}>
                  <LabeledValue
                    title='Phone Number'
                    subTitle={mobileNumber}
                    icon={<PhoneOutlined />}
                  />
                </Box>
                <Box marginBottom={4}>
                  <LabeledValue
                    title='Position'
                    subTitle={getPositionLabel(position)}
                    icon={<CardAccountDetailsOutline />}
                  />
                </Box>
              </Grid>
            </Grid>
          </MainCard>
          <Stack direction='row' alignItems='center' justifyContent='flex-end' margin={2} spacing={2}>
            {!hasNoAccess && (
              <AnimateButton>
                <LoadingButton
                  loading={loading}
                  disableElevation
                  disabled={loading}
                  loadingPosition="start"
                  fullWidth
                  onClick={() => setOpenDeleteDialog(true)}
                  variant="contained"
                  color="error"
                  style={{ width: '120px' }}
                  startIcon={<DeleteOutlined />}
                >
                  Delete
                </LoadingButton>
              </AnimateButton>
            )}
          </Stack>
        </Box>
      </Dialog>
      <ConfirmationDialog
        title='Delete User'
        description='Are you sure you want to delete this user?'
        handleConfirm={handleDelete}
        open={openDeleteDialog}
        handleClose={() => setOpenDeleteDialog(false)}
      />
    </React.Fragment>
  )
}

export default Details