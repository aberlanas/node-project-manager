import React from "react";
import Board from "@lourenci/react-kanban";

import Http from "../../Helpers/Http";
import { connect } from "react-redux";
import { readProject } from "../../Redux/Reducers/ProjectReducer";
import {
  getAllProjects,
  selectedProject,
} from "../../Redux/Actions/ProjectActions";
import { useEffect, useState } from "react";

const Kanban = ({ project }) => {

  const [board, setBoard] = useState({
    columns: [
      {
        id: 1,
        title: "Backlog 2",
        cards: [
          {
            id: 1,
            title: "Add card",
            description: "Add capability to add a card in a column",
          },
        ],
      },
      {
        id: 2,
        title: "Doing",
        cards: [
          {
            id: 2,
            title: "Drag-n-drop support",
            description: "Move a card between the columns",
          },
        ],
      },
    ],
  });

  useEffect(() => {
    setBoard(project.tablero);
    console.log(project.tablero);
  },[]);

  return <Board>
      {board}
  </Board>;
};

/*
const mapStateToProps = (state) =>{
    return {user:readUser(state)};
}
*/

const mapStateToProps = (state) => {
  return { project: readProject(state) };
};

export default connect(mapStateToProps, {
  getAllProjects,
  selectedProject,
})(Kanban);
