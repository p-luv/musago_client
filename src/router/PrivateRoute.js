import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../contexts/Auth';

const PrivateRouter = ({ component: RouteComponent, ...rest }) => {
  const { token } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (token) {
          return <RouteComponent {...props} />;
        }
        return (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
};

export default PrivateRouter;
