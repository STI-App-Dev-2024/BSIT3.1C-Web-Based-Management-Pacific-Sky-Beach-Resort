import { InfoCircleOutlined } from '@ant-design/icons'
import { Alert, Button, Grid, Stack, Tooltip, Typography } from '@mui/material'
import SingleFileUpload from 'components/third-party/dropzone/FileUpload'
import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import OptionCard from './OptionCard'
import { BDO_ACC, GCASH_ACC } from 'constants/constants'
import AnimateButton from 'components/@extended/AnimateButton'
import LoadingButton from 'components/@extended/LoadingButton'
import { useSnackbar } from 'contexts/SnackbarContext'
import agent from 'api'
import { useNavigate, useParams } from 'react-router'
import * as Yup from 'yup'

const PaymentStep = ({
  activeStep,
  handleBack,
  handleClose
}) => {

  const { openSnackbar } = useSnackbar()

  const navigate = useNavigate()

  const { roomId } = useParams()

  const paymentMethod = localStorage.getItem('paymentMethod')

  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (paymentMethod === 'GCASH') {
      setData(GCASH_ACC)
    } else {
      setData(BDO_ACC)
    }
  }, [paymentMethod])

  const {
    name,
    title,
    accNo,
    logo
  } = data || {}

  const validationSchema = Yup.object().shape({
    reservationProof: Yup.mixed().required('Proof of transaction is required.')
  })

  return (
    <React.Fragment>
      <Alert severity='warning'>
        Please pay the minimum reservation fee of 1000 PHP for admin approval. Amounts below this will be denied.
      </Alert>
      <Grid container spacing={2} marginBlock={2}>
        <Grid item md={6}>
          <OptionCard
            name={name}
            title={title}
            accNo={accNo}
            logo={logo}
            isActive={true}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} marginBottom={2}>
        <Grid item xs={12} sm={12} md={12}>
          <Typography>Proof of transaction (Required)
            <span style={{ marginInline: '.5em' }}>
              <Tooltip
                title='Kindly attach the proof of transaction, including the reference number, for the money transfer.'
              >
                <InfoCircleOutlined style={{ color: 'blue' }} />
              </Tooltip>
            </span>
          </Typography>
          <Formik
            initialValues={{ reservationProof: '' }}
            validationSchema={validationSchema}
            onSubmit={async (data) => {
              setLoading(true)
              try {
                const formData = new FormData();

                const customerData = JSON.parse(localStorage.getItem('customerData'))
                const values = { roomId, ...customerData, ...data }

                Object.keys(values).forEach((key) => {
                  if (key === 'reservationProof' && values[key].length > 0) {
                    formData.append('reservationProof', values[key][0]);
                  } else {
                    formData.append(key, values[key]);
                  }
                });

                await agent.BookRooms.bookRooms(formData)

                const items = ['customerData', 'paymentMethod']
                for (const item of items) {
                  localStorage.removeItem(item)
                }

                handleClose()
                navigate('/success/booking-room')

              } catch (error) {
                openSnackbar({
                  message: error?.message,
                  anchorOrigin: { vertical: 'top', horizontal: 'right' },
                  alert: { color: 'error' },
                  duration: 6000,
                });
              } finally {
                setLoading(false)
              }

            }}
          >
            {({ values, errors, setFieldValue, handleSubmit }) => (
              <React.Fragment>
                <SingleFileUpload
                  fieldName="reservationProof"
                  file={values.reservationProof}
                  setFieldValue={setFieldValue}
                  error={errors.reservationProof}
                  sx={{ width: "500px" }}
                />
                <Stack direction="row" justifyContent="space-between" padding="16px">
                  <Button disabled={activeStep === 0} onClick={handleBack}>
                    Back
                  </Button>
                  {activeStep !== 0 && (
                    <AnimateButton>
                      <LoadingButton
                        disableElevation
                        loading={loading}
                        disabled={loading || !values.reservationProof}
                        loadingPosition="start"
                        variant="contained"
                        sx={{ my: 3, ml: 1 }}
                        onClick={() => {
                          handleSubmit(values)
                        }}
                      >
                        Book Reservation
                      </LoadingButton>
                    </AnimateButton>
                  )}
                </Stack>
              </React.Fragment>
            )}
          </Formik>
        </Grid>
      </Grid>
    </React.Fragment >
  )
}

export default PaymentStep
