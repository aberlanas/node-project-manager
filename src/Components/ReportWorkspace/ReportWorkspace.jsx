// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import React from "react";
import { Button, notification } from "antd";
import { FilePdfOutlined } from "@ant-design/icons";
import Http from "../../Helpers/Http";

import {  Route } from "react-router-dom";
import { connect } from "react-redux";
import { readAllReports,readReport } from "../../Redux/Reducers/ReportReducer";


import "./ReportWorkspace.css"




const ReportWorkspace = ({ component: Component, report,...rest }) => {

  const openNotification = result => {
    // TODO : 
    switch (result.type){
      case "success":
        notification.success({
          message: `${result.message}`,
          placement:'bottomRight'
        });
        break;
      default:
        notification.error({
          message: result.message,
          placement:'bottomRight'
        });
    }
  };




    return (

        <Route
          {...rest}
          render={(props) =>
            <div className="reportWorkspace">
            <Component {...props} />
            <hr/>
            <div className="buttonEra">

            <Button
                className="buttonReport"
                ghost={false}
                type="default" 
                icon={<FilePdfOutlined />}
                onClick={async ()=>{
                  const pdfBlob = await Http.postPDF(report,report.reportUrl);
                  if (pdfBlob.message){
                    openNotification(pdfBlob);
                  }else{
                    const url = URL.createObjectURL(pdfBlob);
                    window.open(url,'_blank');
                }
                }}
            >Generar Informe</Button>
            </div>
            
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
      



    