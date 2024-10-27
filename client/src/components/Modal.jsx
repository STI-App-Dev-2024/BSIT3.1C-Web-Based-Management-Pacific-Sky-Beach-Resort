import React, { forwardRef } from 'react';

import { Box, Modal } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const PacificModal = forwardRef(({ open, onClose, children, sx, ...others }, ref) => {
  const theme = useTheme();

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'fit-content',
    bgcolor: 'background.paper',
    zIndex: 1300,
    pt: 3,
    px: 4,
    pb: 4,
    [theme.breakpoints.down('sm')]: {
      width: '90%'
    }
  };

  return (
    <React.Fragment>
      {open && (
        <Modal open={open} onClose={onClose} {...others}>
          <Box sx={{ ...style, ...sx }}>{children}</Box>
        </Modal>
      )}
    </React.Fragment>
  );
});

export default PacificModal;
