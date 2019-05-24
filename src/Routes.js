import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Products from "./containers/Products";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import AddProduct from "./containers/AddProduct";
import NotFound from "./containers/NotFound";
import AppliedRoute from "./components/AppliedRoute";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import Settings from "./containers/Settings";


export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <UnauthenticatedRoute path="/login" exact component={Login} props={childProps} />
    <UnauthenticatedRoute path="/signup" exact component={Signup} props={childProps} />
    <AuthenticatedRoute path="/settings" exact component={Settings} props={childProps} />
    <AuthenticatedRoute path="/products/new" exact component={AddProduct} props={childProps} />
    <AuthenticatedRoute path="/products/:id" exact component={Products} props={childProps} />
    { /* Finally, catch all unmatched routes */}
    <Route component={NotFound} />
  </Switch>

