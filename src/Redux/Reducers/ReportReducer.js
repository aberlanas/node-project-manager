const initialState = {report:{
    id:1,
    nombre:"Informe de Proyectos por Curso"
},reports:[]};

const reducer = (state=initialState,action) => {
    switch(action.type){

        case "GET_ALL_REPORTS":
                return{
                    ...state,
                    reports:action.reports
                }
        case "SELECTED_REPORT":
                    return {
                      ...state,
                      report: state.report
                    };
       
        default:
            return {
                ...state
            }
    }
}

export const readReport = (state) => {
    return state.ReportReducer.report;
}

export const readAllReports= (state) => {
    return state.ReportReducer.reports;
}

export default reducer;