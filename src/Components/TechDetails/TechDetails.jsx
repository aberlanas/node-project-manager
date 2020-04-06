import React from "react";
import "antd/dist/antd.css";
import { Card,Avatar } from 'antd';
import { connect } from 'react-redux';
import { readTech } from "../../Redux/Reducers/TechReducer";
import "./TechDetails.css";
import UserPopUpDetails from '../UserPopUpDetails/UserPopUpDetails';
import PopUpList from "../PopUpList/PopUpList";


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
                Usado por : <PopUpList/>

            </Card>

     </div>
    );
};


const mapStateToProps = (state) =>{
    return {tech:readTech(state)};
}

export default connect(mapStateToProps)(TechDetails);
