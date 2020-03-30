import React, { useEffect, useState,useCallback } from "react";
import "./AdminUser.css";
import { connect } from "react-redux";
import { readAllUsers } from "../../Redux/Reducers/UserReducer";
import { getAllUsers, createUser, removeUser, userEdit } from "../../Redux/Actions/UserActions";
import Http from "../../Helpers/Http";
import Header from "../Header/Header";
import UserForm from "../UserForm/UserForm";
import UserEditForm from '../UserEditForm/UserEditForm';

import { Table, Tag, Button, Modal } from "antd";

import {
  DeleteOutlined,
  EditOutlined,
  UserAddOutlined
} from "@ant-design/icons";

const AdminUser = ({ users, getAllUsers, removeUser, userEdit }) => {
  const [showUserForm, setShowUserForm] = useState(false);
  const [showUserEditForm, setShowUserEditForm] = useState(false);

  const deleteUser = async (id) => {
    console.log(id);
    const data = await Http.delete("/api/users/deleteUser/"+id);
    if(!data.msg) removeUser(id)
  };

  const replenishTable = useCallback(async () => {
    const dataSource = await Http.get("/api/users/getAllUsers");
    getAllUsers(
      dataSource.map(item => {
        item.key = item.id;
        return item;
      })
    );
  },[getAllUsers]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id"
    },
    {
      title: "Nickname",
      dataIndex: "nickname",
      key: "nickname",
      render: text => <span>{text}</span>
    },
    {
      title: "Correo",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre"
    },
    {
      title: "Apellidos",
      dataIndex: "apellidos",
      key: "apellidos"
    },
    {
      title: "Permisos",
      key: "admin",
      dataIndex: "admin",
      render: tags => (
        <span>
          {tags ? <Tag color="blue">Admin</Tag> : <Tag color="grey">User</Tag>}
        </span>
      )
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span>
          <EditOutlined style={{ marginRight: 16 }} onClick={()=>{
            userEdit(record.id);
            setShowUserEditForm(!showUserEditForm);
            }} />
          <DeleteOutlined
            style={{ color: "red" }}
            onClick={() => {
              deleteUser(record.id);
            }}
          />
        </span>
      )
    }
  ];

  useEffect(() => {
    // Wait for loading data user
    //setLoading(true);

    replenishTable();
    //setLoading(false);
  },[replenishTable]);

  return (
    <div>
      <Header />
      <div className="adminUserBody">
        <Button
          className="addUserButton"
          size="large"
          icon={<UserAddOutlined />}
          onClick={() => {
            setShowUserForm(!showUserForm);
            //Modal.info({title:"Crear usuarios",content:(<UserForm/>),onOk(){}})
          }}
        >
          Añadir Usuarios
        </Button>

        <Modal
          title="Crear Usuarios"
          visible={showUserForm}
          okText="Salir"
          onOk={() => {
            setShowUserForm(!showUserForm);
          }}
          cancelText="Cancelar"
          onCancel={() => {
            setShowUserForm(!showUserForm);
          }}
        >
          <UserForm />
        </Modal>
        <Modal
          title="Editar Usuarios"
          visible={showUserEditForm}
          okText="Salir"
          onOk={() => {
            setShowUserEditForm(!showUserEditForm);
          }}
          cancelText="Cancelar"
          onCancel={() => {
            setShowUserEditForm(!showUserEditForm);
          }}
        >
          <UserEditForm/>
        </Modal>

        <Table className="tablaUsuarios" columns={columns} dataSource={users} />
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return { users: readAllUsers(state) };
};

export default connect(mapStateToProps, { createUser, getAllUsers,removeUser,userEdit })(AdminUser);
