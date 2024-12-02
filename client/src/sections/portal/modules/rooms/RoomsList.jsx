import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, InputAdornment, OutlinedInput, Pagination, Stack, Typography } from '@mui/material';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useGetAllRooms } from 'api/rooms';
import { useSnackbar } from 'contexts/SnackbarContext';
import agent from 'api';
import ConfirmationDialog from 'components/ConfirmationDialog';
import EmptyUserCard from 'components/skeleton/EmptyUserCard';
import ProductPlaceholder from 'components/skeleton/ProductPlaceholder';
import OfferCard from 'components/offers/OfferCard';
import MainCard from 'components/MainCard';
import { useNavigate } from 'react-router';

const RoomsList = () => {
  const { roomsLoading, rooms, mutate } = useGetAllRooms()
  const { openSnackbar } = useSnackbar()
  const navigate = useNavigate()

  const [currentPage, setCurrentPage] = useState(1);
  const [deleteConfigs, setDeleteConfigs] = useState({
    open: false,
    roomId: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  const itemsPerPage = 8;
  const totalPages = Math.ceil(rooms?.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = rooms?.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [currentPage]);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleOpenDelete = (roomId) => {
    setDeleteConfigs({
      open: true,
      roomId: roomId
    })
  }

  const handleDelete = async () => {
    setIsLoading(true)
    try {
      await agent.Rooms.deleteRoom(deleteConfigs.roomId)
      openSnackbar({
        message: 'Room successfully deleted.',
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        alert: { color: 'success' },
        duration: 3000,
      });
    } catch (error) {
      openSnackbar({
        message: error.message || 'An error occurred.',
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        alert: { color: 'error' },
        duration: 3000,
      });
    } finally {
      await mutate()
      setIsLoading(false)
      setDeleteConfigs({
        open: false,
        roomId: ''
      })
    }
  }

  return (
    <React.Fragment>
      <Stack
        direction='row'
        justifyContent='space-between'
        spacing={2}
        alignItems='center'
        marginBottom={2}
      >
        <OutlinedInput
          size="medium"
          id="header-search"
          sx={{
            minWidth: '25%'
          }}
          startAdornment={
            <InputAdornment position="start" sx={{ mr: -0.5 }}>
              <SearchOutlined />
            </InputAdornment>
          }
          aria-describedby="header-search-text"
          inputProps={{
            'aria-label': 'weight'
          }}
          placeholder={`Search for ${rooms?.length} records...`}
        />
        <Button
          variant='contained'
          startIcon={<PlusOutlined />}
          onClick={() => navigate('/portal/rooms/form?action=add')}
        >
          Add room
        </Button>
      </Stack>
      <MainCard>
        {(rooms?.length > 0 && !roomsLoading) && (
          <React.Fragment>
            <Grid container spacing={2}>
              {currentItems?.map((room, index) => {
                const {
                  roomName,
                  capacity,
                  price,
                  pictures,
                  thumbnail,
                  roomId
                } = room || {}

                return (
                  <Grid item xs={12} sm={12} md={4} key={index}>
                    <OfferCard
                      name={roomName}
                      paxCount={capacity}
                      price={price}
                      pictures={[thumbnail, ...pictures]}
                      handleView={() => navigate(`/portal/rooms/details/${roomId}`)}
                      handleEdit={() => navigate(`/portal/rooms/form?action=edit&roomId=${roomId}`)}
                      handleDelete={() => handleOpenDelete(roomId)}
                    />
                  </Grid>
                )
              })}
            </Grid>
            <Stack direction="row" justifyContent="center" marginBlock={5}>
              <Box>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                  size="large"
                />
                <Box marginBlock={2}>
                  <Typography textAlign='center' >
                    Total rooms: {rooms?.length}
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </React.Fragment>
        )}
        {rooms?.length === 0 && !isLoading && (
          <Stack
            direction='row'
            justifyContent='center'
            alignItems='center'
            height='50dvh'
          >
            <EmptyUserCard title='No Rooms as of the moment.' />
          </Stack>
        )}
        <Grid container spacing={2}>
          {roomsLoading && (
            Array.from({ length: 4 }).map((_, index) => (
              <Grid item xs={12} sm={12} md={3}>
                <ProductPlaceholder key={index} />
              </Grid>
            ))
          )}
        </Grid>
      </MainCard>
      <ConfirmationDialog
        title='Delete Room'
        description='Are you sure you want to delete this room?'
        handleConfirm={handleDelete}
        open={deleteConfigs.open}
        handleClose={() => setDeleteConfigs({ ...deleteConfigs, open: false })}
      />
    </React.Fragment>
  );
};

export default RoomsList;
