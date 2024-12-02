import React from 'react'
import { Grid, Typography } from '@mui/material'
import OptionCard from './OptionCard'

const PaymentOptions = ({ onSelect }) => {

  const handleSelect = (method) => {
    localStorage.setItem('paymentMethod', method)
  }

  const paymentMethod = localStorage.getItem('paymentMethod')

  const checkIfActive = (name1, name2) => {
    return name1 === name2;
  };

  return (
    <React.Fragment>
      <Typography marginBottom={2}>
        Please select a payment method you want to proceed with.
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6}>
          <OptionCard
            name="Ailene Dadis"
            title="GCash Transfer"
            accNo='09128909447'
            logo="https://logohistory.net/wp-content/uploads/2023/08/GCash-Logo.png"
            onSelect={() => {
              handleSelect('GCASH')
              onSelect()
            }}
            isActive={checkIfActive(paymentMethod, 'GCASH')}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <OptionCard
            name="Ailene Dadis"
            title="Banco De Oro Transfer"
            logo="https://th.bing.com/th/id/OIP.AhWwLsRf4hH7mr7dYlhHRQHaCl?rs=1&pid=ImgDetMain"
            accNo='007700257814'
            onSelect={() => {
              handleSelect('BDO')
              onSelect()
            }}
            isActive={checkIfActive(paymentMethod, 'BDO')}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default PaymentOptions