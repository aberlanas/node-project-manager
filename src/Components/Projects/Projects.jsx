import React, { useEffect, useCallback, useState } from "react";
import Header from "../Header/Header";

import "./Projects.css";
import Http from "../../Helpers/Http";

import { connect } from "react-redux";
import { readAllTechs } from "../../Redux/Reducers/TechReducer";
import {
  getAllTechs
} from "../../Redux/Actions/TechActions";

import {
  getAllUsers
} from "../../Redux/Actions/UserActions";

import ProjectMenu from "../ProjectMenu/ProjectMenu";
import ProjectWorkspace from "../ProjectWorkspace/ProjectWorkspace";
import { readProject } from "../../Redux/Reducers/ProjectReducer";



const Projects = ({ getAllTechs, getAllUsers, project }) => {

  const [loading,setLoading] = useState(true);
  const replenishTable = useCallback(async () => {
  const dataSource = await Http.get("/api/techs/findAllTechs");
  const dataUsers = await Http.get("/api/users/getAllUsers");
    
    getAllTechs(
      dataSource.map(item => {
        item.key = item.id;
        item.icon = require(`../../img/techs/${item.logo}`);
        return item;
      })
    );

    getAllUsers(
      dataUsers.map(usr => {
        usr.key = usr.id;
        return usr;
      })
    );
  }, [getAllTechs,getAllUsers]);

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
      <ProjectWorkspace/>
      
      
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return { techs: readAllTechs(state), project: readProject(state) };
};

export default connect(mapStateToProps, {
  getAllTechs,
  getAllUsers
})(Projects);
