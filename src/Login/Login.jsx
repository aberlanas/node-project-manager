import React, { useState,useEffect } from "react";
import { Input, Button, Alert } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { GiPadlock } from "react-icons/gi";
import "antd/dist/antd.css";
import "./Login.css";
import Http from "../Helpers/Http"; 
import { saveToken,getTokenAuth } from '../Helpers/auth-helpers';

const Login = ({ handleSetUser, user }) => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState(null);

    const handleSignIn = async () => {
        const data = await Http.post(
            { nickname: userName, password },
            '/api/users/isValidUser'
        );
        
        if (data.token) {
            
            console.log(data);
            saveToken(data.token);
            const res = await getTokenAuth();
            
            console.log(res);
            if (res.auth) {
                handleSetUser(data.token, res.data.id);
            }
        }else{
            console.log(data);
            setErrorMsg(data.msg);
        }
        
    };

    const enterPressed = (event) => {
        if(event.key === "Enter"){
            console.log("Handle : "+event.key);
            console.log(handleSignIn);
            handleSignIn();
        }
    }
/*
    useEffect(()=>{
        window.addEventListener("keydown",enterPressed)
        return () => {
            window.removeEventListener("keydown",enterPressed);
        }
    },[]);*/

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
                onChange={e => setUserName(e.target.value)}
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

export default Login;
