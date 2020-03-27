import React, {useEffect,useState} from "react";
import Profile from "../Profile/Profile";
import "./AdminUser.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { readUser } from "../../Redux/Reducers/UserReducer";
import { logOutUser } from "../../Redux/Actions/UserActions";
import { logout as deleteCookie } from "../../Helpers/auth-helpers";
import Http from "../../Helpers/Http";
import Header from "../Header/Header";
import UserForm from "../UserForm/UserForm";
import { Table, Tag } from "antd";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';


const AdminUser = () => {

  const [data,setData] = useState([]);

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
      title: "Nombre completo",
      dataIndex: "nameSurname",
      key: "nameSurname"
    },
    {
      title: "Permisos",
      key: "admin",
      dataIndex: "admin",
      render: tags => (
        <span>
          {tags ? <Tag color="blue">Admin</Tag>:<Tag color="grey">User</Tag>}
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

  useEffect(() => {

    // Wait for loading data user
    //setLoading(true);

    (async () => {
        const dataSource = await Http.get("/api/users/getAllUsers");
        console.log(dataSource);
        setData(dataSource.map( item => {
          item.key=item.id;
          item.nameSurname=item.nombre + " " + item.apellidos;
          return item;
        }));
        //setLoading(false);
    })();

}, []);
    
  return (
    <div>
      <Header />
      <div className="adminUserBody">
       
        <UserForm/>

        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default AdminUser;
