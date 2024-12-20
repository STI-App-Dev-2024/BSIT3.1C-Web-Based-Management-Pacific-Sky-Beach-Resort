import { React } from 'mdi-material-ui';
import logo from 'src/assets/images/logo/logo.png';
import logoWithText from 'src/assets/images/logo/logo-with-text.png';

// ==============================|| LOGO SVG ||============================== //

const Logo = ({ isWithText = true }) => (
  <img src={isWithText ? logoWithText : logo} alt="Mantis" style={{ height: '100px', objectFit: 'cover', paddingBlock: 5 }} />
)

export default Logo;
