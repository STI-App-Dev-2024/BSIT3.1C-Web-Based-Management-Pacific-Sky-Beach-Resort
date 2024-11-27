import React from 'react';
import { Box, Container, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { HomeOutlined, SearchOutlined } from '@ant-design/icons/lib/icons';

// assets

import navItems from './nav-items/navItems';
import Logo from 'components/logo/LogoMain';

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        position: 'sticky',
        top: 0


      }}
    >
      <Container >
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Logo />
          </Box>
          <Stack direction="row" alignItems="center" spacing={5}>
            <HomeOutlined style={{ color: '#ffff' }} />
            {navItems.map((nav) => (
              <Box onClick={() => navigate(nav.link)} key={nav._id} sx={{ cursor: 'pointer' }}>
                <Typography variant="body1" color='#ffff'>{nav.name}</Typography>
              </Box>
            ))}
            <SearchOutlined style={{ color: '#ffff' }} />
          </Stack>
        </Stack>
      </Container>
    </Box >

  );
};

export default Navbar;
