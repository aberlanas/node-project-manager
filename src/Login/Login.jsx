import React, { useState } from "react";
import { Input, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { GiPadlock } from "react-icons/gi";
import "antd/dist/antd.css";
import "./Login.css";
import { withRouter } from "react-router-dom";

const Login = () => {
    return (
        <div className="login">
            <div className="title">
                <h3>Login</h3>
                <GiPadlock
                    style={{
                        color: 'white',
                        fontSize: '2em',
                        marginBottom: '30px'
                    }} 
                />
            </div>
            <Input
                size="large"
                placeholder="Introduce un usuario"
                prefix={<UserOutlined />}
            />
            <Input.Password
                size="large"
                placeholder="Introuce una contraseña"
                style={{
                    marginTop: "30px"
                }}
            />
            <Button
                color="default"
                style={{
                    backgroundColor: "#1FFF00",
                    color: "white",
                    border: "none",
                    marginTop: "30px"
                }}
            >
                Entrar
            </Button>
        </div>
    );
};

export default Login;
