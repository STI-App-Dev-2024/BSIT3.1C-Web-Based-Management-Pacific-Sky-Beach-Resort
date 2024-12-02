import React, { useState } from 'react'
import { Stack, Typography, Drawer, IconButton, List, ListItem, ListItemText, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import useMediaQuery from '@mui/material/useMediaQuery'

// assets
import navItems from './nav-items/navItems'
import Logo from 'components/logo/LogoMain'

const Navbar = () => {
  const navigate = useNavigate()
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'))
  const [drawerOpen, setDrawerOpen] = useState(false)

  const handleDrawerToggle = () => {
    setDrawerOpen((prevState) => !prevState)
  };

  const middleIndex = Math.floor(navItems.length / 2)

  return (
    <React.Fragment>
      {!isMobile ? (

        <Stack
          sx={{
            position: 'sticky',
            top: 1,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingInline: 20,
            alignItems: 'center',
            zIndex: 10,
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          }}
        >
          {navItems.map((nav, index) => (nav.name !== 'Login' ? (
            <React.Fragment key={nav._id}>
              <Stack onClick={() => navigate(nav.link)} sx={{ cursor: 'pointer' }}>
                <Typography style={{ fontWeight: 'bold' }} variant="body2" color="#fff">
                  {nav.name}
                </Typography>
              </Stack>
              {index === middleIndex - 1 && (
                <Stack onClick={() => navigate('/')} sx={{ cursor: 'pointer' }}>
                  <Logo />
                </Stack>
              )}
            </React.Fragment>
          ) : null
          ))}
          <Button
            variant='contained'
            sx={{ borderRadius: 2 }}
            onClick={() => {
              navigate('/login');
              setDrawerOpen(false);
            }}
          >
            Login
          </Button>

        </Stack>
      ) : (
        // Mobile Navbar
        <Stack
          sx={{
            position: 'sticky',
            top: 0,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 1,
            paddingInline: 2,
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          }}
        >
          <IconButton onClick={handleDrawerToggle} sx={{ color: '#fff' }}>
            <MenuIcon />
          </IconButton>
          <Stack onClick={() => navigate('/')} sx={{ cursor: 'pointer' }}>
            <Logo />
          </Stack>
        </Stack>
      )}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        PaperProps={{
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            padding: 2,
          },
        }}
      >
        <List sx={{ width: 250, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {navItems.map((nav) => (
            nav.name !== 'Login' ? (
              <ListItem
                sx={{
                  textAlign: 'center',
                  cursor: 'pointer',
                  '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.1)' },
                }}
                button
                key={nav._id}
                onClick={() => {
                  navigate(nav.link);
                  setDrawerOpen(false);
                }}
              >
                <ListItemText
                  primary={
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#fff' }}>
                      {nav.name}
                    </Typography>
                  }
                />
              </ListItem>
            ) : null
          ))}
        </List>
        <Stack
          sx={{
            padding: 2,
            borderTop: '1px solid #fff',
            marginTop: 'auto',
            textAlign: 'center',
          }}
        >
          <Button
            variant='contained'
            sx={{ borderRadius: 2 }}
            onClick={() => {
              navigate('/login');
              setDrawerOpen(false);
            }}
          >
            Login
          </Button>
        </Stack>
      </Drawer>
    </React.Fragment>
  );
};

export default Navbar;
