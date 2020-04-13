// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import React from "react";
import { logIn, whoAmI } from "../../Helpers/auth-helpers";
import { Redirect, Route } from "react-router-dom";

import { connect } from "react-redux";

import { readUser } from "../../Redux/Reducers/UserReducer";
import { logOutUser } from "../../Redux/Actions/UserActions";
import { logout as deleteCookie } from "../../Helpers/auth-helpers";

const PrivateRoute = ({ component: Component, user, ...rest }) => {
  // Add your own authentication on the below line.
  const isLoggedIn = true;

  if (!isLoggedIn) {
    logOutUser();
    deleteCookie();
  }
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

const mapStateToProps = (state) => {
  return { user: readUser(state) };
};

export default connect(mapStateToProps, { logOutUser })(PrivateRoute);
