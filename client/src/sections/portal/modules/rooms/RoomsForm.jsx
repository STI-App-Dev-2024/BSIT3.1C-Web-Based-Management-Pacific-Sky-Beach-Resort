import { CaretRightOutlined, GiftOutlined, PlusCircleOutlined, PlusOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { Autocomplete, Box, Button, CardActions, Checkbox, Container, FormControlLabel, Grid, InputAdornment, List, ListItemAvatar, ListItemButton, ListItemSecondaryAction, ListItemText, OutlinedInput, Stack, TextField, Typography } from '@mui/material';
import FormWrapper from 'components/FormWrapper';
import MainCard from 'components/MainCard';
import SingleFileUpload from 'components/third-party/dropzone/FileUpload';
import MultiFileUpload from 'components/third-party/dropzone/MultiFile';
import { ErrorMessage, useFormik } from 'formik';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import currencyFormatter from 'utils/currencyFormatter';
import { useTheme } from '@mui/material/styles'
import AnimateButton from 'components/@extended/AnimateButton';
import LoadingButton from 'components/@extended/LoadingButton';
import { useSnackbar } from 'contexts/SnackbarContext';
import agent from 'api';
import useAuth from 'hooks/useAuth';
import Avatar from 'components/@extended/Avatar';
import { BedOutline } from 'mdi-material-ui';

const initialValues = {
  roomName: '',
  capacity: null,
  price: null,
  roomType: '',
  description: '',
  bathRoomDetails: [],
  files: [],
  thumbnail: [],
  hasWifi: false,
  hasShower: false,
  hasGrill: false,
  hasHeater: false,
  hasKitchen: false,
  hasTV: false,
  hasAircon: false,
  hasRefrigerator: false
};

const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem'
};

const actionSX = {
  mt: 0.75,
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',
  transform: 'none'
};

const options = [
  { title: 'Apartment' },
  { title: 'Pavilion' },
  { title: 'Cottage' }
];

const bedOptions = [
  { title: "King Size" },
  { title: "Queen Size" },
  { title: "Double Deck" },
  { title: "Single" },
];

const inputHeight = { height: '53px' };

