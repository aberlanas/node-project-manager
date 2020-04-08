import React, { useCallback, useEffect, useState } from "react";
import { Menu, Descriptions, Popover, Avatar } from "antd";
import Http from "../../Helpers/Http";
import { connect } from "react-redux";
import {
  readAllProjects,
  readProject,
} from "../../Redux/Reducers/ProjectReducer";
import {
  getAllProjects,
  selectedProject,
} from "../../Redux/Actions/ProjectActions";

import "./ProjectDescription.css";

const contentPopOverTechs = (tech) => {
  return (
    <div>
      <p>{tech.nombre}</p>
    </div>
  );
};

const contentPopOverUsers = (user) => {
    return (
      <div>
        <p>{user.nickname}</p>
      </div>
    );
  };

const ProjectDescription = ({ project }) => {
  return (
    <div>
      <Descriptions
        title={project.nombre}
        bordered
        column={{ xxl: 3, xl: 3, lg: 3, md: 3, sm: 3, xs: 3 }}
      >
        <Descriptions.Item label="Nombre Proyecto">
          {project.nombre}
        </Descriptions.Item>
        <Descriptions.Item label="Usuarios">
          {project.usuarios
            ? project.usuarios.map((usr) => {
                usr.icon = require("../../img/" + usr.avatar);
                return (
                  <Popover content={contentPopOverUsers(usr)} key={usr.id}>
                    <Avatar src={usr.icon} /> &nbsp;
                  </Popover>
                );
              })
            : ""}
        </Descriptions.Item>
        <Descriptions.Item label="Tecnologías">
          {project.tecnologias
            ? project.tecnologias.map((tech) => {
                tech.icon = require("../../img/techs/" + tech.logo);
                return (
                  <Popover content={contentPopOverTechs(tech)} key={tech.id}>
                    <Avatar src={tech.icon} /> &nbsp;
                  </Popover>
                );
              })
            : ""}
        </Descriptions.Item>
        <Descriptions.Item label="Descripción">
        Chanante ipsum dolor sit amet, eiusmod elit mamellas tempor estoy fatal de lo mío quis minim gambitero. Magna ea adipisicing chiquititantantan incididunt agazapao incididunt ex exercitation minim. Ex sed freshquisimo, minim ut magna nisi con las rodillas in the guanter dolore tempor ut nostrud nisi incididunt eiusmod. Magna ojete calor nisi nisi incididunt bajonaaa et quis labore eveniet.
        
        <br />
        <br />

        Veniam exercitation nostrud ju-já. Eres un pirámidee minim te viste de torero forrondosco adipisicing eiusmod bufonesco tempor gambitero sed artista aliqua. Nostrud cosica zanguango ea magna sed magna cartoniano asobinao ex pepinoninoni, ad atiendee, one more time monguer Guaper. Nisi pataliebre dolore ex aliqua saepe adipisicing eveniet, exercitation.
        
        <br />
        <br />

        Freshquisimo droja atiendee enim, enim, nostrud mamellas eiusmod ut enjuto mojamuto soooy crossoverr veniam nostrud. Ut minim ea ut monguer Guaper tempor sed, enim veniam nostrud ex ut ex monetes. Nianoniano ex quis eiusmod, to sueltecico melifluo labore one more time agazapao ullamco ut. Aliqua aliqua ea magna consectetur eveniet ayy qué gustico. Saepe zanguango, exercitation bufonesco exercitation, sed ea saepe con las rodillas in the guanter tempor es de traca nostrud cascoporro veniam ut.
        
        <br />
        <br /> 
        
     </Descriptions.Item>
      </Descriptions>

    </div>
  );
};

const mapStateToProps = (state) => {
  return { project: readProject(state) };
};

export default connect(mapStateToProps, {
  getAllProjects,
  selectedProject,
})(ProjectDescription);
