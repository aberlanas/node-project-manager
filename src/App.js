import React, { useState, useEffect, useCallback } from "react";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import AdminUser from "./Components/AdminUser/AdminUser";
import Tecnologias from "./Components/Tecnologias/Tecnologias";
import Projects from "./Components/Projects/Projects";
import { whoAmI } from "./Helpers/auth-helpers";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import "./App.css";
import { Spin } from "antd";
import { connect } from "react-redux";
import { readUser } from "./Redux/Reducers/UserReducer";
import { logUser } from "./Redux/Actions/UserActions";

function App({ user, logUser }) {
  const [loading, setLoading] = useState(true);

  const replenishUser = useCallback (async () => {
    const data = await whoAmI();
    if (data.auth) {
      logUser(data.user);
    }
    setLoading(false);
  },[logUser]);

  useEffect(() => {
    // Wait for loading data user
    setLoading(true);
    replenishUser();
  },[replenishUser]);



  return !loading ? (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login" exact>
            {user ? <Redirect to="/" /> : <Login />}
          </Route>
          <Route path="/" exact>
            {!user ? <Redirect to="/login" /> : <Home />}
          </Route>
          <Route path="/Projects" exact>
            {!user ? <Redirect to="/login" /> : <Projects />}
          </Route>
          <Route path="/Tecnologias" exact>
            {!user ? <Redirect to="/login" /> : <Tecnologias />}
          </Route>
          <Route path="/AdminUser" exact>
            {user && user.admin ? <AdminUser /> : <Redirect to="/login" />}
          </Route>
        </Switch>
      </div>
    </Router>
  ) : (
    <Spin size="large" className="Spin" />
  );
}

const mapStateToProps = state => {
  return { user: readUser(state) };
};

export default connect(mapStateToProps, { logUser })(App);
