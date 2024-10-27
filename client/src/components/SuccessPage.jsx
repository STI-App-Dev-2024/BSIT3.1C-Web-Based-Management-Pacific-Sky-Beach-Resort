import React from 'react';
import { Box, Stack} from '@mui/material';
import { useNavigate } from 'react-router';
import Logo from './logo/LogoMain'; 
import 'src/styles/SuccessPage.css';

const SuccessPage = ({heading,message}) => {
  const navigate = useNavigate()
  return (
    <Box className='success-page-container'>
    <Stack justifyContent='center'  alignItems='center' display='flex' flexDirection='column' height='100dvh'>
    <Box >
        <Logo/>
    </Box>
    <Box >
        <h1>SUCCESS!</h1>
    </Box>   
    <Box >
        <h3>{heading}</h3>
        <p>{message}</p>
    </Box>
    <Box className='btn-section'display='flex' flexDirection='row' gap={1}>
         <h6 onClick={()=>navigate('/')}>Go to Home </h6> 
         <p >/</p>
         <h6 onClick={()=>navigate('/login')}>Go to Login </h6>
    </Box>
  </Stack>
  </Box>
)

};

export default SuccessPage;
