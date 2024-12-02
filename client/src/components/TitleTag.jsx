import { Box, Divider, Typography } from '@mui/material';
import { COMPANY_NAME } from 'constants/constants';
import React from 'react';

const TitleTag = ({ title, subtitle }) => {
  return (
    <React.Fragment>
      <Box justifyContent="center" display="flex" alignContent="center" alignItems="center" flexDirection="column" marginBlock={2}>
        <Typography variant="subtitle1" color="secondary">
          {subtitle || COMPANY_NAME}
        </Typography>
        <Typography variant="h1" fontWeight={900}>
          {title}
        </Typography>
      </Box>
      <Divider sx={{ width: 130, display: 'block', margin: ' 1em auto', marginTop: '-1em', borderBottom: 4 }} />
      <Divider />
    </React.Fragment>
  );
};

export default TitleTag;
