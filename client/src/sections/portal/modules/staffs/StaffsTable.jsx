import React, { useMemo, useState } from 'react'
import { getPositionLabel } from 'utils/getPositionLabel'
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Stack, Tooltip, Typography } from '@mui/material'
import { useGetAllUsers } from 'api/users'
import { useSnackbar } from 'contexts/SnackbarContext'
import agent from 'api'
import Table from 'components/Table'
import useAuth from 'hooks/useAuth'
import IconButton from 'components/@extended/IconButton'
import ConfirmationDialog from 'components/ConfirmationDialog'
import Form from './Form'
import { POSITIONS } from 'constants/constants'

const StaffsTable = () => {
  const { users, isLoading, mutate } = useGetAllUsers()
  const { user } = useAuth()
  const { openSnackbar } = useSnackbar();

  const [loading, setLoading] = useState(false)
  const [deleteConfigs, setDeleteConfigs] = useState({
    open: false,
    userId: ''
  })
  const [isOpenAddDialog, setIsOpenAddDialog] = useState(false)

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

  const columns = useMemo(() => [
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
              <IconButton color='primary' >
                <EyeOutlined />
              </IconButton>
            </Tooltip>
            <Tooltip title={hasNoAccess ? 'You have no access to edit the position of this user' : 'Edit'}>
              <span>
                <IconButton color='info' disabled={hasNoAccess} >
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
              onClick={() => setIsOpenAddDialog(true)}
              sx={{ width: '150px' }}
            >
              Add User
            </Button>
          )
        }}
      />
      <Form
        open={isOpenAddDialog}
        handleClose={() => setIsOpenAddDialog(false)}
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