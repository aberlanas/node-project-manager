import React, { useState } from "react";
import { Input, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { GiPadlock } from "react-icons/gi";
import "antd/dist/antd.css";
import "./Login.css";
import "../Utils/Http";
import Http from "../Utils/Http";

const HOST = "http://localhost:3000";
const HOSTWEB = "http://localhost:3001";

const Login = (props) => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = async () => {
        const data = await Http.post(
            { nickname:userName, password },
            `${HOST}/api/users/isValidUser`
        );
        console.log(data);

        
        const verifyToken = await Http.post(
            { token: data.token },
            `${HOST}/api/users/isValidToken`
        );

        if(verifyToken){
            props.logUser(data);
        }
    };

    return (
        <div className="login">
            <div className="title">
                <h3>Login</h3>
                <GiPadlock className="iconLogin" />
            </div>
            <Input
                size="large"
                placeholder="Introduce un usuario"
                prefix={<UserOutlined />}
                onBlur={e => setUserName(e.target.value)}
            />
            <Input.Password
                size="large"
                placeholder="Introuce una contraseña"
                className="inputPassword"
                onBlur={e => setPassword(e.target.value)}
            />
            <Button onClick={handleSignIn} className="btnLogin">
                Entrar
            </Button>
        </div>
    );
};

export default Login;
