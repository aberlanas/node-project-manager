import React, {useEffect } from "react";
import { List, Avatar } from "antd";
import "antd/dist/antd.css";
import "./Succes.css";
import { UserOutlined } from '@ant-design/icons';


const Succes = (props) => {
    const data = ["Nombre completo: "+props.user.nombre+" "+props.user.apellidos,"Nombre de usuario: "+props.user.nickname];
    const icon = require( `../img/${props.user.avatar}`);


    return (
        <div className="succes">
            {console.log(icon)}
            <List
                header={<div>{props.user.nickname}</div>}
                footer={<Avatar size="large" src={icon} />}
                bordered
                dataSource={data}
                renderItem={item => (
                    <List.Item>
                        {item}
                    </List.Item>
                )}
            />
        </div>
    );
};

export default Succes;
