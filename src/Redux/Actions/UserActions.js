export const logUser = (user) => {
    return {type:"LOG_USER",user}
}

export const logOutUser = (user) => {
    return {type:"LOGOUT_USER",user}
}