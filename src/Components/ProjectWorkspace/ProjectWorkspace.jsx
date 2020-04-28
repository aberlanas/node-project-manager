import React from "react";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import { readProject,createProject,readAllProjects } from "../../Redux/Reducers/ProjectReducer";
import { selectedProject}  from "../../Redux/Actions/ProjectActions";

import "./ProjectWorkspace.css";

import ProjectDescription from "../ProjectDescription/ProjectDescription";
import { Tabs, Modal, Button, Form, Input } from "antd";
import { BarsOutlined, InsertRowAboveOutlined,StarOutlined } from "@ant-design/icons";
import Kanban from "../Kanban/Kanban";
import Http from "../../Helpers/Http";
import { useState } from "react";
import { useEffect } from "react";

const { TabPane } = Tabs;

const ProjectWorkspace = ({ project,projects,selectedProject,createProject }) => {

  const [ showNewProject, setShowNewProject ] = useState(true);
  const [ newProjectName, setNewProjectName ] = useState("");


  const addProject = async (values) => {
    const result = await Http.post(values,'/api/projects/createProject');
    if(result){
      result.key=result.id;
      ///TODO
      //createUser(result);
    }   
}  

  useEffect(()=> {
    setShowNewProject(true);
  },[project]);


  return (

    (project.id === "add") ?    <Modal
    visible={showNewProject}
    title="Crear Proyecto"
    destroyOnClose={true}
    onCancel={()=> {setShowNewProject(!showNewProject);selectedProject(projects[1].id)}}
    onOk={()=>{console.log(newProjectName)}}
    okText="Nuevo Proyecto"
    cancelText="Cancelar"
          >
      <Form>
      <Form.Item
        label="Nombre del Proyecto"
        name="name"
          rules={[{ required: true, message: 'Pon un nombre al proyecto' }]}
        >
        <Input onChange={(e)=>{setNewProjectName(e.target.value)}}/>
      </Form.Item>
      </Form>
    </Modal>
  : 
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
  return { project: readProject(state),
          projects: readAllProjects(state)
  };
};

export default connect(mapStateToProps,{selectedProject})(ProjectWorkspace);
