import React from 'react';
import { Box, Grid, Stack, Typography } from '@mui/material';

const TwoColumn = ({ image, title, subtitle, caption, description, isInverted }) => {
  return (
    <Grid marginBottom={5} container justifyContent="center" alignItems="center" display="flex" flexDirection={isInverted && 'row-reverse'}>
      <Grid item sm={12} md={6}>
        <Box width="100%" marginTop={5} borderRadius={2} component="img" src={image} alt="About Us" />
      </Grid>
      <Grid item paddingLeft={5} sm={12} md={6} mt={5}>
        <Box
          sx={{
            width: 120,
            borderRadius: 2,
            boxShadow: 3,
            marginBottom: 2,
            p: 0.3
          }}
        >
          <Typography textAlign="center" variant="subtitle2">
            {title}
          </Typography>
        </Box>

        <Typography fontWeight={1000} letterSpacing={-1} variant="h1">
          {subtitle}
        </Typography>
        <Typography fontWeight={600} letterSpacing={-1} marginBottom={1} variant="h3">
          {caption}
        </Typography>
        <Typography borderLeft={1} paddingLeft={2} letterSpacing={0} variant="subtitle1">
          {description}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default TwoColumn;
