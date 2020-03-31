export const logUser = (user) => {
    return {type:"LOG_USER",user}
}

export const logOutUser = (user) => {
    return {type:"LOGOUT_USER",user}
}

export const createUser = (user) => {
    return {type:"CREATE_USER",user}
}

export const getAllUsers = (users) =>{
    return {type:"GET_ALL_USERS",users}
}

export const removeUser = (id) =>{
    return {type:"REMOVE_USER",id}
}

export const userEdit = id => {
    return {type:"EDITING_USER",id}
}

export const editUser = user => {
    return {type:"EDIT_USER",user}
}