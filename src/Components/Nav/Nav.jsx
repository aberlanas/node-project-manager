import React from "react";
import Profile from "../Profile/Profile";
import "./Nav.css";
import { Menu } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined
} from "@ant-design/icons";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { readUser } from "../../Redux/Reducers/UserReducer";
import { logOutUser } from "../../Redux/Actions/UserActions";
import { logout as deleteCookie } from "../../Helpers/auth-helpers";

const { SubMenu } = Menu;
/*

[Todos]

* Inicio
* Proyectos
* Tecnologias
   - > Odoo
   - > ContaPlus
   - > Que proyectos la usan.
* Foro

[Alumnos y profesores]

* Calificaciones 

[Administrador]

* Usuarios

*/

const Nav = ({ user }) => {
  console.log(user);
  return (
    <Menu mode="horizontal" className="navUsers">
      <Menu.Item key="mail">
        Inicio
      </Menu.Item>
      <Menu.Item key="app">
        <AppstoreOutlined />
        Proyectos
      </Menu.Item>
      <SubMenu
        title={
          <span className="submenu-title-wrapper">
            <SettingOutlined />
            Tecnologías
          </span>
        }
      >
        <Menu.ItemGroup title="DAW">
          <Menu.Item key="setting:1">Lenguajes</Menu.Item>
          <Menu.Item key="setting:2">Bases de Datos</Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup title="AFI">
          <Menu.Item key="setting:3">ERM</Menu.Item>
          <Menu.Item key="setting:4">Ofimática</Menu.Item>
        </Menu.ItemGroup>
      </SubMenu>
      <Menu.Item key="alipay">
          <MailOutlined/>Foro</Menu.Item>
      <Menu.Item>Calificaciones</Menu.Item>
      {user.admin ? <Menu.Item><Link to='/AdminUser'>Usuarios</Link></Menu.Item> : null}
    </Menu>
  );
};

const mapStateToProps = state => {
  return { user: readUser(state) };
};

export default connect(mapStateToProps, { logOutUser })(Nav);
