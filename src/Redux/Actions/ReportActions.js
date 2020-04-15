
export const getAllReports = (reports) =>{
    return {type:"GET_ALL_REPORTS",reports}
}

export const selectedReport = (id) => {
    return {type:"SELECTED_REPORT",id}
}
