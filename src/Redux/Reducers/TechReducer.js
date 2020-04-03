const initialState = {tech:{nombre:"Loading"}, techs: [], editTechId: -1 };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_TECH":
      console.log(state.techs);
      return {
        ...state,
        techs: [state.techs[0]].concat(action.tech).concat(state.techs.slice(1,state.techs.length))
      };
    case "SELECTED_TECH":
      return {
        ...state,
        tech: action.tech
      };
    case "GET_ALL_TECHS":
      return {
        ...state,
        techs: action.techs
      };

    case "REMOVE_TECH":
      return {
        ...state,
        techs: state.techs.filter(tech => tech.id !== action.id)
      };
    case "EDITING_TECH":
      return {
        ...state,
        editTechId: action.id
      };
    case "EDIT_TECH":
      console.log(action);
      return {
        ...state,
        techs: state.techs.map(tech => {
          if (tech.id !== action.tech.id) return tech;
          return action.tech;
        })
      };
    default:
      return {
        ...state
      };
  }
};

export const readAllTechs = state => {
  return state.TechReducer.techs;
};

export const readTech = state => {
    return state.TechReducer.tech;
  };
  

export default reducer;
