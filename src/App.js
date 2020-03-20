import React, { useState, useEffect } from "react";
import Login from "./Login/Login";
import Succes from "./Succes/Succes";
import { saveToken, getStoredToken } from "./Helpers/auth-helpers";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import { getAuth } from "./Helpers/auth-helpers";
import "./App.css";
import Http from "./Helpers/Http";

function App() {
    const [user, setUser] = useState(null);

    const getUser = async (id) => await Http.get(`/api/users/whoAmI/${id}`);

    const handleSetUser = async (token, userId) => {
        saveToken(token);
        const user = await getUser(userId);
        setUser(user);
    };

    useEffect(() => {
        (async () => {
            const res = await getAuth();
            if (res.auth) {
                const user = await getUser(res.data.id);
                setUser(user);
            } else {
                setUser(null);
            }
        })();
    }, []);

    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/" exact>
                        {user ? (
                            <Redirect to="/succes" />
                        ) : (
                            <Login handleSetUser={handleSetUser} user={user} />
                        )}
                    </Route>
                </Switch>
                <Switch>
                    <Route path="/succes">
                        {!user ? <Redirect to="/" /> : <Succes user={user} />}
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
