import React, { useState, useEffect } from "react";
import Login from "./Login/Login";
import Home from "./Home/Home";
import { saveToken, getStoredToken } from "./Helpers/auth-helpers";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import { getAuth,removeToken } from "./Helpers/auth-helpers";
import "./App.css";
import Http from "./Helpers/Http";
import { Spin } from 'antd';

function App() {
    const [user, setUser] = useState(null);
    const [loading,setLoading] = useState(true);

    const getUser = async (id) => await Http.get(`/api/users/whoAmI/${id}`);

    const handleSetUser = async (token, userId) => {
        saveToken(token);
        const user = await getUser(userId);
        setUser(user);
    };

    const logOutUser = () =>{
        removeToken();
        setUser(null);
    }

    useEffect(() => {

        // Wait for loading data user
        setLoading(true);

        (async () => {
            const res = await getAuth();
            if (res.auth) {
                const user = await getUser(res.data.id);
                setUser(user);
            } else {
                setUser(null);
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
                            <Login handleSetUser={handleSetUser} user={user} />
                        )}
                    </Route>
                </Switch>
                <Switch>
                    <Route path="/">
                        {!user ? <Redirect to="/login" /> : <Home logOutUser={logOutUser} user={user} />}
                    </Route>
                </Switch>
            </div>
        </Router>
        
        ): <Spin size="large" className="Spin"/>
         
    );
}

export default App;
