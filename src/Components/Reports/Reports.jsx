import React, { useEffect, useCallback } from "react";
import Header from "../Header/Header";

import Http from "../../Helpers/Http";

import { connect } from "react-redux";
import { readAllReports,readReport } from "../../Redux/Reducers/ReportReducer";
import { getAllReports, selectedReport } from "../../Redux/Actions/ReportActions";
import ReportsMenu from "../ReportsMenu/ReportsMenu";


const Reports = ({report}) => {
  
  useEffect(()=>{
    
    
  },[report])

return (
    <React.Fragment>
      <Header />
      <ReportsMenu></ReportsMenu>

        
    </React.Fragment>
  );

};

export default Reports;
  