import React,{useCallback,useEffect,useState} from 'react';
import { Menu } from 'antd';

import Http from "../../Helpers/Http";
import { connect } from "react-redux";
import { readAllProjects } from "../../Redux/Reducers/ProjectReducer";
import {
  getAllProjects,
  selectedProject
} from "../../Redux/Actions/ProjectActions";


const ProjectMenu = ({projects, getAllProjects,selectedProject}) =>{


  const replenishTable = useCallback(async () => {
    const dataSource = await Http.get("/api/projects/findAllProjects");
    //console.log(dataSource);
    /*dataSource.unshift({
      id: "add",
      nombre: "Add",
      logo: "js.png",
      descripcion: "Añade technologia",
      version: "",
      creador: ""
    });*/
    await getAllProjects(dataSource);
    selectedProject(dataSource[0]);
  }, [getAllProjects,selectedProject]);

  useEffect(() => {
    // Wait for loading data user
    //setLoading(true);
    replenishTable();
    //setLoading(false);
  }, [replenishTable]);





  const handleClick = e => {
    console.log('click ', e);
  };
  return (
    
      <Menu
        className="projectMenu"
        onClick={handleClick}
        style={{ width: 200 }}
        mode="inline"
      >
        {projects.map(item =>{
          return(
          <Menu.Item key={item.id}>
            {item.nombre}
          </Menu.Item>
          )
        })}
      </Menu>
    );
  
}


const mapStateToProps = state => {
  return { projects: readAllProjects(state) };
};

export default connect(mapStateToProps, {
  getAllProjects,
  selectedProject
})(ProjectMenu);