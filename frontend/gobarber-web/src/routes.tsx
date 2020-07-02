import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";

const Routes = () => {
  return (
    <BrowserRouter>
      <Route component={SignIn} path="/" exact />
      <Route component={SignUp} path="/signup" />
    </BrowserRouter>
  );
};

export default Routes;
