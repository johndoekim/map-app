import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import useAuth from './useAuth';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isLogin, refetch } = useAuth();

  const renderContent = (props) => {
    if (isLogin) {
      return <Component {...props} />;
    } else {
      refetch();
      alert('로그인 후 이용해 주세요');
      return (
        <Redirect
          to={{
            pathname: '/boardsignin',
            state: { from: props.location },
          }}
        />
      );
    }
  };

  return <Route {...rest} render={renderContent} />;



  
};

export default PrivateRoute;
