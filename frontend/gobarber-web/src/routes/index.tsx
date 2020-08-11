import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import SignIn from "../pages/signin";
import SignUp from "../pages/signup";
import Dashboard from "../pages/dashboard";
import Route from "./Route";
import ForgotPassword from "../pages/forgotPassword";
import resetPassword from "../pages/resetPassword";

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={SignIn} path="/" exact />
        <Route component={SignUp} path="/signup" />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/reset-password" component={resetPassword} />
        <Route path="/dashboard" component={Dashboard} isPrivate />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
