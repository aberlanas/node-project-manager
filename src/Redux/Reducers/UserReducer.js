const initialState = {user:null,users:[],editUserId:-1};

const reducer = (state=initialState,action) => {
    switch(action.type){
        case "LOG_USER":
            return {
                ...state,
                user:action.user
            }
        case "LOGOUT_USER":
                return {
                    ...state,
                    user:null
                }
        case "CREATE_USER":
                return{
                    ...state,
                    users:[action.user].concat(state.users)
                }
        case "GET_ALL_USERS":
                return{
                    ...state,
                    users:action.users
                }

        case "REMOVE_USER":
            return{
                ...state,
                users:state.users.filter(user=>user.id!==action.id)
            }
        case "EDITING_USER":
            return{
                ...state,
                editUserId:action.id
            }
        case "EDIT_USER":
            return{
                ...state,
                users:state.users.map( user =>{
                    if(user.id!==action.user.id) return user;
                    return action.user;
                })
            }
        default:
            return {
                ...state
            }
    }
}

export const readUser = (state) => {
    return state.UserReducer.user;
}

export const readUserTech = (state) => {

    return state.UserReducer.users.filter(user=>user.id===state.TechReducer.tech.creador);
}

export const readAllUsers = (state) => {
    return state.UserReducer.users;
}

export const readUserById = (state) => {
    return state.UserReducer.users.filter(user=>user.id===state.UserReducer.editUserId)[0];
}


export default reducer;