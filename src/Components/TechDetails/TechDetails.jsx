import React from "react";
import "antd/dist/antd.css";
import { Button, Card,Avatar } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { readTech } from "../../Redux/Reducers/TechReducer";
import "./TechDetails.css";
import UserPopUpDetails from '../UserPopUpDetails/UserPopUpDetails';


const TechDetails = ({tech}) => {
    return (
        <div className="techDetails">
            <Card title={tech.nombre}>

                <Avatar src={tech.icon} size="large"></Avatar>&nbsp;&nbsp;
                 {tech.descripcion}
                <hr/>
                Versión: {tech.version}
                <hr/>
                Creado por : <UserPopUpDetails/>
                <hr/>
                Usado por : 

            </Card>

     </div>
    );
};


const mapStateToProps = (state) =>{
    return {tech:readTech(state)};
}

export default connect(mapStateToProps)(TechDetails);
