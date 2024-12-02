import React, { useState } from 'react'
import { Button, Container, Grid, Stack, Box, Pagination, Typography } from '@mui/material'
import { useGetAllRooms } from 'api/rooms'
import { useNavigate } from 'react-router'
import OfferCard from 'components/offers/OfferCard'
import PageTitle from 'components/PageTitle'
import ScrollTop from 'components/ScrollTop'
import TitleTag from 'components/TitleTag'
import ProductPlaceholder from 'components/skeleton/ProductPlaceholder'

const Rooms = () => {
  const navigate = useNavigate()

  const { rooms, roomsLoading } = useGetAllRooms()

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8;
  const totalPages = Math.ceil(rooms?.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = rooms?.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <React.Fragment>
      <ScrollTop />
      <PageTitle title='Rooms' isOnportal={false} />
      <TitleTag title='Rooms' />
      <Container sx={{ my: 2 }}>
        <Grid container spacing={2}>
          {currentItems?.map((room) => {
            const {
              roomName,
              capacity,
              price,
              thumbnail,
              pictures,
              roomId
            } = room || {}
            return (
              <Grid item xs={12} sm={12} md={4} marginBlockEnd={2}>
                <OfferCard
                  name={roomName}
                  paxCount={capacity}
                  price={price}
                  pictures={[thumbnail, ...pictures]}
                  isOnPortal={false}
                />
                <Stack alignItems='center'>
                  <Button
                    variant='contained'
                    size='small'
                    onClick={() => navigate(`/rooms/details/${roomId}`)}
                  >
                    View
                  </Button>
                </Stack>
              </Grid>
            )
          })}
        </Grid>
        <Stack alignItems="center" marginBlock={5}>
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
        <Grid container spacing={2}>
          {roomsLoading && (
            Array.from({ length: 3 }).map((_, index) => (
              <Grid item xs={12} sm={12} md={4}>
                <ProductPlaceholder key={index} />
              </Grid>
            ))
          )}
        </Grid>
      </Container>
    </React.Fragment>
  )
}

export default Rooms