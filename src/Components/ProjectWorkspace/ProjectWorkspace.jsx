import React from "react";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import { readProject } from "../../Redux/Reducers/ProjectReducer";

import "./ProjectWorkspace.css";

import ProjectDescription from "../ProjectDescription/ProjectDescription";
import { Tabs } from "antd";
import { BarsOutlined, InsertRowAboveOutlined,StarOutlined } from "@ant-design/icons";
import Kanban from "../Kanban/Kanban";

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
        <ProjectDescription/>
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
        <Kanban/>
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
