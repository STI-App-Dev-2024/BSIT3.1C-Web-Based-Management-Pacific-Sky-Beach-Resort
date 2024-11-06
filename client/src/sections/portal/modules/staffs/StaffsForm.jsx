import React, { useEffect, useState } from 'react';
import { Box, Button, Dialog, DialogTitle, Divider, FormControl, Grid, InputLabel, MenuItem, Select, Stack, Tooltip, Typography } from '@mui/material';
import { CloseOutlined } from '@ant-design/icons';
import { Formik } from 'formik';
import { useSnackbar } from 'contexts/SnackbarContext';
import { useLocation, useNavigate } from 'react-router';
import AnimateButton from 'components/@extended/AnimateButton';
import LoadingButton from 'components/@extended/LoadingButton';
import IconButton from 'components/@extended/IconButton';
import AvatarUpload from 'components/third-party/dropzone/AvatarUpload';
import FormikTextInput from 'components/@extended/FormikTextInput';
import agent from 'api';
import * as Yup from 'yup';
import { useGetSingleUser } from 'api/users';
import useAuth from 'hooks/useAuth';
import { BLANK_VALUE, POSITIONS } from 'constants/constants';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  emailAddress: Yup.string()
    .email('Invalid email address')
    .required('Email address is required'),
  mobileNumber: Yup.string()
    .matches(/^[0-9]{10,13}$/, 'Phone number must be 10-13 digits')
    .required('Phone number is required'),
  position: Yup.string().required('Position is required'),
  avatar: Yup.mixed().required('Avatar is required'),
});

const positionsOptions = [
  { label: 'Human Resource Staff', value: 'POSITIONS_HUMAN_RESOURCE' },
  { label: 'Staff', value: 'POSITIONS_STAFF' },
];

const initialValues = {
  firstName: '',
  lastName: '',
  emailAddress: '',
  mobileNumber: '',
  position: '',
  avatar: [],
}

