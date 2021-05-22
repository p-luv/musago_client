import React, { useContext } from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';
import { AuthContext } from '../contexts/Auth';

const PrivateRouter = ({ component: RouteComponent, ...rest }) => {
  const { userInfo, loading } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (1) {
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
