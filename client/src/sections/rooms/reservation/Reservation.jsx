import React, { useState } from "react";
import { Dialog, Typography, Stepper, Step, StepLabel, Box } from "@mui/material";
import PaymentOptions from "./steps/PaymentOptions";
import ReservationForm from "./steps/ReservationForm";
import PaymentStep from "./steps/PaymentStep";

const steps = ["Step 1: Choose where to pay", "Step 2: Fill out the form", "Step 3: Make the payment"];

const customer = {
  customerFirstName: "",
  customerLastName: "",
  customerEmail: "",
  customerPhone: "",
  customerAddress: "",
  startDate: null,
  endDate: null,
};

const proof = {
  reservationProof: [],
}

const Reservation = ({ open, onClose }) => {
  const [activeStep, setActiveStep] = useState(0);

  const [customerData, setCustomerData] = useState(customer)
  const [proofData, setProofData] = useState(proof)

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const renderStepContent = (
    step,
    customerData,
    setCustomerData,
    proofData,
    setProofData,
    handleNext,
    handleBack,
  ) => {
    switch (step) {
      case 0:
        return (
          <PaymentOptions
            onSelect={handleNext}
          />
        )
      case 1:
        return (
          <ReservationForm
            handleNext={handleNext}
            customerData={customerData}
            setCustomerData={setCustomerData}
            activeStep={activeStep}
            steps={steps}
            handleBack={handleBack}
          />
        );
      case 2:
        return <PaymentStep
          proof={proofData}
          setProof={setProofData}
          handleNext={handleNext}
          activeStep={activeStep}
          steps={steps}
          handleBack={handleBack}
          handleClose={onClose}
        />;
      default:
        return <Typography>Unknown Step</Typography>;
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <Box padding={5}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ padding: "16px" }}>{
          renderStepContent(
            activeStep,
            customerData,
            setCustomerData,
            proofData,
            setProofData,
            handleNext,
            handleBack
          )
        }
        </Box>
      </Box>
    </Dialog>
  );
};

export default Reservation;
