import React, { useState } from "react";
import { Input, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { GiPadlock } from "react-icons/gi";
import "antd/dist/antd.css";
import "./Login.css";
import Http from "../Helpers/Http"; 
import { getAuth, saveToken } from '../Helpers/auth-helpers';

const Login = ({ handleSetUser, user }) => {
    const [userName, setUserName] = useState("admin");
    const [password, setPassword] = useState("admin");

    const handleSignIn = async () => {
        const data = await Http.post(
            { nickname: userName, password },
            '/api/users/isValidUser'
        );

        if (data.token) {
            saveToken(data.token);
            const res = await getAuth();
            
            if (res.auth) {
                handleSetUser(data.token, res.data.id);
            }
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
