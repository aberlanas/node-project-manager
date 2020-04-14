import React, { useEffect, useState } from "react";
import { Popover, Avatar } from "antd";
import Http from "../../Helpers/Http";
import { useCallback } from "react";
import { connect } from "react-redux";
import { readTech } from "../../Redux/Reducers/TechReducer";

const contentPopOver = (user) => {
  return (
    <div>
      <p>{user.nickname}</p>
    </div>
  );
};

const PopUpList = ({ tech }) => {
  const [users, setUsers] = useState([]);

  const usersUseTechs = useCallback(async () => {
    const data = await Http.get("/api/techs/projectsUsersTechs/" + tech.id);
    setUsers(data);
  }, [tech]);

  useEffect(() => {
    // Wait for loading data user
    //setLoading(true);

    usersUseTechs();
    //setLoading(false);
    return () => setUsers([]);  
  }, [usersUseTechs]);
  return (
    <div>
      {users.map((user) => {
          user.icon = require("../../img/" + user.avatar);
        return (
          <Popover content={contentPopOver(user)} key={user.id}>
            <Avatar src={user.icon} />
          </Popover>
        );
      })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { tech: readTech(state) };
};

export default connect(mapStateToProps)(PopUpList);
