export const createProject = (project) => {
    return {type:"CREATE_PROJECT",project}
}

export const getAllProjects = (projects) =>{
    return {type:"GET_ALL_PROJECTS",projects}
}

export const selectedProject = (project) => {
    return {type:"SELECTED_PROJECT",project}
}


export const removeProject = (id) =>{
    return {type:"REMOVE_PROJECT",id}
}

export const projectEdit = id => {
    return {type:"EDITING_PROJECT",id}
}

export const editProject = project => {
    return {type:"EDIT_PROJECT",project}
}