import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...rest }) => {
    return <Route
            {...rest}
            render={props => rest.isLogged ?
                // If user has "access_token" stored, go to the component,
                // else, redirect to Login page, passing where user came 'from'
                <Component {...props} /> :
                <Redirect to={{ 
                    pathname: "/login",
                    state: { from: props.location }
                }} />}
        />
}
