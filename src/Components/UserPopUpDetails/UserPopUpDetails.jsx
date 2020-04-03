import React,{useEffect, useState} from 'react';
import { Popover, Avatar } from 'antd';
import Http from '../../Helpers/Http';
import { useCallback } from 'react';
import { connect } from 'react-redux';
import { readTech } from "../../Redux/Reducers/TechReducer";

const contentPopOver = (user) => {
    return(
        <div>
            <p>{user.nickname}</p>
        </div>
    )
}

const UserPopUpDetails = ({tech}) => {
    const icon =  require('../../img/'+tech.user.avatar)

    return(
        <Popover content={contentPopOver(tech.user)}>
            <Avatar src={icon}/>
        </Popover>
    )
}



const mapStateToProps = (state) =>{
    return {tech:readTech(state)};
}

export default connect(mapStateToProps)(UserPopUpDetails);