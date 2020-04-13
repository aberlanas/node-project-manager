import React, { useCallback, useEffect } from "react";
import { Menu } from "antd";

import Http from "../../Helpers/Http";
import { connect } from "react-redux";
import { readAllProjects, readProject } from "../../Redux/Reducers/ProjectReducer";
import {
  getAllProjects,
  selectedProject,
} from "../../Redux/Actions/ProjectActions";

import "./ProjectMenu.css";

const ProjectMenu = ({
  project,
  projects,
  getAllProjects,
  selectedProject,
}) => {
  const replenishTable = useCallback(async () => {
    const dataSource = await Http.get("/api/projects/findAllProjects");
    
    dataSource.unshift({
      id: "add",
      nombre: "Añadir proyecto",
      descripcion: "Añade technologia",
    });
    await getAllProjects(dataSource);
    selectedProject(dataSource[1].id);
  }, [getAllProjects, selectedProject]);

  useEffect(() => {
    // Wait for loading data user
    replenishTable();
    
  }, [replenishTable]);
  

  return (
    <Menu className="projectMenu" style={{ width: 200 }} mode="inline">
      {projects.map((item) => {
        return (
          <Menu.Item
            key={item.id}
            onClick={(e) => {
              selectedProject(item.id);
            }}
          >
            {item.nombre}
          </Menu.Item>
        );
      })}
    </Menu>
  );
};

const mapStateToProps = (state) => {
  return { projects: readAllProjects(state), project: readProject(state) };
};

export default connect(mapStateToProps, {
  getAllProjects,
  selectedProject,
})(ProjectMenu);
