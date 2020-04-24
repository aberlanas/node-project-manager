
export const getAllReports = (reports) =>{
    return {type:"GET_ALL_REPORTS",reports}
}

export const selectedReport = (id) => {
    return {type:"SELECTED_REPORT",id}
}

export const editReport = (report) => {
    return {type:"EDIT_REPORT",report}
}

export const addUserReport = (userId) => {
    return {type:"ADD_USER_REPORT",userId}
}

export const removeUserReport = (userId) => {
    return {type:"REMOVE_USER_REPORT",userId}
}