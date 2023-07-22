import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import useAuth from './useAuth';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { data: isLogin } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin /* 원래 대로 작동하는지 확인하기 위해 isLogined() 를 isLogin 변경합니다. */ ? (
          <Component {...props} />
        ) : (
          <Redirect to="/boardsignin">
            {alert('로그인 후 이용해 주세요')}
          </Redirect>
        )
      }
    />
  );
};

export default PrivateRoute;
