import React, { useMemo } from 'react'
import { getPositionLabel } from 'utils/getPositionLabel'
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Stack, Tooltip, Typography } from '@mui/material'
import Table from 'components/Table'
import IconButton from 'components/@extended/IconButton'
import { useGetAllUsers } from 'api/users'
import useAuth from 'hooks/useAuth'

const StaffsTable = () => {
  const { users, isLoading } = useGetAllUsers()
  const { user } = useAuth()

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
        const isSamePosition = row?.position === user?.position
        return (
          <Stack direction='row' spacing={2} alignItems='center'>
            <Tooltip title='View'>
              <IconButton color='primary' >
                <EyeOutlined />
              </IconButton>
            </Tooltip>
            <Tooltip title={isSamePosition ? 'You have no access to edit the position of this user' : 'Edit'}>
              <span>
                <IconButton color='info' disabled={isSamePosition} >
                  <EditOutlined />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title={isSamePosition ? 'You have no access to delete this user' : 'Delete'}>
              <span>
                <IconButton color='error' disabled={isSamePosition}>
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
        isLoading={isLoading}
        settings={{
          otherActionButton: (
            <Button
              variant='contained'
              startIcon={<PlusOutlined />}
              sx={{ width: '150px' }}
            >
              Add User
            </Button>
          )
        }}
      />
    </React.Fragment>
  )
}

export default StaffsTable