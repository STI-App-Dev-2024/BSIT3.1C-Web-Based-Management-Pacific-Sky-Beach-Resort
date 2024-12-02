import { EditOutlined, TagOutlined } from '@ant-design/icons';
import Icon from '@mdi/react';
import { mdiAccountGroup, mdiCalendarBlankOutline, mdiCard, mdiCurrencyPhp, mdiFormatListBulletedType, mdiIdCard, mdiRenameOutline, mdiWifi } from '@mdi/js';
import { Alert, Box, Button, Dialog, Grid, ImageList, ImageListItem, Stack, Typography } from '@mui/material';
import LabeledValue from 'components/LabeledValue';
import MainCard from 'components/MainCard';
import React, { useState } from 'react';
import currencyFormatter from 'utils/currencyFormatter';
import ConvertDate from 'components/ConvertDate';
import UserCard from 'components/UserCard';
import { useGetSingleUser } from 'api/users';
import { useNavigate } from 'react-router';
import Amenities from './Amenities';
import Reservation from './reservation/Reservation';

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const SingleRoomPage = ({
  roomData,
  loading,
  isOnPortal = true
}) => {
  const navigate = useNavigate()

  const [openConfigs, setOpenConfigs] = useState({
    open: false,
    selectedPicture: ''
  });

  const [hoveredImage, setHoveredImage] = useState(null);
  const [openForm, setOpenForm] = useState(false)


  const {
    roomName,
    pictures,
    thumbnail,
    description,
    roomType,
    price,
    capacity,
    roomId,
    createdAt,
    userId,
    isOccupied,
    amenities
  } = roomData || {};

  const { user, isLoading } = useGetSingleUser(userId)

  const mergedPics = [thumbnail, ...(loading ? [] : pictures)];

  const pictures_data = mergedPics?.map((item, index) => {
    return {
      img: item,
      rows: index === 0 ? 2 : 1,
      cols: index === 0 ? 2 : 1
    };
  });

  return (
    <React.Fragment>
      {!isOnPortal && (
        <Typography variant='h2'>
          {roomName}
        </Typography>
      )}
      {isOnPortal && (
        <Stack direction='row' justifyContent='flex-end' alignItems='center'>
          <Button
            color='info'
            variant='contained'
            size='small'
            startIcon={<EditOutlined />}
            onClick={() => navigate(`/portal/rooms/form?action=edit&roomId=${roomId}`)}
          >
            Edit
          </Button>
        </Stack>
      )}
      <Alert variant='standard' color={Boolean(isOccupied) ? 'info' : 'success'} sx={{ my: 2 }}>
        {Boolean(isOccupied) ? 'Not Available for booking right now.' : 'Available for booking today.'}
      </Alert>
      <Stack>
        <ImageList
          sx={{ width: `100%`, height: 400, objectFit: 'cover' }}
          variant="quilted"
          cols={4}
          rowHeight={200}
        >
          {pictures_data.map((item) => (
            <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
              <img
                {...srcset(item.img, 121, item.rows, item.cols)}
                alt={item.title}
                loading="lazy"
                onClick={() => setOpenConfigs({ open: true, selectedPicture: item.img })}
                style={{
                  cursor: 'pointer',
                  opacity: hoveredImage === item.img ? 0.7 : 1,
                  transition: 'opacity 0.3s ease, transform 0.3s ease',
                }}
                onMouseEnter={() => setHoveredImage(item.img)}
                onMouseLeave={() => setHoveredImage(null)}
              />
            </ImageListItem>
          ))}
        </ImageList>
        <Grid container spacing={2} sx={{ marginBottom: '1em' }}>
          <Grid item xs={12} sm={12} md={isOnPortal ? 12 : 8}>
            <MainCard style={{ height: '100%' }}>
              <Typography variant='h4'>
                Description
              </Typography>
              <Typography variant='caption'>
                {description}
              </Typography>
            </MainCard>
          </Grid>
          {!isOnPortal && (
            <Grid item xs={12} sm={12} md={4}>
              <MainCard>
                <Stack alignItems='center' >
                  <Typography variant='h3'>
                    Book a Reservation
                  </Typography>
                  <Button
                    variant='contained'
                    size='small'
                    sx={{ my: 2 }}
                    fullWidth
                    onClick={() => setOpenForm(true)}
                  >
                    Reserve
                  </Button>
                </Stack>
              </MainCard>
            </Grid>
          )}
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={8}>
            <MainCard title='General Information' style={{ height: '100%' }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6}>
                  <Box padding={1}>
                    <LabeledValue
                      title="Room Name"
                      subTitle={roomName}
                      icon={<Icon path={mdiRenameOutline} size={1} />}
                    />
                  </Box>
                  <Box padding={1}>
                    <LabeledValue
                      title="Rate per night"
                      subTitle={currencyFormatter(price)}
                      icon={<Icon path={mdiCurrencyPhp} size={1} />}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <Box padding={1}>
                    <LabeledValue
                      title="Room Type"
                      subTitle={roomType}
                      icon={<Icon path={mdiFormatListBulletedType} size={1} />}
                    />
                  </Box>
                  <Box padding={1}>
                    <LabeledValue
                      title="Maximum Capacity"
                      subTitle={capacity}
                      icon={<Icon path={mdiAccountGroup} size={1} />}
                    />
                  </Box>
                </Grid>
              </Grid>
              {isOnPortal && (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={6}>
                    <Box padding={1}>
                      <LabeledValue
                        title="Room ID"
                        subTitle={<Typography>{roomId}</Typography>}
                        icon={<Icon path={mdiIdCard} size={1} />}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Box padding={1}>
                      <LabeledValue
                        title="Created At"
                        subTitle={<ConvertDate dateString={createdAt} />}
                        icon={<Icon path={mdiCalendarBlankOutline} size={1} />}
                      />
                    </Box>
                  </Grid>
                </Grid>
              )}
            </MainCard>
          </Grid>
          {isOnPortal ? (
            <Grid item xs={12} sm={12} md={4}>
              <UserCard user={user} isLoading={isLoading} title="Created By" />
            </Grid>
          ) : (
            <Grid item md={4}>
              <Amenities amenities={amenities} />
            </Grid>
          )}
        </Grid>
        {isOnPortal && (
          <Grid container spacing={2}>
            <Grid item md={8}>
              <MainCard content={false} style={{ marginBlock: '1em', height: '100%' }}  >
                Bookings List
              </MainCard>
            </Grid>
            <Grid item md={4} style={{ marginBlock: '1em', height: '100%' }}>
              <Amenities amenities={amenities} />
            </Grid>
          </Grid>
        )}
      </Stack>
      <Reservation
        open={openForm}
        onClose={() => setOpenForm(false)}
        roomData={roomData}
      />
      <Dialog
        open={openConfigs.open}
        onClose={() => setOpenConfigs({ open: false, selectedPicture: `` })}
        fullWidth
        maxWidth='sm'
      >
        <Box>
          <img
            src={openConfigs.selectedPicture}
            style={{ width: '100%', height: '100%', objectFit: 'cover', margin: 0 }}
          />
        </Box>
      </Dialog>
    </React.Fragment >
  );
};

export default SingleRoomPage;
