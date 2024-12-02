import React, { useEffect } from "react";
import { Button, Grid, Stack, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Formik } from "formik";
import FormikTextInput from "components/@extended/FormikTextInput";
import FormWrapper from "components/FormWrapper";
import LoadingButton from "components/@extended/LoadingButton";
import AnimateButton from "components/@extended/AnimateButton";

const ReservationForm = ({
  customerData,
  setCustomerData,
  activeStep,
  steps,
  handleNext,
  handleBack
}) => {
  return (
    <Formik
      initialValues={customerData}
      enableReinitialize
      onSubmit={(values) => {
        localStorage.setItem("customerData", JSON.stringify(values));
        setCustomerData(values)
        handleNext();
      }}
    >
      {({ values, setFieldValue, handleSubmit }) => (
        <FormWrapper title="Reservation Form" caption="All fields are required.">
          <Grid container spacing={2} marginBottom={2}>
            <Grid item xs={12} sm={12} md={6}>
              <Typography>First Name (Required)</Typography>
              <FormikTextInput
                name="customerFirstName"
                placeholder="e.g John"
                variant="outlined"
                value={customerData?.customerFirstName}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Typography>Last Name (Required)</Typography>
              <FormikTextInput
                name="customerLastName"
                placeholder="e.g Doe"
                variant="outlined"
                value={customerData?.customerLastName}
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
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Typography>Phone Number (Required)</Typography>
              <FormikTextInput
                name="customerPhone"
                placeholder="e.g 09xxxxxxxxx"
                variant="outlined"
                value={customerData?.customerPhone}
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
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Typography>Check Out (Required)</Typography>
                <DatePicker
                  value={values.endDate}
                  onChange={(newValue) => {
                    setFieldValue("endDate", newValue);
                  }}
                  sx={{ width: "100%" }}
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
                  disabled={false}
                  loadingPosition="start"
                  variant="contained"
                  sx={{ my: 3, ml: 1 }}
                  onClick={() => {
                    handleSubmit(values)
                    handleNext()
                  }}
                >
                  {activeStep === steps.length - 1 ? 'Book Reservation' : 'Next'}
                </LoadingButton>
              </AnimateButton>
            )}
          </Stack>
        </FormWrapper>
      )}
    </Formik>
  );
};

export default ReservationForm;
