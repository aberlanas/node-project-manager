
export const getAllReports = (reports) =>{
    return {type:"GET_ALL_REPORTS",reports}
}

export const selectedReport = (id) => {
    return {type:"SELECTED_REPORT",id}
}

export const editReport = (report) => {
    return {type:"EDIT_REPORT",report}
}
