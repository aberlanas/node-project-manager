import React from "react";
import Board, {moveCard,removeCard,moveColumn} from "@lourenci/react-kanban";

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

  const saveProject = async () => {

    const result = await Http.post(project,'/api/projects/updateKanbanProject/'+project.id);

  }

  const [board, setBoard] = useState(project.tablero);

  useEffect(()=>{
    project.tablero = board;
    editProject(project);
    saveProject();
  },[board]);

  useEffect(()=>{
    console.log(project);
    setBoard(project.tablero);
  },[project])

  function ReplenishBoard(){ 
    return(   
      <Board
        onCardDragEnd={(card)=>{setBoard(card)}}
        onColumnDragEnd={(column)=>{setBoard(column)}}
        allowRenameColumn
        allowRemoveCard
        initialBoard={board}
        onCardRemove={(resultBoard,source)=>{removeCard(board,source,resultBoard); setBoard(resultBoard);}}
        onLaneRename={console.log}
        allowAddCard={{on:"top"}}
        onNewCardConfirm={draftCard => ({
          id: new Date().getTime(),
          ...draftCard
        })}
        onCardNew={(card)=>{setBoard(card)}}
      />)};

  return (<div>
     <ReplenishBoard/>
    </div>
     );
};

const mapStateToProps = (state) => {
  return { project: readProject(state) };
};

export default connect(mapStateToProps, {
  getAllProjects,
  selectedProject,
  editProject
})(Kanban);
