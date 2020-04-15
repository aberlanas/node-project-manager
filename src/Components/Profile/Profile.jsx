import React from "react";
import { Avatar } from "antd";
import "antd/dist/antd.css";
import { Button } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import "./Profile.css";
import { connect } from 'react-redux';
import { readUser } from '../../Redux/Reducers/UserReducer';
import { logOutUser} from '../../Redux/Actions/UserActions';
import { logout as deleteCookie } from '../../Helpers/auth-helpers';
import { useState } from "react";
import { Redirect } from "react-router-dom";

const Profile = ({ user, logOutUser }) => {

    const [ logginOut, setLogginOut ] = useState(false);

    const { nombre, apellidos, nickname, avatar } = user;

    const data = [
        `${nombre} ${apellidos}`,
    ];
    const icon = require(`../../img/${avatar}`);

    const logOutUserAndRemoveCookie = () =>{
        deleteCookie();
        logOutUser();
        setLogginOut(true);
    }

    return (
        

        <div className="profile">
            {(logginOut ) ? <Redirect to="/login"></Redirect> : null }
                <Avatar src={icon} size="large" /> 
                <div className="nickname">{nickname}</div>
                <div className="nombreCompleto">{data} &nbsp;&nbsp;
                    <Button
                        size="small"
                        shape="circle"
                        type="primary"
                        icon={<PoweroffOutlined />
                        }
                        onClick={logOutUserAndRemoveCookie}
                    />
                </div>
        </div>
        
    );
};


const mapStateToProps = (state) =>{
    return {user:readUser(state)};
}

export default connect(mapStateToProps,{logOutUser})(Profile);
