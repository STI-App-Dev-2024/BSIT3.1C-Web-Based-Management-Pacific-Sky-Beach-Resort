import React from 'react';
import { Box, Grid, InputLabel, Stack, Typography } from '@mui/material';
import { getPositionLabel } from 'utils/getPositionLabel';
import { Formik } from 'formik';
import AnimateButton from 'components/@extended/AnimateButton';
import FormikTextInput from 'components/@extended/FormikTextInput';
import LoadingButton from 'components/@extended/LoadingButton';
import MainCard from 'components/MainCard';
import PageTitle from 'components/PageTitle';
import AvatarUpload from 'components/third-party/dropzone/AvatarUpload';
import useAuth from 'hooks/useAuth';
import agent from 'api';
import { useSnackbar } from 'contexts/SnackbarContext';
import { useGetSingleUser } from 'api/users';

const EditProfile = () => {
  const { openSnackbar } = useSnackbar()
  const { user: loggedInUser } = useAuth();
  const { user, mutate } = useGetSingleUser(loggedInUser?.userId)

  const {
    firstName,
    lastName,
    emailAddress,
    avatar,
    position,
    mobileNumber,
    bio,
    userId
  } = user || {};

  const fullName = firstName?.concat(' ', lastName)

  return (
    <React.Fragment>
      <PageTitle title='Edit Profile' />
      <Formik
        initialValues={{
          firstName,
          lastName,
          emailAddress,
          avatar: avatar,
          mobileNumber,
          bio
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          try {
            const formData = new FormData();

            Object.keys(values).forEach((key) => {
              if (key === 'avatar' && values[key]?.length > 0) {
                formData.append('avatar', values[key][0]);
              } else {
                formData.append(key, values[key]);
              }
            });

            await agent.Profile.editProfile(userId, formData);
            await mutate();
            openSnackbar({
              message: 'Profile successfully updated.',
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
            setSubmitting(false);
          }
        }}
      >
        {({ values, errors, touched, setFieldValue, handleSubmit, isSubmitting }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2} padding={4}>
                <Grid item xs={12} sm={12} md={3}>
                  <MainCard>
                    <Stack direction='row' justifyContent='center' alignItems='center' marginBottom={2}>
                      <AvatarUpload
                        file={values.avatar}
                        setFieldValue={(field, value) => setFieldValue('avatar', value)}
                        initialFile={avatar}
                        error={touched.avatar && errors.avatar}
                      />
                    </Stack>
                    <Stack spacing={1} alignItems='center'>
                      <Typography variant='h4'>
                        {fullName}
                      </Typography>
                      <Typography variant='subtitle1' color='secondary'>
                        {getPositionLabel(position)}
                      </Typography>
                    </Stack>
                  </MainCard>
                </Grid>
                <Grid item xs={12} sm={12} md={9}>
                  <MainCard
                    title='Personal Information'
                  >
                    <Grid container spacing={2} marginBottom={1}>
                      <Grid item xs={12} sm={12} md={6}>
                        <Box marginBottom={1}>
                          <InputLabel htmlFor="personal-first-name" sx={{ mb: 1 }} >First Name</InputLabel>
                          <FormikTextInput
                            name='firstName'
                            variant="outlined"
                            value={firstName}
                            placeholder="First Name"
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6}>
                        <Box marginBottom={1}>
                          <InputLabel htmlFor="personal-last-name" sx={{ mb: 1 }} >Last Name</InputLabel>
                          <FormikTextInput
                            name='lastName'
                            variant="outlined"
                            value={lastName}
                            placeholder="Last Name"
                          />
                        </Box>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} marginBottom={1}>
                      <Grid item xs={12} sm={12} md={6}>
                        <Box marginBottom={1}>
                          <InputLabel htmlFor="personal-first-name" sx={{ mb: 1 }} >Email Address</InputLabel>
                          <FormikTextInput
                            name='emailAddress'
                            variant="outlined"
                            value={emailAddress}
                            placeholder="Email Address"
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6}>
                        <Box marginBottom={1}>
                          <InputLabel htmlFor="personal-last-name" sx={{ mb: 1 }}>Phone Number</InputLabel>
                          <FormikTextInput
                            name='mobileNumber'
                            variant="outlined"
                            value={mobileNumber}
                            placeholder="Phone Number"
                          />
                        </Box>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} marginBottom={1}>
                      <Grid item xs={12}>
                        <Box marginBottom={1}>
                          <InputLabel htmlFor="personal-last-name" sx={{ mb: 1 }}>Bio</InputLabel>
                          <FormikTextInput
                            name='bio'
                            variant="outlined"
                            value={bio}
                            placeholder="Bio"
                            isTextArea
                          />
                        </Box>
                      </Grid>
                    </Grid>
                    <Stack direction='row' marginBlock={4} justifyContent='flex-end'>
                      <AnimateButton>
                        <LoadingButton
                          loading={isSubmitting}
                          disableElevation
                          disabled={isSubmitting}
                          loadingPosition="start"
                          fullWidth
                          variant="contained"
                          color="primary"
                          style={{ width: '120px' }}
                          type='submit'
                        >
                          Save
                        </LoadingButton>
                      </AnimateButton>
                    </Stack>
                  </MainCard>
                </Grid>
              </Grid>
            </form>
          );
        }}
      </Formik>
    </React.Fragment>
  );
};

export default EditProfile;
