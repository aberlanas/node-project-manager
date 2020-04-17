// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import React from "react";
import { connect } from "react-redux";
import { DatePicker } from 'antd';
import { readReport } from "../../../Redux/Reducers/ReportReducer";
import { editReport } from "../../../Redux/Actions/ReportActions";
import moment from "moment";

const BasicReport = ({report,editReport}) => {

    function onChange(date, dateString) {
        report.reportData = {date:date};
        editReport(report);
      }
      
    return (
        
       <div>
           Selecciona fecha para el Informe : &nbsp;&nbsp;
           <DatePicker onChange={onChange} defaultValue={moment()}/>
            <br />
           </div>
           );
    };

    const mapStateToProps = (state) => {
        return { report: readReport(state) };
    };
    
    export default connect(mapStateToProps, {
        readReport,
        editReport
    })(BasicReport);

    