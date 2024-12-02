import React, { useMemo, useState } from 'react'
import Table from 'components/Table'
import { useGetAllBookings } from 'api/booking/book-rooms'
import { Chip, Stack, Tooltip, Typography } from '@mui/material'
import ConvertDate from 'components/ConvertDate'
import IconButton from 'components/@extended/IconButton'
import { EditOutlined, EyeOutlined } from '@ant-design/icons'
import ConfirmationDialog from 'components/ConfirmationDialog'
import agent from 'api'
import { useSnackbar } from 'contexts/SnackbarContext'
import ReservsationDetails from './ReservsationDetails'

const RoomReservationsTable = () => {

  const { openSnackbar } = useSnackbar()

  const { roomBookings, isLoading, mutate } = useGetAllBookings()
  const [loading, setLoading] = useState(false)

  const [confirmConfigs, setConfirmConfigs] = useState({ open: true, bookingId: '' })
  const [viewConfigs, setViewConfigs] = useState({ open: true, bookingId: '' })

  const handleConfirm = async () => {
    setLoading(true)
    try {
      await agent.BookRooms.updateReservationStatus(confirmConfigs.bookingId, 1)
      openSnackbar({
        message: `${confirmConfigs.bookingId.slice(0, 6)}... status successfully updated.`,
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
      setConfirmConfigs({ open: false, bookingId: '' })
    }
  }

  const columns = useMemo(() => [
    {
      id: 'roomName',
      align: 'left',
      disablePadding: true,
      label: 'Room Name',
      renderCell: (row) => (
        <Typography>
          {row?.roomName}
        </Typography>
      )
    },
    {
      id: 'customerName',
      align: 'left',
      disablePadding: true,
      label: 'Customer Name',
      renderCell: (row) => (
        <Typography>
          {row?.customerName}
        </Typography>
      )
    },
    {
      id: 'startDate',
      align: 'left',
      disablePadding: true,
      label: 'Check In',
      renderCell: (row) => (
        <Typography>
          <ConvertDate dateString={row?.startDate} />
        </Typography>
      )
    },
    {
      id: 'endDate',
      align: 'left',
      disablePadding: true,
      label: 'Check Out',
      renderCell: (row) => (
        <Typography>
          <ConvertDate dateString={row?.endDate} />
        </Typography>
      )
    },
    {
      id: 'isReserved',
      align: 'center',
      disablePadding: true,
      label: 'Status',
      renderCell: (row) => {
        const isReserved = Boolean(row?.isReserved)
        return (
          <Chip
            label={isReserved ? 'Approved' : 'Pending'}
            color={isReserved ? 'success' : 'primary'}
          />
        )
      }
    },
    {
      id: 'actions',
      align: 'center',
      disablePadding: false,
      label: 'Actions',
      renderCell: (row) => {
        return (
          <Stack direction='row' spacing={2} alignItems='center' justifyContent='center'>
            <Tooltip title='View booking'>
              <span>
                <IconButton onClick={() => setViewConfigs({ open: true, bookingId: row?.bookingId })}>
                  <EyeOutlined />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title={Boolean(row?.isReserved) ? 'Already approved' : 'Update reservation status'}>
              <span>
                <IconButton disabled={Boolean(row?.isReserved)} color='info' onClick={() => setConfirmConfigs({ open: true, bookingId: row?.bookingId })}>
                  <EditOutlined />
                </IconButton>
              </span>
            </Tooltip>
          </Stack>
        )
      }
    },
  ], [roomBookings])


  return (
    <React.Fragment>
      <Table
        columns={columns}
        rows={roomBookings || []}
        isLoading={isLoading}
        settings={{
          order: 'asc',
          orderBy: 'createdAt',
          otherActionButton: null
        }}
      />
      <ReservsationDetails
        open={viewConfigs.open}
        handleClose={() => setViewConfigs({ open: false, bookingId: '' })}
        bookingId={viewConfigs.bookingId}
      />
      <ConfirmationDialog
        open={confirmConfigs.open}
        title='Update reservation status to booked?'
        description={`By confirming, you'll update the ${confirmConfigs.bookingId} status to booked.`}
        handleClose={() => setConfirmConfigs({ open: false })}
        handleConfirm={handleConfirm}
      />
    </React.Fragment>
  )
}

export default RoomReservationsTable