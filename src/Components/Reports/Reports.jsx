import React, { useEffect, useCallback } from "react";
import { Button } from "antd";

import Header from "../Header/Header";

import Http from "../../Helpers/Http";

import { connect } from "react-redux";
import { readAllReports,readReport } from "../../Redux/Reducers/ReportReducer";
import { getAllReports, selectedReport } from "../../Redux/Actions/ReportActions";
import ReportsMenu from "../ReportsMenu/ReportsMenu";
import ReportWorkspace from "../ReportWorkspace/ReportWorkspace";


import BasicReport from "./Library/BasicReport";
import BasicReportDate from "./Library/BasicReportDate";
import CourseReport from "./Library/CourseReport";


const currentReports = [
    {
        id : 1,
        name : "Listado BASICO",
        componentResolver : "BasicReport",
        reportUrl : "/api/reports/reportAllProjects"
        } ,
    
      {
        id : 2,
        name : "Listado de Proyectos por Curso ",
        componentResolver : "CourseReport",
        reportUrl : "/api/reports/reportAllProjects"
        },
        { 
          id : 3,
          name : "Listado de Tecnologias por Curso ",
          componentResolver : "BasicReportDate",
          reportUrl : "http://www.google.es"
          } ,
        
]

const MapComponents = {
    "BasicReport": BasicReport,
    "BasicReportDate": BasicReportDate,
    "CourseReport" : CourseReport
}

const Reports = ({report,reports, getAllReports, selectedReport}) => {


  const replenishReports = useCallback ( async () =>{  
    await getAllReports(currentReports);
    selectedReport(1);
  },[getAllReports,selectedReport]);
  

  useEffect(()=>{
    replenishReports();
  },[replenishReports])

return (
    <React.Fragment>
      <Header />
      <ReportsMenu></ReportsMenu>      
      <ReportWorkspace component={MapComponents[report.componentResolver]}></ReportWorkspace>
    </React.Fragment>
  );

};

const mapStateToProps = (state) => {
  return { reports: readAllReports(state), report: readReport(state) };
};

export default connect(mapStateToProps, {
  getAllReports,
  selectedReport,
})(Reports);
