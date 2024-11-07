import MainCard from 'components/MainCard';
import React, { useEffect, useState } from 'react';
import { Grid, Pagination, Stack } from '@mui/material';
import OfferCard from 'components/offers/OfferCard';

const roomData = [
  { name: "Room 1", paxCount: 2, bedCount: 1, bathCount: 1, price: 100 },
  { name: "Room 2", paxCount: 4, bedCount: 2, bathCount: 1, price: 150 },
  { name: "Room 3", paxCount: 3, bedCount: 1, bathCount: 2, price: 120 },
  { name: "Room 4", paxCount: 1, bedCount: 1, bathCount: 1, price: 80 },
  { name: "Room 5", paxCount: 5, bedCount: 2, bathCount: 2, price: 200 },
  { name: "Room 6", paxCount: 3, bedCount: 2, bathCount: 1, price: 130 },
  { name: "Room 7", paxCount: 2, bedCount: 1, bathCount: 1, price: 95 },
  { name: "Room 8", paxCount: 4, bedCount: 3, bathCount: 2, price: 180 },
  { name: "Room 9", paxCount: 3, bedCount: 2, bathCount: 1, price: 140 },
  { name: "Room 10", paxCount: 2, bedCount: 1, bathCount: 1, price: 110 },
  { name: "Room 11", paxCount: 4, bedCount: 2, bathCount: 2, price: 160 },
  { name: "Room 12", paxCount: 5, bedCount: 3, bathCount: 2, price: 220 },
  { name: "Room 13", paxCount: 1, bedCount: 1, bathCount: 1, price: 75 },
  { name: "Room 14", paxCount: 3, bedCount: 2, bathCount: 1, price: 135 },
  { name: "Room 15", paxCount: 2, bedCount: 1, bathCount: 1, price: 90 },
  { name: "Room 16", paxCount: 4, bedCount: 2, bathCount: 2, price: 170 },
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
      <MainCard style={{ marginBottom: '1em' }}>aa</MainCard>
      <Grid container spacing={2}>
        {currentItems.map((item, index) => (
          <Grid item xs={12} sm={12} md={3} key={index}>
            <OfferCard
              bathCount={item.bathCount}
              bedCount={item.bedCount}
              name={item.name}
              paxCount={item.paxCount}
              price={item.price}
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
    </React.Fragment>
  );
};

export default RoomsList;
