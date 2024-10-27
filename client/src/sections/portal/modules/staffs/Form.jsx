import React from 'react';
import { Box, Button, Dialog, DialogTitle, Divider, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { CloseOutlined } from '@ant-design/icons';
import { Formik } from 'formik';
import { useSnackbar } from 'contexts/SnackbarContext';
import * as Yup from 'yup';
import agent from 'api';
import AnimateButton from 'components/@extended/AnimateButton';
import LoadingButton from 'components/@extended/LoadingButton';
import IconButton from 'components/@extended/IconButton';
import AvatarUpload from 'components/third-party/dropzone/AvatarUpload';
import FormikTextInput from 'components/@extended/FormikTextInput';

const Form = ({ open, handleClose, mutate }) => {
  const { openSnackbar } = useSnackbar();

  const positionsOptions = [
    { label: 'Human Resource Staff', value: 'POSITIONS_HUMAN_RESOURCE' },
    { label: 'Staff', value: 'POSITIONS_STAFF' },
  ];

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

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();

      Object.keys(values).forEach((key) => {
        if (key === 'avatar' && values[key].length > 0) {
          formData.append('avatar', values[key][0]);
        } else {
          formData.append(key, values[key]);
        }
      });

      await agent.Users.addUser(formData);

      openSnackbar({
        message: 'Added successfully.',
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        alert: { color: 'success' },
        duration: 3000,
      });
      handleClose();

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

  return (
    <Dialog fullWidth maxWidth='sm' open={open} onClose={handleClose}>
      <DialogTitle>
        <Stack direction='row' justifyContent='space-between' alignItems='center' paddingBlock={2}>
          <Typography variant='h2'>Add a user</Typography>
          <IconButton color='text' onClick={handleClose}>
            <CloseOutlined />
          </IconButton>
        </Stack>
      </DialogTitle>
      <Divider />
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          emailAddress: '',
          mobileNumber: '',
          position: '',
          avatar: [],
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
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
                />
              </Grid>
              <Grid item sm={12} marginBottom={1}>
                <Typography marginBottom={1} variant='subtitle1'>Last Name (Required)</Typography>
                <FormikTextInput
                  fullWidth
                  variant='outlined'
                  placeholder='Enter last name'
                  name='lastName'
                />
              </Grid>
              <Grid item sm={12} marginBottom={1} >
                <Typography marginBottom={1} variant='subtitle1'>Email Address (Required)</Typography>
                <FormikTextInput
                  fullWidth
                  variant='outlined'
                  placeholder='Enter email address'
                  name='emailAddress'
                />
              </Grid>
              <Grid item sm={12} marginBottom={1} >
                <Typography marginBottom={1} variant='subtitle1'>Phone Number (Required)</Typography>
                <FormikTextInput
                  fullWidth
                  variant='outlined'
                  placeholder='Enter phone number'
                  name='mobileNumber'
                />
              </Grid>
              <Grid item sm={6}>
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
              </Grid>
            </Grid>
            <Stack direction='row' justifyContent='flex-end' marginBlock={2} spacing={2}>
              <Button type="button" onClick={handleClose}>Cancel</Button>
              <Tooltip title={(Object.keys(errors).length > 0 || !values.avatar.length) && 'You must complete the form.'}>
                <span>
                  <AnimateButton>
                    <LoadingButton
                      loading={isSubmitting}
                      disableElevation
                      disabled={isSubmitting || Object.keys(errors).length > 0 || !values.avatar.length}
                      loadingPosition="start"
                      fullWidth
                      type="submit"
                      variant="contained"
                      color="primary"
                      style={{ width: '120px' }}
                    >
                      Create
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
