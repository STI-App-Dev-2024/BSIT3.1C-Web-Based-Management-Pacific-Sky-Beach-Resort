import React, { useState } from 'react';
import {
  mdiAirConditioner,
  mdiCountertopOutline,
  mdiFridge,
  mdiGrill,
  mdiRadiator,
  mdiShower,
  mdiTelevisionBox,
  mdiWifi
} from '@mdi/js';
import { Button, Dialog, Grid, Stack, Typography } from '@mui/material';
import { CloseOutlined } from '@ant-design/icons';
import Icon from '@mdi/react';
import LabeledValue from 'components/LabeledValue';
import MainCard from 'components/MainCard';
import IconButton from 'components/@extended/IconButton';

const AmenityItem = ({ title, icon, availability }) => (
  <Grid item md={6}>
    <LabeledValue
      title={title}
      subTitle={availability ? 'Available' : 'Not Available'}
      icon={<Icon path={icon} size={1} />}
    />
  </Grid>
);

const Amenities = ({ amenities }) => {
  const {
    hasWifi,
    hasShower,
    hasGrill,
    hasHeater,
    hasKitchen,
    hasTV,
    hasAircon,
    hasRefrigerator
  } = amenities || {};

  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <MainCard title="Amenities" content={false} style={{ height: '100%' }}>
        <Grid container spacing={2} marginBlock={2} padding={2}>
          <AmenityItem title="Wifi" icon={mdiWifi} availability={hasWifi} />
          <AmenityItem title="Shower" icon={mdiShower} availability={hasShower} />
          <AmenityItem title="Air Conditioning" icon={mdiAirConditioner} availability={hasAircon} />
          <AmenityItem title="Heater" icon={mdiRadiator} availability={hasHeater} />
        </Grid>
        <Stack marginBlock={2} direction="row" justifyContent="center">
          <Button variant="contained" size="small" onClick={() => setOpen(true)}>
            View all amenities
          </Button>
        </Stack>
      </MainCard>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <Stack direction="row" justifyContent="space-between" alignItems="center" margin={2}>
          <Typography variant="h4">Amenities</Typography>
          <IconButton onClick={() => setOpen(false)}>
            <CloseOutlined />
          </IconButton>
        </Stack>
        <Grid container spacing={2} padding={2}>
          <AmenityItem title="Wifi" icon={mdiWifi} availability={hasWifi} />
          <AmenityItem title="Shower" icon={mdiShower} availability={hasShower} />
          <AmenityItem title="Heater" icon={mdiRadiator} availability={hasHeater} />
          <AmenityItem title="Grill" icon={mdiGrill} availability={hasGrill} />
          <AmenityItem title="Kitchen" icon={mdiCountertopOutline} availability={hasKitchen} />
          <AmenityItem title="Television" icon={mdiTelevisionBox} availability={hasTV} />
          <AmenityItem title="Air Conditioning" icon={mdiAirConditioner} availability={hasAircon} />
          <AmenityItem title="Refrigerator" icon={mdiFridge} availability={hasRefrigerator} />
        </Grid>
      </Dialog>
    </React.Fragment>
  );
};

export default Amenities;
