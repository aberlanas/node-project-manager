import React from "react";
import { connect } from "react-redux";
import { Form, Input, Button, Switch } from 'antd';
import Http from "../../Helpers/Http";
import { createUser } from "../../Redux/Actions/UserActions";


import "./UserForm.css";

const UserForm = ({createUser}) => {
    const onFinish = async (values) => {
        const result = await Http.post(values,'/api/users/createUser');
        if(result){
          // TODO
          // Arreglar esto cuando se pueda
          result.key=result.id;
          createUser(result);
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
        <Form {...layout} name="nest-messages" onFinish={onFinish}>
          <Form.Item
            name={['user', 'nickname']}
            label="Nickname"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={['user', 'password']}
            label="Password"
            rules={[
                {
                    required: true,
                  },
            ]}
           
          >
            <Input.Password />
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
            <Switch/>
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Crear y Continuar
            </Button>
          </Form.Item>
        </Form>
        </div>
      );
};


export default connect(null,{createUser})(UserForm);

