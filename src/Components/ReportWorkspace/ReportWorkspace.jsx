// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import React, { useState } from "react";
import { Button } from "antd";
import Http from "../../Helpers/Http";

import {  Route } from "react-router-dom";
import { connect } from "react-redux";
import { readAllReports,readReport } from "../../Redux/Reducers/ReportReducer";


import "./ReportWorkspace.css"

const ReportWorkspace = ({ component: Component, report,...rest }) => {

    return (

        <Route
          {...rest}
          render={(props) =>
            <div className="reportWorkspace">
            <Component {...props} />
            <hr/>
            <Button
                onClick={async ()=>{
                  console.log(report.reportData);
                  const pdfBlob = await Http.postPDF(report,report.reportUrl);
                  const url = URL.createObjectURL(pdfBlob);
                  window.open(url,'_blank');
                }}
            >Dale</Button>
            </div>  
          }
        />
      );
    };

const mapStateToProps = (state) => {
    return { reports: readAllReports(state), report: readReport(state) };
};

export default connect(mapStateToProps, {
    readReport,
    readAllReports
})(ReportWorkspace);
      



    