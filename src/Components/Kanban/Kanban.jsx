import React from "react";
import Board, {moveCard} from "@lourenci/react-kanban";

import Http from "../../Helpers/Http";
import { connect } from "react-redux";
import { readProject } from "../../Redux/Reducers/ProjectReducer";
import {
  editProject,
  getAllProjects,
  selectedProject,
} from "../../Redux/Actions/ProjectActions";
import { useEffect, useState } from "react";

const Kanban = ({ project, editProject}) => {

  const [board, setBoard] = useState(project.tablero);

  function handleCardMove(_card, source, destination) {
    const updatedBoard = moveCard(board, source, destination);
    setBoard(updatedBoard);
  }
  useEffect(()=>{
    console.log(board);
    project.tablero = board;
    editProject(project);
  },[board]);

  useEffect(()=>{
    setBoard(project.tablero);
  },[project])
  return (
    <Board
    onCardDragEnd={handleCardMove}
    allowRemoveLane
    allowRenameColumn
    allowRemoveCard
    onLaneRemove={console.log}
    onCardRemove={console.log}
    onLaneRename={console.log}
    allowAddCard={{on:"top"}}
    onNewCardConfirm={draftCard => ({
      id: new Date().getTime(),
      ...draftCard
    })}
    onCardNew={console.log}
  >{board}</Board>
  );
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
  editProject
})(Kanban);
