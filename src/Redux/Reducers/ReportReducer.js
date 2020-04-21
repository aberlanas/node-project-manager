const initialState = {report:{
    id:1,
    nombre:"Informe de Proyectos por Curso",
    componentResolver : "BasicReport",
    reportUrl : "api/reports/reportAllProjects",
    reportData : {}
    }
    ,reports:[]};

const reducer = (state=initialState,action) => {
    switch(action.type){

        case "GET_ALL_REPORTS":
                return{
                    ...state,
                    reports:action.reports
                };
        case "EDIT_REPORT":
            return {...state,
                report:action.report
            }
        case "SELECTED_REPORT":
                    return {
                      ...state,
                      report: state.reports.filter(repo => repo.id === action.id)[0]
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