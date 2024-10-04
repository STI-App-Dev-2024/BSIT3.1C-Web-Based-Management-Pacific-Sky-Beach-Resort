import React from 'react';
import { Box, Container, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { HomeOutlined, SearchOutlined } from '@ant-design/icons/lib/icons';

// assets
import logo from 'src/assets/images/logo/logo.jpg';
import navItems from './nav-items/navItems';

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
          <Box
            onClick={() => navigate('/')} 
            component="img"
            src={logo}
            sx={{
              width: 50,
              height: 50,
              borderRadius: 50,
              objectFit: 'cover'
            }}
          />
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
