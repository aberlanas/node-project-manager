import React, { useEffect } from "react";
import { List, Avatar } from "antd";
import "antd/dist/antd.css";
import "./Succes.css";

const Succes = ({ user, logout }) => {
    const { nombre, apellidos, nickname, avatar } = user;
    const data = [
        `Nombre completo: ${nombre} ${apellidos}`,
        `Nombre de usuario: ${nickname}`
    ];
    const icon = require(`../img/${avatar}`);

    return (
        <div className="succes">
            <List
                header={<div>{nickname}</div>}
                footer={<Avatar size="large" src={icon} />}
                bordered
                dataSource={data}
                renderItem={item => <List.Item>{item}</List.Item>}
            />
        </div>
    );
};

export default Succes;
