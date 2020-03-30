import React from "react";
import { connect } from "react-redux";
import { Form, Input, Button, Checkbox } from 'antd';
import Http from "../../Helpers/Http";
import { editUser } from "../../Redux/Actions/UserActions";


import "./UserEditForm.css";
import { readUserById } from "../../Redux/Reducers/UserReducer";

const UserForm = ({editUser, user}) => {
  const onFinish = async (values) => {
    console.log(user.id);
      const result = await Http.put(values,'/api/users/updateUser/'+user.id);
      if(result){
        if(result.affectedRows===1){
          values.user.id=user.id;
          values.user.key=user.id;
          editUser(values.user);
        }
      }
  }

    const layout = {

        labelCol: {
          span: 5,
        },
        wrapperCol: {
          span: 20,
        },
      };
    return (
        <div className="userForm">
        <Form {...layout} name="nest-messages" onFinish={onFinish} initialValues={{user:user}}>
          <Form.Item
            name={['user','nickname']}
            label="Nickname"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input value="Hola"/>
          </Form.Item>

          <Form.Item
            name={['user', 'email']}
            label="Email"
            rules={[
              {
                required: true,
                type: 'email',
              },
            ]}
          >
            <Input />
          </Form.Item>
    
          <Form.Item name={['user', 'nombre']} label="Nombre"
          rules={[
            {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name={['user', 'apellidos']} label="Apellidos" 
          rules={[
                {
                    required: true,
                  },
            ]}>
            <Input />
          </Form.Item>

          <Form.Item name={['user', 'admin']} label="Administrador">
            <Checkbox checked={Boolean(user.admin)} />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Editar
            </Button>
          </Form.Item>
        </Form>
        </div>
      );
};

const mapStateToProps = state => {
  return { user: readUserById(state) };
};

export default connect(mapStateToProps,{editUser})(UserForm);