const RoomsForm = () => {
  const { openSnackbar } = useSnackbar()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)

  const [bedConfigs, setBedConfigs] = useState({ bedType: null, bedCount: 0 })
  const [bedDetails, setBedDetails] = useState([])

  const [isOpenBedForm, setIsOpenBedForm] = useState(false)

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const formMode = queryParams.get('action');
  const isAddMode = formMode.toLocaleLowerCase() === 'add';
  const pageTitle = isAddMode ? 'Create' : 'Edit';

  const [value, setValue] = useState(null);

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const formData = new FormData();

        const basicFields = [
          'roomName',
          'capacity',
          'roomType',
          'price',
          'description',
        ];

        basicFields.forEach(field => {
          if (values[field]) formData.append(field, values[field]);
        });

        formData.append('bedDetails', JSON.stringify(bedDetails));
        formData.append('userId', user?.userId)

        const amenities = [
          'hasWifi',
          'hasShower',
          'hasAircon',
          'hasHeater',
          'hasGrill',
          'hasKitchen',
          'hasTV',
          'hasRefrigerator',
        ];

        amenities.forEach(amenity => {
          formData.append(amenity, values[amenity] ? 1 : 0);
        });

        if (values.thumbnail) {
          formData.append('thumbnail', values.thumbnail);
        }

        if (values?.files?.length) {
          values.files.forEach((file) => {
            formData.append('pictures', file);
          });
        }

        await agent.Rooms.createRoom(formData);

        openSnackbar({
          message: 'Room successfully created.',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          alert: { color: 'success' },
          duration: 3000,
        });

        navigate(`/portal/rooms`);
      } catch (error) {
        openSnackbar({
          message: error.message || 'An error occurred.',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          alert: { color: 'error' },
          duration: 3000,
        });
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

  });

  const {
    values,
    touched,
    errors,
    handleSubmit,
    setFieldValue,
    handleChange
  } = formik || {};

  const handlePriceChange = (e) => {
    let value = e.target.value.replace(/[^\d.]/g, '');
    setFieldValue('price', value);
  };

  const mergedBeds = Object.values(
    bedDetails.reduce((acc, bed) => {
      if (acc[bed.bedType]) {
        acc[bed.bedType].bedCount += Number(bed.bedCount);
      } else {
        acc[bed.bedType] = { ...bed, bedCount: Number(bed.bedCount) };
      }
      return acc;
    }, {})
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12}>
        <FormWrapper title={`${pageTitle} Room`} caption="All fields are required.">
          <form onSubmit={handleSubmit}>
            <Box marginBottom={4}>
              <Typography variant="h3" marginBottom={1}>
                <CaretRightOutlined /> General Room Information
              </Typography>
              <Box margin="1em">
                <Typography variant='body1' marginBottom={1}>
                  Thumbnail
                </Typography>
                <SingleFileUpload
                  fieldName="thumbnail"
                  file={values.thumbnail}
                  setFieldValue={setFieldValue}
                  error={errors.thumbnail}
                  sx={{ width: '500px' }}
                />
                <Grid container spacing={2} marginBlock={1}>
                  <Grid item xs={12} sm={12} md={6}>
                    <Box>
                      <Typography variant="body1" marginBottom={1}>Room Name</Typography>
                      <OutlinedInput
                        onChange={handleChange}
                        fullWidth
                        placeholder="Enter room name..."
                        name="roomName"
                        value={values.roomName}
                        sx={inputHeight}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Box>
                      <Typography variant="body1" marginBottom={1}>Room Type</Typography>
                      <Autocomplete
                        value={value}
                        onChange={(event, newValue) => {
                          if (typeof newValue === 'string') {
                            setValue(newValue);
                            setFieldValue('roomType', newValue);
                          } else if (newValue && newValue.inputValue) {
                            setValue(newValue.inputValue);
                            setFieldValue('roomType', newValue.inputValue);
                          } else {
                            setValue(newValue);
                            setFieldValue('roomType', newValue.title);
                          }
                        }}
                        filterOptions={(options, params) => {
                          const filtered = options.filter((option) =>
                            option.title.toLowerCase().includes(params.inputValue.toLowerCase())
                          );

                          if (params.inputValue !== '') {
                            filtered.push({
                              inputValue: params.inputValue,
                              title: `Add "${params.inputValue}"`,
                            });
                          }

                          return filtered;
                        }}
                        id="free-solo-dialog-demo"
                        options={options}
                        getOptionLabel={(option) => typeof option === 'string' ? option : option.title}
                        selectOnFocus
                        clearOnBlur
                        handleHomeEndKeys
                        renderOption={(props, option) => (
                          <li {...props}>{option.title}</li>
                        )}
                        freeSolo
                        renderInput={(params) => (
                          <TextField
                            variant="outlined"
                            {...params}
                            sx={inputHeight}
                            placeholder="Enter Room Type"
                          />
                        )}
                      />
                    </Box>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={6}>
                    <Box>
                      <Typography variant="body1" marginBottom={1}>Capacity (maximum persons)</Typography>
                      <OutlinedInput
                        onChange={handleChange}
                        fullWidth
                        placeholder="Enter number of pax the room can accomodate"
                        name="capacity"
                        value={values.capacity}
                        sx={inputHeight}
                        type='number'
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Box>
                      <Typography variant="body1" marginBottom={1}>Price</Typography>
                      <OutlinedInput
                        onChange={handlePriceChange}
                        fullWidth
                        placeholder="Enter price"
                        name="price"
                        value={currencyFormatter(values.price || '')}
                        sx={inputHeight}
                        type="text"
                        startAdornment={
                          <InputAdornment position="start">₱</InputAdornment>
                        }
                      />
                    </Box>
                  </Grid>
                </Grid>
                <Box marginBlock={2}>
                  <Typography variant='body1' marginBottom={1}>
                    Description
                  </Typography>
                  <OutlinedInput
                    onChange={handleChange}
                    fullWidth
                    placeholder="Enter description"
                    name="description"
                    value={values.description}
                    multiline
                    rows={4}
                  />
                </Box>
              </Box>
            </Box>
            <Box marginBottom={4}>
              <Typography variant="h3" marginBottom={1}>
                <CaretRightOutlined /> Bed Room Specifications
              </Typography>
              <Grid container spacing={2} paddingInline="1em">
                <Grid item xs={12} sm={6} md={6}>
                  <List
                    component="nav"
                    sx={{
                      px: 0,
                      py: 0,
                      '& .MuiListItemButton-root': {
                        py: 1.5,
                        '& .MuiAvatar-root': avatarSX,
                        '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
                      }
                    }}
                  >
                    {mergedBeds.map((bed) => {
                      const { bedType, bedCount } = bed || {}

                      return (
                        <ListItemButton divider sx={{ mb: 2 }}>
                          <ListItemAvatar>
                            <Avatar sx={{ color: 'primary.main', bgcolor: 'primary.lighter' }}>
                              <BedOutline />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={<Typography variant="subtitle1">
                              {bedType}
                            </Typography>}
                          />
                          <ListItemSecondaryAction>
                            <Typography variant='h2'>
                              {bedCount}
                            </Typography>
                          </ListItemSecondaryAction>
                        </ListItemButton>
                      )
                    })}
                  </List>
                  {isOpenBedForm && (
                    <Box marginBottom={2}>
                      <MainCard>
                        <Typography variant='subtitle1' marginBottom={2}>
                          Add Bed Form
                        </Typography>
                        <Box marginBottom={2}>
                          <Typography marginBottom={1}> Bed Type </Typography>
                          <Autocomplete
                            value={bedConfigs.bedType}
                            onChange={(event, newValue) => {
                              if (typeof newValue === 'string') {
                                setBedConfigs((prevConfigs) => ({ ...prevConfigs, bedType: newValue }));
                                setFieldValue('bedType', newValue);
                              } else if (newValue && newValue.inputValue) {
                                setBedConfigs((prevConfigs) => ({ ...prevConfigs, bedType: newValue.inputValue }));
                                setFieldValue('bedType', newValue.inputValue);
                              } else {
                                setBedConfigs((prevConfigs) => ({ ...prevConfigs, bedType: newValue.title }));
                                setFieldValue('bedType', newValue.title);
                              }
                            }}
                            filterOptions={(options, params) => {
                              const filtered = options.filter((option) =>
                                option.title.toLowerCase().includes(params.inputValue.toLowerCase())
                              );

                              if (params.inputValue !== '') {
                                filtered.push({
                                  inputValue: params.inputValue,
                                  title: `Add "${params.inputValue}"`,
                                });
                              }

                              return filtered;
                            }}
                            id="bed-type-autocomplete"
                            options={bedOptions}
                            getOptionLabel={(option) => (typeof option === 'string' ? option : option.title)}
                            selectOnFocus
                            clearOnBlur
                            handleHomeEndKeys
                            renderOption={(props, option) => (
                              <li {...props}>{option.title}</li>
                            )}
                            freeSolo
                            renderInput={(params) => (
                              <TextField
                                variant="outlined"
                                {...params}
                                sx={inputHeight}
                                placeholder="Add Bed Type or Select one"
                              />
                            )}
                          />
                        </Box>
                        <Box>
                          <Typography marginBottom={1}> Count </Typography>
                          <OutlinedInput
                            onChange={(e) => setBedConfigs({ ...bedConfigs, bedCount: e.target.value })}
                            type='number'
                          />
                        </Box>
                        <Stack direction='row' justifyContent='flex-end' alignItems='center' spacing={2}>
                          <Button size='small' >
                            Cancel
                          </Button>
                          <Button
                            variant='contained'
                            size='small'
                            onClick={() => {
                              setBedDetails([...bedDetails, bedConfigs])
                              setIsOpenBedForm(false)
                            }}
                          >
                            Add
                          </Button>
                        </Stack>
                      </MainCard>
                    </Box>
                  )}
                  <Button
                    size='small'
                    variant='contained'
                    startIcon={<PlusCircleOutlined />}
                    onClick={() => setIsOpenBedForm(true)}
                  >
                    <Typography variant='body1' >
                      Add Bed
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
            </Box>
            <Box marginBottom={4}>
              <Typography variant="h3" marginBottom={1}>
                <CaretRightOutlined /> Room Images
              </Typography>
              <Box padding="0 1em">
                <Box>
                  <Typography variant='body1' marginBottom={1}>
                    Pictures
                  </Typography>
                  <MultiFileUpload
                    setFieldValue={setFieldValue}
                    files={values.files}
                    error={touched.files && !!errors.files}
                    hideButton
                    showList
                  />
                </Box>
              </Box>
            </Box>
            <Box marginBottom={4}>
              <Typography variant="h3" marginBottom={1}>
                <CaretRightOutlined /> Amenities
              </Typography>
              <Box padding="0 1em">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.hasWifi}
                      onChange={handleChange}
                      name="hasWifi"
                    />
                  }
                  label="Wifi"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.hasShower}
                      onChange={handleChange}
                      name="hasShower"
                    />
                  }
                  label="Shower"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.hasAircon}
                      onChange={handleChange}
                      name="hasAircon"
                    />
                  }
                  label="Air Conditioning"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.hasHeater}
                      onChange={handleChange}
                      name="hasHeater"
                    />
                  }
                  label="Heater"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.hasGrill}
                      onChange={handleChange}
                      name="hasGrill"
                    />
                  }
                  label="Grill"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.hasKitchen}
                      onChange={handleChange}
                      name="hasKitchen"
                    />
                  }
                  label="Kitchen"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.hasTV}
                      onChange={handleChange}
                      name="hasTV"
                    />
                  }
                  label="Television"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.hasRefrigerator}
                      onChange={handleChange}
                      name="hasRefrigerator"
                    />
                  }
                  label="Refrigerator"
                />
              </Box>
            </Box>
            <Stack direction='row' justifyContent='flex-end' alignItems='center' spacing={2} margin={2} >
              <Button>
                Back
              </Button>
              <AnimateButton>
                <LoadingButton
                  loading={isLoading}
                  disableElevation
                  disabled={isLoading}
                  loadingPosition="start"
                  fullWidth
                  type='submit'
                  variant="contained"
                  style={{ width: '120px' }}
                >
                  {isAddMode ? 'Create' : 'Edit'}
                </LoadingButton>
              </AnimateButton>
            </Stack>
          </form>
        </FormWrapper>
      </Grid>
    </Grid >
  );
};

export default RoomsForm;
