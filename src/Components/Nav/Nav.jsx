import React from "react";
import "./Nav.css";
import { Menu } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { readUser } from "../../Redux/Reducers/UserReducer";
import { logOutUser } from "../../Redux/Actions/UserActions";

const Nav = ({ user }) => {
  return (
    <Menu mode="horizontal" className="navUsers">
      <Menu.Item>
        <Link to="/">Inicio</Link>
      </Menu.Item>
      <Menu.Item key="app">
        <Link to="/Projects">
          <AppstoreOutlined />
          Proyectos
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/Tecnologias">
          <SettingOutlined />
          Tecnologías
        </Link>
      </Menu.Item>
      <Menu.Item key="alipay">
        <MailOutlined />
        Foro
      </Menu.Item>
      <Menu.Item>Calificaciones</Menu.Item>
      {user.admin ? (
        <Menu.Item>
          <Link to="/AdminUser">Usuarios</Link>
        </Menu.Item>
      ) : null}
    </Menu>
  );
};

const mapStateToProps = (state) => {
  return { user: readUser(state) };
};

export default connect(mapStateToProps, { logOutUser })(Nav);
