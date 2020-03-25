import React, { useState, useEffect } from "react";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import { whoAmI } from "./Helpers/auth-helpers";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import "./App.css";
import { Spin } from 'antd';
import { connect } from 'react-redux';
import { readUser} from './Redux/Reducers/UserReducer';
import { logUser } from './Redux/Actions/UserActions';


function App({user,logUser}) {
    
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        // Wait for loading data user
        setLoading(true);

        (async () => {
            const data = await whoAmI();
            if (data.auth) {
                logUser(data.user);
            }
            setLoading(false);
        })();

    }, []);

    return (
        (!loading) ? (
        <Router>
            <div className="App">
            
                <Switch>
                    <Route path="/login" exact>
                        {user ? (
                            <Redirect to="/" />
                        ) : (
                            <Login/>
                        )}
                    </Route>
                </Switch>
                <Switch>
                    <Route path="/">
                        {!user ? <Redirect to="/login" /> : <Home/>}
                    </Route>
                </Switch>
            </div>
        </Router>
        
        ): <Spin size="large" className="Spin"/>
         
    );
}

const mapStateToProps = (state) =>{
    return {user:readUser(state)};
}

export default connect(mapStateToProps,{logUser})(App);
