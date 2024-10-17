import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import React from 'react';

const TwoColumn = ({ image, title, subtitle, caption, description, isInverted }) => {
  return (

      <Grid container  paddingInline={20} spacing={0} flexDirection={isInverted && 'row-reverse'}>
        <Grid item sm={12} md={6} justifyContent="center" display="flex">
          <Box marginTop={5} borderRadius={2} width="95%" component="img" src={image} alt="About Us" />
        </Grid>
        <Grid paddingLeft={12} item sm={12} md={6}>
          <Stack direction="column" justifyContent="center" height="100%">
            <Box
              textAlign="center"
              sx={{
                width: 120,
                borderRadius: 2,
                boxShadow: 3, 
                marginBottom: 2
              }}
            >
              <Typography letterSpacing={2} variant="subtitle2">
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
          </Stack>
        </Grid>
      </Grid>
  
  );
};

export default TwoColumn;
