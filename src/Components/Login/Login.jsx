import React, { useState } from "react";
import { Input, Button, Alert } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { GiPadlock } from "react-icons/gi";
import "antd/dist/antd.css";
import "./Login.css";
import { logIn, whoAmI } from '../../Helpers/auth-helpers';
import { connect } from 'react-redux';
import { logUser } from '../../Redux/Actions/UserActions';

const Login = ({logUser}) => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState(null);

    const handleSignIn = async () => {
        const data = await logIn({
            nickname: userName, 
            password: password
        });

        if (data.succes) {
            const data = await whoAmI();
            if (data.auth) {
                logUser(data.user);
            }
        }
        else {
            setErrorMsg(data.message);
        }
        
    };

    const enterPressed = (event) => {
        if(event.key === "Enter"){
            handleSignIn();
        }
    }

    return (
        <div className="login" >
            <div className="title">
                <h3>Login</h3>
                <GiPadlock className="iconLogin" />
            </div>
            {
            (errorMsg)?
             <Alert
                className="errorMsg"
                description={errorMsg}
                type="error"
                showIcon
            />:null
            }
            <Input
                size="large"
                placeholder="Introduce un usuario"
                prefix={<UserOutlined />}
                onChange={e => setUserName(e.target.value.trim())}
            />
            <Input.Password
                size="large"
                placeholder="Introuce una contraseña"
                className="inputPassword"
                onChange={e => setPassword(e.target.value)}
                onKeyPress={enterPressed}
            />
            <Button onClick={handleSignIn} className="btnLogin">
                Entrar
            </Button>
        </div>
    );
};

export default connect(null,{logUser})(Login);


