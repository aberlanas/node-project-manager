import React from "react";
import Profile from "../Profile/Profile";
import "./AdminUser.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { readUser } from "../../Redux/Reducers/UserReducer";
import { logOutUser } from "../../Redux/Actions/UserActions";
import { logout as deleteCookie } from "../../Helpers/auth-helpers";
import Header from "../Header/Header";
import { Table, Tag } from "antd";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const AdminUser = () => {
  const columns = [
    {
      title: "Nickname",
      dataIndex: "nickname",
      key: "nickname",
      render: text => <a>{text}</a>
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id"
    },
    {
      title: "Nombre completo",
      dataIndex: "nameSurname",
      key: "nameSurname"
    },
    {
      title: "Permisos",
      key: "permissions",
      dataIndex: "permissions",
      render: tags => (
        <span>
        </span>
      )
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span>
          <EditOutlined style={{ marginRight: 16 }}/>
          <DeleteOutlined style={{ color:'red'}}/>
        </span>
      )
    }
  ];

  const data = [
    {
      key: "1",
      nickname: "John Brown",
      id: 32,
      nameSurname: "New York No. 1 Lake Park",
      permissions: ["nice", "developer"]
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"]
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: ["cool", "teacher"]
    }
  ];
  return (
    <div>
      <Header />
      <div className="adminUserBody">
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default AdminUser;