const Form = ({ open, handleClose, mutate, userId }) => {
  const { user: loggedInUser } = useAuth()
  const { openSnackbar } = useSnackbar();
  const navigate = useNavigate()

  const loggedInUserPosition = loggedInUser?.position
  const isMasterAdmin = loggedInUserPosition === POSITIONS.POSITIONS_MASTER_ADMIN

  const { user, isLoading } = useGetSingleUser(userId)
  const isEditMode = !!userId

  const [formValues, setFormValues] = useState(initialValues)

  useEffect(() => {
    if (user && !isLoading && isEditMode) {
      setFormValues({ ...user });
    } else {
      setFormValues({ ...initialValues });
    }
  }, [user, isLoading, isEditMode]);

  const handleSubmit = async (formValues) => {
    try {
      const formData = new FormData();

      const values = { ...formValues, bio: user?.bio || BLANK_VALUE }

      Object.keys(values).forEach((key) => {
        if (key === 'avatar' && values[key].length > 0) {
          formData.append('avatar', values[key][0]);
        } else {
          formData.append(key, values[key]);
        }
      });

      if (isEditMode) {
        await agent.Profile.editProfile(userId, formData)
        openSnackbar({
          message: 'Edited successfully.',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          alert: { color: 'success' },
          duration: 3000,
        });
        handleClose();
        navigate('/portal/staffs')
      }

      if (!isEditMode) {
        await agent.Users.addUser(formData);

        openSnackbar({
          message: 'Added successfully.',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          alert: { color: 'success' },
          duration: 3000,
        });
        handleClose();
      }

    } catch (err) {
      openSnackbar({
        message: err?.message,
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        alert: { color: 'error' },
        duration: 6000,
      });
    } finally {
      await mutate()
    }
  };

  const formTitle = isEditMode ? 'Edit user' : 'Add a user'
  const formDescription = isEditMode ? "You can edit this user's details." : 'Expand your team by adding a user!'

  return (
    <Dialog
      fullWidth
      maxWidth='sm'
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>
        <Stack direction='row' justifyContent='space-between' alignItems='center' paddingBlock={2}>
          <Box>
            <Typography variant='h2'>{formTitle}</Typography>
            <Typography variant='body' color='secondary'>{formDescription}</Typography>
            {isEditMode && (
              <Box>
                <Typography variant='body' color='secondary'>User ID: {userId}</Typography>
              </Box>
            )}
          </Box>
          <IconButton color='text' onClick={handleClose}>
            <CloseOutlined />
          </IconButton>
        </Stack>
      </DialogTitle>
      <Divider />
      <Formik
        initialValues={formValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ handleSubmit, handleChange, setFieldValue, errors, touched, isSubmitting, values }) => (
          <Box component='form' padding={4} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item sm={12} marginBottom={1} >
                <Typography marginBottom={1} variant='subtitle1'>Avatar (Required)</Typography>
                <Stack alignItems='center'>
                  <AvatarUpload
                    file={values.avatar}
                    setFieldValue={(field, value) => setFieldValue('avatar', value)}
                    error={touched.avatar && errors.avatar}
                    initialFile={isEditMode && values.avatar}
                  />
                </Stack>
              </Grid>
              <Grid item sm={12} marginBottom={1}>
                <Typography marginBottom={1} variant='subtitle1'>First Name (Required)</Typography>
                <FormikTextInput
                  fullWidth
                  variant='outlined'
                  placeholder='Enter first name'
                  name='firstName'
                  value={values.firstName}
                />
              </Grid>
              <Grid item sm={12} marginBottom={1}>
                <Typography marginBottom={1} variant='subtitle1'>Last Name (Required)</Typography>
                <FormikTextInput
                  fullWidth
                  variant='outlined'
                  placeholder='Enter last name'
                  name='lastName'
                  value={values.lastName}
                />
              </Grid>
              <Grid item sm={12} marginBottom={1} >
                <Typography marginBottom={1} variant='subtitle1'>Email Address (Required)</Typography>
                <FormikTextInput
                  fullWidth
                  variant='outlined'
                  placeholder='Enter email address'
                  name='emailAddress'
                  value={values.emailAddress}
                />
              </Grid>
              <Grid item sm={12} marginBottom={1} >
                <Typography marginBottom={1} variant='subtitle1'>Phone Number (Required)</Typography>
                <FormikTextInput
                  fullWidth
                  variant='outlined'
                  placeholder='Enter phone number'
                  name='mobileNumber'
                  value={values.mobileNumber}
                />
              </Grid>
              <Grid item sm={6}>
                {(isEditMode && (isMasterAdmin) || (!isEditMode)) && (
                  <React.Fragment>
                    <Typography marginBottom={1} variant='subtitle1'>Position (Required)</Typography>
                    <FormControl fullWidth>
                      <InputLabel id="demo-multiple-name-label">Position</InputLabel>
                      <Select
                        labelId="position-selector-label"
                        id="position-selector"
                        name="position"
                        value={values.position}
                        onChange={handleChange}
                        error={touched.position && !!errors.position}
                      >
                        {positionsOptions.map((item) => (
                          <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                        ))}
                      </Select>
                      {touched.position && errors.position && (
                        <Typography color="error" variant="caption">{errors.position}</Typography>
                      )}
                    </FormControl>
                  </React.Fragment>
                )}
              </Grid>
            </Grid>
            <Stack direction='row' justifyContent='flex-end' marginBlock={2} spacing={2}>
              <Button type="button" onClick={handleClose}>Cancel</Button>
              <Tooltip title={(Object.keys(errors)?.length > 0 || !values.avatar?.length) && 'You must complete the form.'}>
                <span>
                  <AnimateButton>
                    <LoadingButton
                      loading={isSubmitting}
                      disableElevation
                      disabled={isSubmitting || Object.keys(errors).length > 0 || !values.avatar?.length}
                      loadingPosition="start"
                      fullWidth
                      type="submit"
                      variant="contained"
                      color="primary"
                      style={{ width: '120px' }}
                    >
                      {isEditMode ? 'Edit' : 'Add'}
                    </LoadingButton>
                  </AnimateButton>
                </span>
              </Tooltip>
            </Stack>
          </Box>
        )}
      </Formik>
    </Dialog>
  );
};

export default Form;
