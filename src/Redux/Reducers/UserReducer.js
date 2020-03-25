const initialState = {user:null};


const reducer = (state=initialState,action) => {
    switch(action.type){
        case "LOG_USER":
            return {
                ...state,user:action.user
            }
        case "LOGOUT_USER":
                return {
                    ...state,user:null
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



export default reducer;