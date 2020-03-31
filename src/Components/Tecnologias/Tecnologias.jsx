import React, { useEffect, useState, useCallback } from "react";
import Profile from "../Profile/Profile";
import Header from "../Header/Header";
import { List, Avatar, Button, Skeleton } from "antd";
import "./Tecnologias.css";
import Http from "../../Helpers/Http";


const getAllTechs = () =>{
  return [];
}

const dataSource = [];

const Tecnologias = () => {
  const replenishTable = useCallback(async () => {
    const dataSource = await Http.get("/api/techs/getAllTechs");
    console.log(dataSource);
    getAllTechs(
      dataSource.map(item => {
        item.key = item.id;
        return item;
      })
    );
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
        itemLayout="horizontal"
        dataSource={dataSource}
        renderItem={item => (
          <List.Item
            actions={[
              <a key="list-loadmore-edit">edit</a>,
              <a key="list-loadmore-more">more</a>
            ]}
          >
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={<a href="https://ant.design">{item.name.last}</a>}
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
              <div>content</div>
            </Skeleton>
          </List.Item>
        )}
      />
    </React.Fragment>
  );
};

export default Tecnologias;


