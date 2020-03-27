import React from "react";
import { Form, Input, Button, Switch } from 'antd';
import Http from "../../Helpers/Http";


import "./UserForm.css";

const UserForm = () => {
    const onFinish = async (values) => {
        const result = await Http.post(values,'/api/users/createUser');
        console.log(result);
    }


    const layout = {

        labelCol: {
          span: 7,
        },
        wrapperCol: {
          span: 10,
        },
      };
   
    return (
        <div className="userForm">
        <Form {...layout} name="nest-messages" onFinish={onFinish}>
          <Form.Item
            name={['user', 'name']}
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
    
          <Form.Item name={['user', 'Nombre']} label="Nombre"
          rules={[
            {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name={['user', 'Apellidos']} label="Apellidos" 
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
              Submit
            </Button>
          </Form.Item>
        </Form>
        </div>
      );
};

export default UserForm;