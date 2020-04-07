import React from "react";
import "antd/dist/antd.css";
import { Card, Avatar } from "antd";
import { connect } from "react-redux";
import { readTech } from "../../Redux/Reducers/TechReducer";
import { readProject } from "../../Redux/Reducers/ProjectReducer";

import "./ProjectWorkspace.css";
import UserPopUpDetails from "../UserPopUpDetails/UserPopUpDetails";
import PopUpList from "../PopUpList/PopUpList";

import { Tabs } from "antd";
import { BarsOutlined, InsertRowAboveOutlined,StarOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;

const ProjectWorkspace = ({ project }) => {
  return (
    <Tabs defaultActiveKey="1" className="projectWorkspace">
      <TabPane
        tab={
          <span>
            <BarsOutlined />
            Detalles
          </span>
        }
        key="1"
      >
        FILL THE GAPS

        Detalles del Proyecto : {project.nombre}
      </TabPane>
      <TabPane
        tab={
          <span>
            <InsertRowAboveOutlined />
            Kanban
          </span>
        }
        key="2"
      >
        Kanban and chorris
      </TabPane>
      <TabPane
        tab={
          <span>
            <StarOutlined />
            Calificaciones
          </span>
        }
        key="3"
      >
        Notas de Angel
        Notas de Diego
        Notas de Manuel Maria
      </TabPane>
    </Tabs>
  );
};

const mapStateToProps = (state) => {
  return { project: readProject(state) };
};

export default connect(mapStateToProps)(ProjectWorkspace);
