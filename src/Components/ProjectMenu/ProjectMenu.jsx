import React,{useCallback,useEffect,useState} from 'react';
import { Menu } from 'antd';

import Http from "../../Helpers/Http";
import { connect } from "react-redux";
import { readAllProjects } from "../../Redux/Reducers/ProjectReducer";
import {
  getAllProjects,
  selectedProject
} from "../../Redux/Actions/ProjectActions";

import "./ProjectMenu.css";


const ProjectMenu = ({project,projects, getAllProjects,selectedProject}) =>{
  const [clicked, setClicked] = useState(2);

  const replenishTable = useCallback(async () => {
    const dataSource = await Http.get("/api/projects/findAllProjects");
    //console.log(dataSource);
    dataSource.unshift({
      id: "add",
      nombre: "Añadir proyecto",
      descripcion: "Añade technologia",
    });
    await getAllProjects(dataSource);
    selectedProject(dataSource[1].id);
  }, [getAllProjects,selectedProject]);

  useEffect(() => {
    // Wait for loading data user
    //setLoading(true);
    replenishTable();
    //setLoading(false);
  }, [replenishTable]);

  const handleClick = e => {    
    setClicked(e.key);
  };
  return (
    
      <Menu
        className="projectMenu"
        style={{ width: 200 }}
        mode="inline"
      >
        {projects.map(item =>{
          return(
          <Menu.Item key={item.id}
        >
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