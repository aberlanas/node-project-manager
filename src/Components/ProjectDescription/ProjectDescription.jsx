import React, { useState, useEffect } from "react";
import { Descriptions, Popover, Avatar, Input, Button, Modal } from "antd";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import Http from "../../Helpers/Http";
import { connect } from "react-redux";
import {
  readProject,
} from "../../Redux/Reducers/ProjectReducer";
import {
  getAllProjects,
  selectedProject,
  editProject,
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
  const [name, setName] = useState(project.nombre);
  const [description, setDescription] = useState(project.descripcion);
  const [editName, setEditName] = useState(true);
  const [editDesc, setEditDesc] = useState(true);
  const [showUserEditForm, setShowUserEditForm] = useState(false);
  const [showTeacherForm, setShowTeacherForm] = useState(false);
  const [showTechForm, setShowTechForm] = useState(false);
  const [showSaved, setShowSaved] = useState(true);

  const saveProject = async () => {

    project.nombre=name;
    project.descripcion=description;

    const result = await Http.post(project,'/api/projects/updateProject/'+project.id);


    setEdited(false);
    setEditDesc(true);
    setEditName(true);
    setShowSaved(true);

  }

  //Cada vez que cambiamos de proyecto, seteamos las variables al valor de cada proyecto
  useEffect(() => {
    
    setEditName(true);
    setEditDesc(true);
    setShowSaved(false);
    setName(project.nombre);
    setDescription(project.descripcion);
    
  }, [project]);

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
                  project.seleccionado = "";
                  setEditName(!editName);
                }}
              />
            </span>
          }
        >
          {editName ? (
            <span onDoubleClick={()=>{project.seleccionado="";setEditName(!editName)}}>{project.nombre}</span>
          ) : (
            <Input
              defaultValue={project.nombre}
              onChange={(e) => {
                setName(e.target.value);
                setEdited(!edited);
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
                  project.seleccionado = "";
                  setEditDesc(!editDesc);
                }}
              />
            </span>
          }
        >
          {editDesc ? (
            <span onDoubleClick={()=>{project.seleccionado = ""; setEditDesc(!editDesc)}}>{project.descripcion}</span>
          ) : (
            <Input.TextArea
              defaultValue={project.descripcion}
              onChange={(e) => {
                setDescription(e.target.value);
                setEdited(true);
                }
              }
              size="small"
            />
          )}
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
