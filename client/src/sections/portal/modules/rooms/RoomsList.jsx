import MainCard from 'components/MainCard';
import React, { useEffect, useState } from 'react';
import { Button, Grid, InputAdornment, OutlinedInput, Pagination, Stack } from '@mui/material';
import OfferCard from 'components/offers/OfferCard';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';

const fakeImages = [
  `https://th.bing.com/th/id/OIP.NiM24KZ1d_g_f2GJl_jAyAHaFj?rs=1&pid=ImgDetMain`,
  ` https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
  `https://images.pexels.com/photos/4138152/pexels-photo-4138152.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
]

const roomData = [
  { name: "Room 1", paxCount: 2, bedCount: 1, bathCount: 1, price: 100, pictures: fakeImages },
  { name: "Room 2", paxCount: 4, bedCount: 2, bathCount: 1, price: 150, pictures: fakeImages },
  { name: "Room 3", paxCount: 3, bedCount: 1, bathCount: 2, price: 120, pictures: fakeImages },
  { name: "Room 4", paxCount: 1, bedCount: 1, bathCount: 1, price: 80, pictures: fakeImages },
  { name: "Room 5", paxCount: 5, bedCount: 2, bathCount: 2, price: 200, pictures: fakeImages },
  { name: "Room 6", paxCount: 3, bedCount: 2, bathCount: 1, price: 130, pictures: fakeImages },
  { name: "Room 7", paxCount: 2, bedCount: 1, bathCount: 1, price: 95, pictures: fakeImages },
  { name: "Room 8", paxCount: 4, bedCount: 3, bathCount: 2, price: 180, pictures: fakeImages },
  { name: "Room 9", paxCount: 3, bedCount: 2, bathCount: 1, price: 140, pictures: fakeImages },
  { name: "Room 10", paxCount: 2, bedCount: 1, bathCount: 1, price: 110, pictures: fakeImages },
  { name: "Room 11", paxCount: 4, bedCount: 2, bathCount: 2, price: 160, pictures: fakeImages },
  { name: "Room 12", paxCount: 5, bedCount: 3, bathCount: 2, price: 220, pictures: fakeImages },
  { name: "Room 13", paxCount: 1, bedCount: 1, bathCount: 1, price: 75, pictures: fakeImages },
  { name: "Room 14", paxCount: 3, bedCount: 2, bathCount: 1, price: 135, pictures: fakeImages },
  { name: "Room 15", paxCount: 2, bedCount: 1, bathCount: 1, price: 90, pictures: fakeImages },
];


const RoomsList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8;
  const totalPages = Math.ceil(roomData.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = roomData.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [currentPage]);

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
          placeholder={`Search for ${roomData.length} records...`}
        />
        <Button
          variant='contained'
          startIcon={<PlusOutlined />}
        >
          Add room
        </Button>
      </Stack>
      <MainCard>
        <Grid container spacing={2}>
          {currentItems.map((item, index) => (
            <Grid item xs={12} sm={12} md={3} key={index}>
              <OfferCard
                name={item.name}
                paxCount={item.paxCount}
                price={item.price}
                pictures={item.pictures}
              />
            </Grid>
          ))}
        </Grid>
        <Stack direction="row" justifyContent="center" marginBlock={5}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            size="large"
          />
        </Stack>
      </MainCard>
    </React.Fragment>
  );
};

export default RoomsList;
