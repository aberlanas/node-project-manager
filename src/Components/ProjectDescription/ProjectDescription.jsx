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
} from "../../Redux/Actions/ProjectActions";

import "./ProjectDescription.css";

import TransferForm from "../TransferForm/TransferForm";
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
  const [showTechForm, setShowTechForm] = useState(false);

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
                  onClick={() => {
                    if (!name) {
                      setName(project.nombre);
                    }
                    if (!description) {
                      setDescription(project.descripcion);
                    }
                    console.log(name);
                    console.log(description);
                  }}
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
        column={{ xxl: 3, xl: 3, lg: 3, md: 3, sm: 2, xs: 2 }}
      >
        <Descriptions.Item
          label={
            <span>
              Nombre Proyecto &nbsp;
              <EditOutlined
                onClick={() => {
                  setEditName(!editName);
                  setEdited(true);
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
              }}
              size="small"
            />
          )}
        </Descriptions.Item>
        <Descriptions.Item label={<span>Usuarios <EditOutlined
          onClick={()=>{
            setShowUserEditForm(!showUserEditForm);
          }}/></span>}>
          
          <Modal
            title="Editar usuarios"
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
            <TransferForm/>
          </Modal>
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
                  setEdited(true);
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
  return { project: readProject(state) };
};

export default connect(mapStateToProps, {
  getAllProjects,
  selectedProject,
})(ProjectDescription);
