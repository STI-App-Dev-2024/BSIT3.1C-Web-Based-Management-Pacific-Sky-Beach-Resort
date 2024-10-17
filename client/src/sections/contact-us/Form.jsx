import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material';
import { Formik } from 'formik';
import React from 'react';

const Form = () => {
  const initialValues = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    phoneNumber: '',
    message: ''
  };

  return (
    <Box
      sx={{
        p: 4,
        boxShadow: 1,
        borderRadius: 2
      }}
    >
      <Formik onSubmit={(data) => console.log(data)} initialValues={initialValues}>
        {({ values, errors, handleChange, handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item md={6}>
                  <Box marginBottom={2}>
                    <Typography variant="subtitle1">First Name (Required)</Typography>
                    <TextField fullWidth name="firstName" onChange={handleChange} placeholder="e.x John" />
                  </Box>
                </Grid>
                <Grid item md={6}>
                  <Box marginBottom={2}>
                    <Typography variant="subtitle1">Last Name (Required)</Typography>
                    <TextField fullWidth name="lastName" onChange={handleChange} placeholder="e.x Doe" />
                  </Box>
                </Grid>
                <Grid item md={6}>
                  <Box marginBottom={2}>
                    <Typography variant="subtitle1">Email Address (Required)</Typography>
                    <TextField fullWidth name="emailAddress" onChange={handleChange} placeholder="e.x John" />
                  </Box>
                </Grid>
                <Grid item md={6}>
                  <Box marginBottom={2}>
                    <Typography variant="subtitle1">Phone Number </Typography>
                    <TextField fullWidth name="phoneNumber" onChange={handleChange} placeholder="e.x John" />
                  </Box>
                </Grid>
                <Grid item md={12}>
                  <Box marginBottom={2}>
                    <Typography variant="subtitle1">Message (Required)</Typography>
                    <TextField multiline rows={5} fullWidth name="message" onChange={handleChange} placeholder="Your message here" />
                  </Box>
                </Grid>
              </Grid>
              <Stack direction="row" justifyContent="flex-end" spacing={2}>
                <Button>Cancel</Button>
                <Button variant="contained" onClick={handleSubmit}>
                  Send
                </Button>
              </Stack>
              <pre>{JSON.stringify(values, null, 2)}</pre>
            </form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default Form;
