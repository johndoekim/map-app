import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import isLogined from './isLogined';

const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            isLogined() ?
                <Component {...props} />
            : <Redirect to="/boardsignin">{alert('로그인 후 이용해 주세요')}</Redirect>
        )} />
    );
};

export default PrivateRoute;