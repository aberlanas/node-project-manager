import React, { useEffect, useState, useCallback } from "react";
import TechForm from "../TechForm/TechForm";

import { List, Avatar,Card, Modal } from "antd";
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
} from "../../Redux/Actions/TechActions";

const Tecnologias = ({ techs, getAllTechs, selectedTech }) => {

  const [showTechForm, setShowTechForm] = useState(false);

  const replenishTable = useCallback(async () => {
    const dataSource = await Http.get("/api/techs/findAllTechs");
    dataSource.unshift({
      id: "add",
      nombre: "Add",
      logo: "js.png",
      descripcion: "Añade tecnología",
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
  }, [getAllTechs,selectedTech]);

  useEffect(() => {
    // Wait for loading data user
    //setLoading(true);

    replenishTable();
    //setLoading(false);
  }, [replenishTable]);

  return (
    <React.Fragment>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={techs}
        className="itemList"
        renderItem={item => (
          <List.Item>
            {item.id === "add" ? (
              <Card
              className="techCardAdd"
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
              className="techCard"
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
                {item.descripcion.substring(0,15)}
                {(item.descripcion.length < 15) ? "" : " ..."}
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
