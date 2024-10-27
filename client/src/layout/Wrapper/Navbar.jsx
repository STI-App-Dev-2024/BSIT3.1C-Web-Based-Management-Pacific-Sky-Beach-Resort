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
        backgroundColor: '#fff',
        p: 2
      }}
    >
      <Container>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Logo />
          </Box>
          <Stack direction="row" alignItems="center" spacing={2}>
            <HomeOutlined />
            {navItems.map((nav) => (
              <Box onClick={() => navigate(nav.link)} key={nav._id} sx={{ cursor: 'pointer' }}>
                <Typography variant="caption">{nav.name}</Typography>
              </Box>
            ))}
            <SearchOutlined />
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Navbar;
