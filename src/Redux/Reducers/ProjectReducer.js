const initialState = {project:{nombre:"",usuarios:{alumnos:"",profesores:""}},projects:[],editProjectId:-1};

const reducer = (state=initialState,action) => {
    switch(action.type){
        case "CREATE_PROJECT":
                return{
                    ...state,
                    projects:[action.project].concat(state.projects)
                }
        case "GET_ALL_PROJECTS":
                return{
                    ...state,
                    projects:action.projects
                }
        case "SELECTED_PROJECT":
                    return {
                      ...state,
                      project: state.projects.filter(project=>project.id===action.id)[0]
                    };
        case "REMOVE_PROJECT":
            return{
                ...state,
                projects:state.projects.filter(project=>project.id!==action.id)
            }
        
        case "EDITING_PROJECT":
            return{
                ...state,
                editProjectId:action.id
            }
        case "EDIT_PROJECT":

            return{
                ...state,
                projects:state.projects.map( project =>{
                    if(project.id!==action.project.id) return project;
                    return action.project;
                })
            }
        default:
            return {
                ...state
            }
    }
}

export const readProject = (state) => {
    return state.ProjectReducer.project;
}

export const readProjectUser = (state) => {

    return state.ProjectReducer.projects.filter(project=>project.id===state.UserReducer.user.id);
}

export const readAllProjects= (state) => {
    return state.ProjectReducer.projects;
}

export const readProjectById = (state) => {
    return state.ProjectReducer.projects.filter(project=>project.id===state.ProjectReducer.editProjectId)[0];
}


export default reducer;