import React, {useState} from "react";
import Login from "./Login/Login";
import Succes from "./Succes/Succes";

import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import "./App.css";

import Cookies from 'js-cookie'; 
const HOST = 'http://localhost:3000';

function App() {
    const [hasValidToken, setHasValidToken] = useState(false);
    const [token, setToken] = useState("");

    // const isAuth = () => {
    //     // const tokenCookie = Cookies.get('token');

    //     if (hasValidToken) {
    //         const token = Http.post(
    //             { token },
    //             `${HOST}/users/isValidToken`
    //         );
    //         // validar token
    //     }
    // }

    const createToken = (token) => {
        Cookies.set('token', token);
        console.log(token);
        setHasValidToken(true);
        setToken(token);
    }

    const setValidToken = () => {
        setHasValidToken(true);
    }

    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/">
                        {/* {user.token==="invalid" ? <Login logUser={logUser} /> : <Redirect to="/succes" />} */}
                        <Login setValidToken={setValidToken} hasValidToken={hasValidToken} createToken={createToken} />
                    </Route>
                </Switch>
                <Switch>
                    <Route path="/succes">
                        {/* {user.token==="invalid" ? <Redirect to="/" /> : <Succes user={user} />} */}
                        <Succes hasValidToken={hasValidToken} />}
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
