import React from "react";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  
  const renderdComponent = (props) => {
    const { location } = props;
    return isAuthenticated ? (
      <Component {...props} />
    ) : (
      <Redirect
        to={{
          pathname: "/dash-board",
          state: {
            from: location,
          },
        }}
      />
    );
  };
  return <Route {...rest} component={renderdComponent} />;
};

export default ProtectedRoute;
