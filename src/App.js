import React, { useState, useEffect, useCallback } from "react";
import { whoAmI } from "./Helpers/auth-helpers";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

// Components
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import AdminUser from "./Components/AdminUser/AdminUser";
import Tecnologias from "./Components/Tecnologias/Tecnologias";
import Projects from "./Components/Projects/Projects";
import Reports from "./Components/Reports/Reports";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";

// Css
import "./App.css";

// Antd 
import { Spin } from "antd";

// Redux
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
            {user ? <Redirect to="/Home" /> : <Login />}
          </Route>

          <PrivateRoute path="/Home" component={Home} exact/>
          <PrivateRoute path="/Projects" component={Projects} exact/>
          <PrivateRoute path="/Tecnologias" component={Tecnologias} exact/>
          <PrivateRoute path="/AdminUser" component={AdminUser} exact/>
          <PrivateRoute path="/Informes" component={Reports} exact/>
          <Route path="/" ><Redirect to="/login" /></Route>
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
