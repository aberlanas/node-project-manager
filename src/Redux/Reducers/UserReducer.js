const initialState = {user:null,users:[]};


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
        default:
            return {
                ...state
            }
    }
}

export const readUser = (state) => {
    return state.UserReducer.user;
}

export const readAllUsers = (state) => {
    return state.UserReducer.users;
}


export default reducer;