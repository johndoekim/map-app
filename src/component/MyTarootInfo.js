import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { styled } from '@mui/system';
import { useHistory } from 'react-router-dom';
import useAuth from './useAuth';
import { FetchRoutes } from './FetchRoutes';
import { useQuery } from 'react-query';


const MyTarootInfo = () => {
    const history = useHistory();
    const { isLogin } = useAuth();
    const { data: routeInfo, isLoading, isError } = useQuery('routeInfo', FetchRoutes, {
      enabled: isLogin,
      retry: false,
    });
  

    const redirectToLogin = () => {
        if (!isLogin) {
          history.push('/boardsignin');
        }
      };
    

      const totalDistance = routeInfo
      ? routeInfo.reduce((acc, route) => acc + route.workout_distance, 0)
      : 0;
    const numberOfRoutes = routeInfo ? routeInfo.length : 0;

  return (

    <>

    
    <SidebarWrapper isLogin={isLogin} onClick={redirectToLogin}>
      <Typography variant="h5" component="div" sx={{ marginBottom: '1rem', fontSize: '1.5rem' }}>
        {sessionStorage.getItem('nickname')} 님
      </Typography>

      <Typography variant="body1" component="div" sx={{ marginBottom: '1rem', fontSize: '1rem' }}>
        {(totalDistance / 1000).toFixed(2)} km 달리셨네요
      </Typography>

      <Typography variant="body1" component="div" sx={{ marginBottom: '1rem', fontSize: '1rem' }}>
        {numberOfRoutes} 개의 루트!
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          marginBottom: '1rem',
        }}
      >
        <Typography variant="h6" component="div" sx={{ fontSize: '1.25rem' }}>
          달성과제
        </Typography>

        <Grid
          container
          sx={{
            width: '100%',
            paddingTop: '1rem',
            gap: '1rem',
            justifyContent: 'center',
          }}
        >
          {/* 여기에 메달 이미지를 추가해주세요 */}
        </Grid>
      </Box>
    </SidebarWrapper>


</>
  );
};



const SidebarWrapper = styled(Box)`

position: fixed;
left: 0;
display: flex;
flex-direction: column;
align-items: center;
top : 80px;
height: 500px;
width: 250px;
padding: 1rem;
box-sizing: border-box;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
filter: ${({ isLogin }) => (isLogin ? 'none' : 'blur(4px)')};

@media (max-width: 768px) {
  width: 200px;
}

@media (max-width: 480px) {
  width: 150px;
}
`;


export default MyTarootInfo;
