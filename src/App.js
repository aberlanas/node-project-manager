import React from "react";
import Login from "./Login/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/" component={Login} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
