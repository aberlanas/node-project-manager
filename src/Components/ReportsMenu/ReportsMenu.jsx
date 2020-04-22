import React from "react";
import { Menu } from "antd";

import {connect} from 'react-redux';
import { readAllReports,readReport } from "../../Redux/Reducers/ReportReducer";
import { selectedReport } from "../../Redux/Actions/ReportActions";

const ReportsMenu = ({selectedReport,reports}) => {

  return (
    <Menu className="projectMenu" style={{ width: 250 }} mode="inline">
         {
          reports.map((item) => {
            return (
            <Menu.Item
            key={item.id}
            onClick={async (e) => {
              selectedReport(parseInt(e.key));
              }}
          >
            {item.name}
          </Menu.Item>
            )})}
    </Menu>
  );
};

const mapStateToProps = (state) => {
  return { reports: readAllReports(state), report: readReport(state) };
};

export default connect(mapStateToProps, {
  readReport,
  readAllReports,
  selectedReport
})(ReportsMenu);

