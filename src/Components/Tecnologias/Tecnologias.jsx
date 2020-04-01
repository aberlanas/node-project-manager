import React, { useEffect, useState, useCallback } from "react";
import TechDetails from "../TechDetails/TechDetails";
import Header from "../Header/Header";

import { List, Avatar, Button, Skeleton, Card } from "antd";
import "./Tecnologias.css";
import Http from "../../Helpers/Http";

import { connect } from "react-redux";
import { readAllTechs } from "../../Redux/Reducers/TechReducer";
import {
  getAllTechs,
  selectedTech,
  createTech,
  removeTech,
  techEdit
} from "../../Redux/Actions/TechActions";


const findAllTechs = () =>{
  return [];
}

const dataSource = [];

const Tecnologias = ({ techs,getAllTechs,selectedTech }) => {

  const replenishTable = useCallback(async () => {
    const dataSource = await Http.get("/api/techs/findAllTechs");
    console.log(dataSource);
    
    getAllTechs(
      dataSource.map(item => {
        item.key = item.id;
        item.icon = require(`../../img/techs/${item.logo}`);
        return item;
      })
    );
    selectedTech(dataSource[0]);
  }, [getAllTechs]);

  useEffect(() => {
    // Wait for loading data user
    //setLoading(true);

    replenishTable();
    //setLoading(false);
  }, [replenishTable]);

  return (
    <React.Fragment>
      <Header />

    
      <List
        grid={{ gutter: 16, column: 4 }}
        
        dataSource={techs}
        className="itemList"
        renderItem={item => (
          <List.Item>
            
            <Card title={<span><Avatar src={item.icon}></Avatar> {item.nombre}</span>}
            onClick={()=>{selectedTech(item)}}>
              
              Versión:{item.version}
              <br/>
              Dado de alta por :{item.creador}
              
              </Card>
             
  
          </List.Item>
        )}
      />
  
          <TechDetails/>
      

    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return { techs: readAllTechs(state) };
};


export default connect(mapStateToProps, {
  getAllTechs,
  selectedTech
})(Tecnologias);