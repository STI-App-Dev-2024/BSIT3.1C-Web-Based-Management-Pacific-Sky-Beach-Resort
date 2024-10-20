import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase } from '@mui/material';
import Stack from '@mui/material/Stack';

// project import
import Logo from './LogoMain';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = ({ sx }) => {
  return (
    <ButtonBase disableRipple component={Link} to='/' sx={sx}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Logo />
      </Stack>
    </ButtonBase>
  );
};

LogoSection.propTypes = {
  sx: PropTypes.object,
  to: PropTypes.string
};

export default LogoSection;
