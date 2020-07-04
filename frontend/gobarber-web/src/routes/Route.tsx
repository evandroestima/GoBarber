import React from "react";
import { useAuth } from "../hooks/Auth";
import {
  RouteProps as ReactDOMRouteProps,
  Route as ReacDOMRoute,
  Redirect,
} from "react-router-dom";

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

// true/true = ok
// true/false = redirecionar para o login
// false/true = redirecionar com o dashboard
// false/false = ok

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <ReacDOMRoute
      {...rest}
      //location é pra pegar o histórico
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? "/" : "/dashboard",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
