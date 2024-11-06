import React, { useEffect, useMemo, useState } from 'react'
import { getPositionLabel } from 'utils/getPositionLabel'
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons'
import { Box, Button, Stack, Tooltip, Typography } from '@mui/material'
import { useGetAllUsers } from 'api/users'
import { useSnackbar } from 'contexts/SnackbarContext'
import { POSITIONS } from 'constants/constants'
import { useLocation, useNavigate } from 'react-router'
import agent from 'api'
import Table from 'components/Table'
import useAuth from 'hooks/useAuth'
import IconButton from 'components/@extended/IconButton'
import ConfirmationDialog from 'components/ConfirmationDialog'
import StaffsForm from './StaffsForm'
import StaffsDetails from './StaffsDetails'
import Avatar from 'components/@extended/Avatar'

const StaffsTable = () => {
  const { users, isLoading, mutate } = useGetAllUsers()
  const { user } = useAuth()
  const { openSnackbar } = useSnackbar();
  const location = useLocation()

  const [loading, setLoading] = useState(false)
  const [deleteConfigs, setDeleteConfigs] = useState({
    open: false,
    userId: ''
  })
  const [isOpenDialog, setIsOpenDialog] = useState(false)
  const [viewConfigs, setViewConfigs] = useState({
    open: false,
    userId: ''
  })

  const searchParams = new URLSearchParams(location.search)
  const isEditMode = searchParams.get('action')?.toLocaleLowerCase() === 'edit'
  const userId = searchParams.get('userId')

  useEffect(() => {
    if (isEditMode) {
      setIsOpenDialog(true)
    }
  }, [isEditMode])

  const handleOpen = (userId) => {
    setDeleteConfigs({ open, userId })
  }

  const handleDelete = async () => {
    setLoading(true)
    try {
      await agent.Users.deleteUser(deleteConfigs.userId)
      openSnackbar({
        message: (
          <Typography>
            Deleted successfully.
          </Typography>
        ),
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        alert: { color: 'success' },
        duration: 3000
      });
    } catch (error) {
      openSnackbar({
        message: (
          <Typography>
            {error}
          </Typography>
        ),
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        alert: { color: 'error' },
        duration: 3000
      });
    } finally {
      setLoading(false)
      setDeleteConfigs({ open: false, userId: '' })
      await mutate()
    }
  }

  const navigate = useNavigate()

  const handleClickEdit = (userId) => {
    navigate(`/portal/staffs?action=edit&userId=${userId}`)
  }

  const columns = useMemo(() => [
    {
      id: 'avatar',
      align: 'left',
      disablePadding: true,
      label: 'Avatar',
      renderCell: (row) => (
        <Box>
          <Avatar
            size='lg'
            src={row?.avatar}
          />
        </Box>
      )
    },
    {
      id: 'fullName',
      align: 'left',
      disablePadding: true,
      label: 'Full Name',
      renderCell: (row) => (
        <Typography>
          {row.firstName}  {row.lastName}
        </Typography>
      )
    },
    {
      id: 'emailAddress',
      align: 'left',
      disablePadding: true,
      label: 'Email Address',
    },
    {
      id: 'position',
      align: 'left',
      disablePadding: true,
      label: 'Position',
      renderCell: (row) => (
        <Typography>
          {getPositionLabel(row.position)}
        </Typography>
      )
    },
    {
      id: 'mobileNumber',
      align: 'left',
      disablePadding: false,
      label: 'Mobile Number',
    },
    {
      id: 'createdAt',
      align: 'left',
      disablePadding: false,
      label: 'Date Created',
      renderCell: (row) => new Date(row.createdAt).toLocaleString(),
    },
    {
      id: 'actions',
      align: 'center',
      disablePadding: false,
      label: 'Actions',
      renderCell: (row) => {
        const isSameRole = user?.position === row.position

        const hasNoAccess = isSameRole || row.position === POSITIONS.POSITIONS_MASTER_ADMIN
        return (
          <Stack direction='row' spacing={2} alignItems='center'>
            <Tooltip title='View'>
              <IconButton color='primary' onClick={() => {
                setViewConfigs({
                  open: true,
                  userId: row.userId
                })
              }}>
                <EyeOutlined />
              </IconButton>
            </Tooltip>
            <Tooltip title={hasNoAccess ? 'You have no access to edit the position of this user' : 'Edit'}>
              <span>
                <IconButton onClick={() => handleClickEdit(row.userId)} color='info' disabled={hasNoAccess} >
                  <EditOutlined />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title={hasNoAccess ? 'You have no access to delete this user' : 'Delete'}>
              <span>
                <IconButton onClick={() => handleOpen(row.userId)} color='error' disabled={hasNoAccess}>
                  <DeleteOutlined />
                </IconButton>
              </span>
            </Tooltip>
          </Stack>
        )
      }
    },
  ], [user])

  return (
    <React.Fragment>
      <Table
        columns={columns}
        rows={users || []}
        isLoading={isLoading || loading}
        settings={{
          order: 'asc',
          orderBy: 'createdAt',
          otherActionButton: (
            <Button
              variant='contained'
              startIcon={<PlusOutlined />}
              onClick={() => setIsOpenDialog(true)}
              sx={{ width: '150px' }}
            >
              Add User
            </Button>
          )
        }}
      />
      <StaffsForm
        open={isOpenDialog}
        handleClose={() => {
          setIsOpenDialog(false)
          navigate('/portal/staffs')
        }}
        mutate={mutate}
        userId={userId}
        isEditMode={isEditMode}
      />
      <StaffsDetails
        open={viewConfigs.open}
        handleClose={() => setViewConfigs({ ...viewConfigs, open: false })}
        userId={viewConfigs.userId}
        mutate={mutate}
      />
      <ConfirmationDialog
        title='Delete User'
        description='Are you sure you want to delete this user?'
        handleConfirm={handleDelete}
        open={deleteConfigs.open}
        handleClose={() => setDeleteConfigs({ ...deleteConfigs, open: false })}
      />
    </React.Fragment >
  )
}

export default StaffsTable