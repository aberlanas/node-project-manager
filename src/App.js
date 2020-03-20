import React, {useState} from "react";
import Login from "./Login/Login";
import Succes from "./Succes/Succes";

import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import "./App.css";

function App() {
    const [user,setUser] = useState({token:"invalid"});
    const logUser = (userRecived) => {
        setUser(userRecived);
    }
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/">
                        {user.token==="invalid" ? <Login logUser={logUser} /> : <Redirect to="/succes" />}
                    </Route>
                </Switch>
                <Switch>
                    <Route path="/succes">
                        {user.token==="invalid" ? <Redirect to="/" /> : <Succes user={user} />}
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
