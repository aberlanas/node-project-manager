import React, { useEffect, useState, useCallback } from "react";
import TechDetails from "../TechDetails/TechDetails";
import Header from "../Header/Header";
import TechForm from "../TechForm/TechForm";

import { List, Avatar, Button, Skeleton, Card, Modal } from "antd";
import {
  PlusCircleOutlined
} from "@ant-design/icons";

import "./Tecnologias.css";
import Http from "../../Helpers/Http";

import { connect } from "react-redux";
import { readAllTechs } from "../../Redux/Reducers/TechReducer";
import {
  getAllTechs,
  selectedTech,
  createTech,
  removeTech,
  techEdit
} from "../../Redux/Actions/TechActions";

const findAllTechs = () => {
  return [];
};

const dataSource = [];

const Tecnologias = ({ techs, getAllTechs, selectedTech }) => {

  const [showTechForm, setShowTechForm] = useState(false);

  const replenishTable = useCallback(async () => {
    const dataSource = await Http.get("/api/techs/findAllTechs");
    dataSource.unshift({
      id: "add",
      nombre: "Add",
      logo: "js.png",
      descripcion: "Añade technologia",
      version: "",
      creador: ""
    });

    getAllTechs(
      dataSource.map(item => {
        item.key = item.id;
        item.icon = require(`../../img/techs/${item.logo}`);
        return item;
      })
    );
    selectedTech(dataSource[1]);
  }, [getAllTechs]);

  useEffect(() => {
    // Wait for loading data user
    //setLoading(true);

    replenishTable();
    //setLoading(false);
  }, [replenishTable]);

  return (
    <React.Fragment>
      <Header />

      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={techs}
        className="itemList"
        renderItem={item => (
          <List.Item>
            {item.id === "add" ? (
              <Card
                title="Añadir"
                onClick={() => {
                  setShowTechForm(!showTechForm);
                }}
              >
                <span>
                   <PlusCircleOutlined style={{fontSize:"73px",margin:"0 auto"}}/>
                  </span>
              </Card>
            ) : (
              <Card
                title={
                  <span>
                    <Avatar src={item.icon}></Avatar> {item.nombre}
                  </span>
                }
                onClick={() => {
                  selectedTech(item);
                }}
              >
                {item.version}
                <br />
                Creador :{item.creador}
              </Card>
            )}
          </List.Item>
        )}
      />

      <Modal
          title="Crear Tecnologia"
          visible={showTechForm}
          okText="Salir"
          destroyOnClose={true}
          onOk={() => {
            setShowTechForm(!showTechForm);
          }}
          cancelText="Cancelar"
          onCancel={() => {
            setShowTechForm(!showTechForm);
          }}
        >
          <TechForm />
        </Modal>

      <TechDetails />
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return { techs: readAllTechs(state) };
};

export default connect(mapStateToProps, {
  getAllTechs,
  selectedTech
})(Tecnologias);
