export const createTech = (tech) => {
    return {type:"CREATE_TECH",tech}
}


export const selectedTech = (tech) => {
    return {type:"SELECTED_TECH",tech}
}

export const getAllTechs = (techs) =>{
    return {type:"GET_ALL_TECHS",techs}
}

export const removeTech = (id) =>{
    return {type:"REMOVE_TECH",id}
}

export const techEdit = id => {
    return {type:"EDITING_TECH",id}
}

export const editTechs = tech => {
    return {type:"EDIT_TECH",tech}
}