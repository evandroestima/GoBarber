import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import SignIn from "../pages/signin";
import SignUp from "../pages/signup";
import Dashboard from "../pages/dashboard";
import Route from "./Route";

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={SignIn} path="/" exact />
        <Route component={SignUp} path="/signup" />
        <Route path="/dashboard" component={Dashboard} isPrivate />}
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
