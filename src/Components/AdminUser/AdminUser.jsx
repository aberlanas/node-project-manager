import React, { useEffect, useState } from "react";
import Profile from "../Profile/Profile";
import "./AdminUser.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { readAllUsers } from "../../Redux/Reducers/UserReducer";
import { getAllUsers, createUser } from "../../Redux/Actions/UserActions";
import { logout as deleteCookie } from "../../Helpers/auth-helpers";
import Http from "../../Helpers/Http";
import Header from "../Header/Header";
import UserForm from "../UserForm/UserForm";
import { Table, Tag, Button, Modal } from "antd";
import Animate from "rc-animate";
import {
  DeleteOutlined,
  EditOutlined,
  UserAddOutlined
} from "@ant-design/icons";

const AdminUser = ({ users, getAllUsers }) => {
  const [showUserForm, setShowUserForm] = useState(false);

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
      render: text => <a>{text}</a>
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
          <EditOutlined style={{ marginRight: 16 }} />
          <DeleteOutlined style={{ color: "red" }} />
        </span>
      )
    }
  ];

  useEffect(() => {
    // Wait for loading data user
    //setLoading(true);

    (async () => {
      const dataSource = await Http.get("/api/users/getAllUsers");
      console.log(dataSource);
      getAllUsers(
        dataSource.map(item => {
          item.key = item.id;
          return item;
        })
      );
      //setLoading(false);
    })();
  }, []);

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

      
        <Table className="tablaUsuarios" columns={columns} dataSource={users} />
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return { users: readAllUsers(state) };
};

export default connect(mapStateToProps, { createUser, getAllUsers })(AdminUser);
