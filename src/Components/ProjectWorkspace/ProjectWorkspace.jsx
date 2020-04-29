import React from "react";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import { readProject,readAllProjects } from "../../Redux/Reducers/ProjectReducer";
import { selectedProject,createProject}  from "../../Redux/Actions/ProjectActions";

import "./ProjectWorkspace.css";

import ProjectDescription from "../ProjectDescription/ProjectDescription";
import { Tabs, Modal, Button, Form, Input, Checkbox } from "antd";
import { BarsOutlined, InsertRowAboveOutlined,StarOutlined } from "@ant-design/icons";
import Kanban from "../Kanban/Kanban";
import Http from "../../Helpers/Http";
import { useState } from "react";
import { useEffect } from "react";

const { TabPane } = Tabs;

const ProjectWorkspace = ({ project,projects,selectedProject,createProject }) => {

  const [ showNewProject, setShowNewProject ] = useState(true);
  const [ newProject, setNewProject ] = useState({name:"",user:""});

  const addProject = async (values) => {
    const result = await Http.post(values,'/api/projects/createProject');
    if(result){
      console.log(result);
      createProject(result);
      selectedProject(result.id);
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
    onOk={()=>{addProject(newProject)}}
    okText="Nuevo Proyecto"
    cancelText="Cancelar"
          >
      <Form>

      <Form.Item
        label="Nombre del Proyecto"
        name="name"
          rules={[{ required: true, message: 'Pon un nombre al proyecto' }]}
        >
        <Input onChange={(e)=>{
          setNewProject({...newProject,[e.target.id]:e.target.value})          
          }}/>
      </Form.Item>

      <Form.Item
        label="Creador como alumno del proyecto"
        name="user"
          rules={[{ message: 'Usuario de la sesión asignado al proyecto' }]}
        >
        <Checkbox onChange={(e)=>{setNewProject({...newProject,[e.target.id]:(e.target.checked)?true:false})}}/>
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

export default connect(mapStateToProps,{selectedProject,createProject})(ProjectWorkspace);
