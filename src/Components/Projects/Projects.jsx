import React, { useEffect, useCallback } from "react";
import TechDetails from "../TechDetails/TechDetails";
import Header from "../Header/Header";

import "./Projects.css";
import Http from "../../Helpers/Http";

import { connect } from "react-redux";
import { readAllTechs } from "../../Redux/Reducers/TechReducer";
import {
  getAllTechs,
  selectedTech
} from "../../Redux/Actions/TechActions";
import ProjectMenu from "../ProjectMenu/ProjectMenu";
import ProjectWorkspace from "../ProjectWorkspace/ProjectWorkspace";



const Projects = ({ getAllTechs, selectedTech }) => {

  const replenishTable = useCallback(async () => {
    const dataSource = await Http.get("/api/techs/findAllTechs");
    dataSource.unshift({
      id: "add",
      nombre: "Add",
      logo: "js.png",
      descripcion: "Añade technologia",
      version: "",
      creador: ""
    });

    getAllTechs(
      dataSource.map(item => {
        item.key = item.id;
        item.icon = require(`../../img/techs/${item.logo}`);
        return item;
      })
    );
    selectedTech(dataSource[1]);
  }, [getAllTechs,selectedTech]);

  useEffect(() => {
    // Wait for loading data user
    //setLoading(true);

    replenishTable();
    //setLoading(false);
  }, [replenishTable]);

  return (
    <React.Fragment>
      <Header />

      <ProjectMenu className="projectMenu"/>
      <ProjectWorkspace></ProjectWorkspace>
      
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return { techs: readAllTechs(state) };
};

export default connect(mapStateToProps, {
  getAllTechs,
  selectedTech
})(Projects);
