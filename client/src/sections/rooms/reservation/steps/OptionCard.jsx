import { BankOutlined } from '@ant-design/icons';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles'
import LabeledValue from 'components/LabeledValue';
import MainCard from 'components/MainCard';
import React, { useEffect, useState } from 'react';

const OptionCard = ({ logo, title, name, accNo, onSelect, isActive }) => {

  const handleSelect = () => {
    onSelect()
  };

  const theme = useTheme()

  return (
    <MainCard
      onClick={handleSelect}
      sx={{
        border: isActive ? `2px solid ${theme.palette.primary.main} !important` : '2px solid transparent',
        cursor: 'pointer',
        transition: 'border-color 0.3s',
        '&:hover': {
          border: `2px solid ${theme.palette.primary.main}`,
        },
      }}
    >
      <Box>
        <Box
          component="img"
          src={logo}
          sx={{
            width: '100%',
            height: '120px',
            objectFit: 'contain',
          }}
        />
        <Box marginBlock={2}>
          <Typography variant="h5" textAlign="center" marginBlock={2}>
            {title}
          </Typography>
          <LabeledValue
            title={name}
            subTitle={accNo}
            icon={<BankOutlined />}
          />
        </Box>
      </Box>
    </MainCard>
  );
};

export default OptionCard;
