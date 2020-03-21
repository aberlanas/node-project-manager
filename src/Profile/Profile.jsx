import React, { useEffect } from "react";
import { List, Avatar } from "antd";
import "antd/dist/antd.css";
import { Button } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import "./Profile.css";

const Profile = ({ user, logOutUser }) => {
    const { nombre, apellidos, nickname, avatar } = user;
    const data = [
        `${nombre} ${apellidos}`,
    ];
    const icon = require(`../img/${avatar}`);

    return (
        <div className="profile">
                <Avatar src={icon} size="large" /> 
                <div className="nickname">{nickname}</div>
                <div className="nombreCompleto">{data} &nbsp;&nbsp;
                    <Button
                        size="small"
                        shape="circle"
                        type="primary"
                        icon={<PoweroffOutlined />
                        }
                        onClick={logOutUser}
                    />
                </div>
        </div>
    );
};

export default Profile;
