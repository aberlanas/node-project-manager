import React, {useState} from "react";
import Login from "./Login/Login";
import Succes from "./Succes/Succes";
import Cookies from 'js-cookie'; 
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import "./App.css";

const HOST = 'http://localhost:3000';

function App() {
    const [hasValidToken, setHasValidToken] = useState(false);
    const [token, setToken] = useState("");

    const createToken = (token) => {
        Cookies.set('token', token);
        setHasValidToken(true);
        setToken(token);
    }

    const setValidToken = (valid) => {
        setHasValidToken(valid);
    }

    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/">
                        <Login setValidToken={setValidToken} hasValidToken={hasValidToken} createToken={createToken} />
                    </Route>
                </Switch>
                <Switch>
                    <Route path="/succes">
                        <Succes hasValidToken={hasValidToken} />}
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
