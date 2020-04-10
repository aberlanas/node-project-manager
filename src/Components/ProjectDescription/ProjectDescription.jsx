import React, { useCallback, useEffect, useState } from "react";
import { Menu, Descriptions, Popover, Avatar, Input, Button, Modal } from "antd";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import Http from "../../Helpers/Http";
import { connect } from "react-redux";
import {
  readAllProjects,
  readProject,
} from "../../Redux/Reducers/ProjectReducer";
import {
  getAllProjects,
  selectedProject,
  editProject,
  projectEdit,
} from "../../Redux/Actions/ProjectActions";

import "./ProjectDescription.css";

import TransferFormStudents from "../TransferForm/TransferFormStudents";
import TransferFormTeachers from "../TransferForm/TransferFormTeachers";

import TransferTechForm from "../TransferTechForm/TransferTechForm";

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

  const [edited, setEdited] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editName, setEditName] = useState(true);
  const [editDesc, setEditDesc] = useState(true);
  const [showUserEditForm, setShowUserEditForm] = useState(false);
  const [showTeacherForm, setShowTeacherForm] = useState(false);

  const [showTechForm, setShowTechForm] = useState(false);

  const temporalName = project.nombre;

  const saveProject = async () => {


    project.nombre=name;
    project.descripcion=description;
    editProject(project);


    const result = await Http.post(project,'/api/projects/updateProject/'+project.id);

    setEdited(false);
    setEditDesc(true);
    setEditName(true);

  }

  useEffect(() => {
    // Wait for loading data user
    //setLoading(true);
    /*
    if (project.editandome === undefined) {
      project.editandome = 1;
      setEditDesc(true);
      setEditName(true);
    }*/
    
    //setLoading(false);
  });


  return (
    <div>
      <Descriptions
        title={
          <span>
            {project.nombre}
            {edited ? (
              <span className="botonsitoGuardar">
                <Button
                  type="primary"
                  shape="round"
                  icon={<SaveOutlined />}
                  onClick={saveProject}
                >
                  Guardar
                </Button>
              </span>
            ) : (
              ""
            )}
          </span>
        }
        bordered
        column={{ xxl: 4, xl: 4, lg: 3, md: 3, sm: 2, xs: 2 }}
      >
        <Descriptions.Item
          label={
            <span>
              Nombre Proyecto &nbsp;
              <EditOutlined
                onClick={() => {
                  setEditName(!editName);
                  setName("");
                }}
              />
            </span>
          }
        >
          {editName ? (
            <span>{project.nombre}</span>
          ) : (
            <Input
              defaultValue={project.nombre}
              onChange={(e) => {
                setName(e.target.value);
                
                setEdited(true);
              }}
              size="small"
            />
          )}
        </Descriptions.Item>
        
        <Descriptions.Item label={<span> Alumnos <EditOutlined
          onClick={()=>{
            setShowUserEditForm(!showUserEditForm);
          }}/></span>}>
          
          <Modal
            title="Editar Alumnos"
            visible={showUserEditForm}
            destroyOnClose={true}
            okText="Salir"
            onOk={() => {
              setEdited(true);
              setShowUserEditForm(!showUserEditForm);
            }}
            cancelText="Cancelar"
            onCancel={() => {
              setShowUserEditForm(!showUserEditForm);
            }}
          >
            <TransferFormStudents/>
          </Modal>
          {project.usuarios.alumnos
            ? project.usuarios.alumnos.map((usr) => {
                usr.icon = require("../../img/" + usr.avatar);
                return (
                  <Popover content={contentPopOverUsers(usr)} key={usr.id}>
                    <Avatar src={usr.icon} /> &nbsp;
                  </Popover>
                );
              })
            : ""}
        </Descriptions.Item>
            
        <Descriptions.Item label={<span>Profesores <EditOutlined
          onClick={()=>{
            setShowTeacherForm(!showTeacherForm);
          }}/></span>}>
          
          <Modal
            title="Editar Alumnos"
            visible={showTeacherForm}
            destroyOnClose={true}
            okText="Salir"
            onOk={() => {
              setEdited(true);
              setShowTeacherForm(!showTeacherForm);
            }}
            cancelText="Cancelar"
            onCancel={() => {
              setShowTeacherForm(!showTeacherForm);
            }}
          >
            <TransferFormTeachers/>
          </Modal>
          {project.usuarios.profesores
            ? project.usuarios.profesores.map((usr) => {
                usr.icon = require("../../img/" + usr.avatar);
                return (
                  <Popover content={contentPopOverUsers(usr)} key={usr.id}>
                    <Avatar src={usr.icon} /> &nbsp;
                  </Popover>
                );
              })
            : ""}
        </Descriptions.Item>




        <Descriptions.Item label={<span>Tecnologías <EditOutlined
          onClick={()=>{
            setShowTechForm(!showTechForm);
          }}/></span>}>

        <Modal
            title="Editar usuarios"
            visible={showTechForm}
            destroyOnClose={true}
            okText="Salir"
            onOk={() => {
              setEdited(true);
              setShowTechForm(!showTechForm);
            }}
            cancelText="Cancelar"
            onCancel={() => {
              setShowTechForm(!showTechForm);
            }}
          >
            <TransferTechForm/>
          </Modal>

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
        <Descriptions.Item
          label={
            <span>
              Descripcion &nbsp;
              <EditOutlined
                onClick={() => {
                  setEditDesc(!editDesc);
                 
                  setDescription();
                }}
              />
            </span>
          }
        >
          {editDesc ? (
            <span>{project.descripcion}</span>
          ) : (
            <Input.TextArea
              defaultValue={project.descripcion}
              onChange={(e) => {

                setDescription(e.target.value);
                setEdited(true);
              }}
              size="small"
            />
          )}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

const mapStateToProps = (state) => {  
  delete state.ProjectReducer.project.editandome;
  return { project: readProject(state) };
};

export default connect(mapStateToProps, {
  getAllProjects,
  selectedProject,
})(ProjectDescription);
