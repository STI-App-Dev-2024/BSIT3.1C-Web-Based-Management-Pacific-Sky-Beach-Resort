import React from 'react';
import { Box, Container, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { HomeOutlined, SearchOutlined } from '@ant-design/icons/lib/icons';

// assets

import navItems from './nav-items/navItems';

import Logo from 'components/logo/LogoMain';

const Navbar = ({ isHomepage }) => {

  const navigate = useNavigate();

  const middleIndex = Math.floor(navItems.length / 2);
  return (
    <Stack
      sx={{
        position: isHomepage ? 'fixed' : 'sticky',
        top: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingInline: 20,
        alignItems: 'center',
        zIndex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',

      }}

    >
      {navItems.map((nav, index) => (
        <React.Fragment key={nav._id}>
          <Stack
            onClick={() => navigate(nav.link)}
            sx={{ cursor: 'pointer' }}
          >
            <Typography

              style={{ fontWeight: 'bold' }}
              variant="body2"
              color="#ffff"
            >
              {nav.name}
            </Typography>
          </Stack>

          {index === middleIndex - 1 && (
            <Stack
              onClick={() => navigate('/')}
              sx={{ cursor: 'pointer' }}
            >
              {<Logo />}
            </Stack>
          )}
        </React.Fragment>
      ))}
    </Stack>




  );
}

export default Navbar;
