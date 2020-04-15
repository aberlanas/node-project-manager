import React from "react";
import { Menu } from "antd";

import Http from "../../Helpers/Http";

const ReportsMenu = () => {

  return (
    <Menu className="projectMenu" style={{ width: 250 }} mode="inline">
          <Menu.Item
            key="1"
            onClick={async (e) => {
               console.log("eeee");
               window.location=("http://localhost:3000/api/reports/reportAllProjects");
               
              }}
          >
            Listado de Proyectos por Curso
          </Menu.Item>
    </Menu>
  );
};

export default ReportsMenu;
