import React, { useEffect } from "react";
import { Button, Grid, Stack, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Formik } from "formik";
import FormikTextInput from "components/@extended/FormikTextInput";
import FormWrapper from "components/FormWrapper";
import LoadingButton from "components/@extended/LoadingButton";
import AnimateButton from "components/@extended/AnimateButton";
import dayjs from "dayjs";
import * as Yup from "yup";

const ReservationForm = ({
  customerData,
  setCustomerData,
  activeStep,
  steps,
  handleNext,
  handleBack,
  bookings
}) => {
  const getDisabledDates = (startDate, endDate) => {
    const start = dayjs(startDate);
    const end = dayjs(endDate);
    const disabledDates = [];
    let currentDate = start;

    while (currentDate <= end) {
      disabledDates.push(currentDate.format("YYYY-MM-DD"));
      currentDate = currentDate.add(1, "day");
    }

    return disabledDates;
  };

  const validationSchema = Yup.object({
    customerFirstName: Yup.string().required("First Name is required"),
    customerLastName: Yup.string().required("Last Name is required"),
    customerEmail: Yup.string().email("Invalid email address").required("Email is required"),
    customerPhone: Yup.string().matches(
      /^[0-9]{11}$/,
      "Phone number must be 11 digits"
    ).required("Phone Number is required"),
    customerAddress: Yup.string().required("Address is required"),
    startDate: Yup.date().required("Check In date is required"),
    endDate: Yup.date().required("Check Out date is required")
      .min(Yup.ref('startDate'), "Check Out date must be after Check In date")
  });

  return (
    <Formik
      initialValues={customerData}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={(values) => {
        localStorage.setItem("customerData", JSON.stringify(values));
        setCustomerData(values);
        handleNext();
      }}
    >
      {({ values, setFieldValue, handleSubmit, isValid, errors, touched }) => {
        const disabledDates = bookings
          ?.filter((booking) => booking.isReserved === true || booking.isReserved === 1)
          .flatMap((booking) =>
            getDisabledDates(booking.startDate, booking.endDate)
          );

        return (
          <FormWrapper title="Reservation Form" caption="All fields are required.">
            <Grid container spacing={2} marginBottom={2}>
              <Grid item xs={12} sm={12} md={6}>
                <Typography>First Name (Required)</Typography>
                <FormikTextInput
                  name="customerFirstName"
                  placeholder="e.g John"
                  variant="outlined"
                  value={customerData?.customerFirstName}
                  error={touched.customerFirstName && Boolean(errors.customerFirstName)}
                  helperText={touched.customerFirstName && errors.customerFirstName}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Typography>Last Name (Required)</Typography>
                <FormikTextInput
                  name="customerLastName"
                  placeholder="e.g Doe"
                  variant="outlined"
                  value={customerData?.customerLastName}
                  error={touched.customerLastName && Boolean(errors.customerLastName)}
                  helperText={touched.customerLastName && errors.customerLastName}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} marginBottom={2}>
              <Grid item xs={12} sm={12} md={6}>
                <Typography>Email Address (Required)</Typography>
                <FormikTextInput
                  name="customerEmail"
                  placeholder="e.g john.doe@gmail.com"
                  variant="outlined"
                  value={customerData?.customerEmail}
                  error={touched.customerEmail && Boolean(errors.customerEmail)}
                  helperText={touched.customerEmail && errors.customerEmail}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Typography>Phone Number (Required)</Typography>
                <FormikTextInput
                  name="customerPhone"
                  placeholder="e.g 09xxxxxxxxx"
                  variant="outlined"
                  value={customerData?.customerPhone}
                  error={touched.customerPhone && Boolean(errors.customerPhone)}
                  helperText={touched.customerPhone && errors.customerPhone}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} marginBottom={2}>
              <Grid item xs={12} sm={12} md={12}>
                <Typography>Address (Required)</Typography>
                <FormikTextInput
                  name="customerAddress"
                  placeholder="Enter your address."
                  variant="outlined"
                  isTextArea
                  value={customerData?.customerAddress}
                  error={touched.customerAddress && Boolean(errors.customerAddress)}
                  helperText={touched.customerAddress && errors.customerAddress}
                />
              </Grid>
            </Grid>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Grid container spacing={2} marginBottom={2}>
                <Grid item xs={12} sm={12} md={6}>
                  <Typography>Check In (Required)</Typography>
                  <DatePicker
                    value={values.startDate}
                    onChange={(newValue) => {
                      setFieldValue("startDate", newValue);
                    }}
                    sx={{ width: "100%" }}
                    disablePast
                    shouldDisableDate={(date) => {
                      return (
                        disabledDates?.includes(date.format("YYYY-MM-DD"))
                      );
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <Typography>Check Out (Required)</Typography>
                  <DatePicker
                    disabled={!values.startDate}
                    disablePast
                    value={values.endDate}
                    onChange={(newValue) => {
                      setFieldValue("endDate", newValue);
                    }}
                    minDate={values.startDate}
                    sx={{ width: "100%" }}
                    shouldDisableDate={(date) => {
                      return (
                        disabledDates?.includes(date.format("YYYY-MM-DD"))
                      );
                    }}
                  />
                </Grid>
              </Grid>
            </LocalizationProvider>
            <Stack direction="row" justifyContent="space-between" padding="16px">
              <Button disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>
              {activeStep !== 0 && (
                <AnimateButton>
                  <LoadingButton
                    disableElevation
                    loading={false}
                    disabled={!isValid}
                    loadingPosition="start"
                    variant="contained"
                    sx={{ my: 3, ml: 1 }}
                    onClick={() => {
                      handleSubmit(values);
                      handleNext();
                    }}
                  >
                    {activeStep === steps.length - 1
                      ? "Book Reservation"
                      : "Next"}
                  </LoadingButton>
                </AnimateButton>
              )}
            </Stack>
          </FormWrapper>
        );
      }}
    </Formik>
  );
};

export default ReservationForm;
