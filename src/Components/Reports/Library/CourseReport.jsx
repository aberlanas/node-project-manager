// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import React, { useEffect, useCallback, useState } from "react";
import Http from "../../../Helpers/Http";
import { connect } from "react-redux";
import { DatePicker, Select } from "antd";

import { readReport } from "../../../Redux/Reducers/ReportReducer";
import { editReport } from "../../../Redux/Actions/ReportActions";
import moment from "moment";

const CourseReport = ({ report, editReport }) => {
  const { Option } = Select;
  //const CheckboxGroup = Checkbox.Group;

  let plainOptions = ["Apple", "Pear", "Orange"];
  const defaultCheckedList = ["Apple", "Orange"];

  const [courseSource, setCourseSource] = useState([]);
  const [course, setCourse] = useState("");
  const [projectsSource, setProjectsSource] = useState([]);
  const [announcement, setAnnouncement] = useState("Ordinaria");

  function onChangeDate(date, dateString) {
    report.reportData = {...report.reportData, date: date };
    editReport(report);
  }

  const handleChangeCourse = (value) => {
    console.log(`Curso seleccionado ${value}`);
    report.reportData = {users:[],date:""};
    setCourse(value);
  };

  function handleChangeAnnouncement(value) {
    console.log(`selected ${value}`);
  }

  const replenishTableCourses = async () => {
    const data = await Http.get("/api/courses/getAllCourses");
    setCourseSource(
      data.map((item) => {
        console.log(item);
        item.key = item.id;
        return item;
      })
    );
  };

  const replenishTableProjects = async () => {
    if (!course) return;

    const data = await Http.get(
      "/api/projects/findAllProjectsByCourse/" + course
    );
    setProjectsSource(data);
  };

  const replenishTableUsersProject = async () => {
    if (!projectsSource) return;
    console.log("Busca usuarios");
  };

  const storeUser = (e) => {
    if (e.target.checked){
      console.log(e.target)
      report.reportData.users.push(e.target.id);
      console.log(report);
    }else{
      console.log(e.target.id)
      console.log("Nani");
      report.reportData.users.splice(report.reportData.users.indexOf(e.target.id),1);
    }
  }

  useEffect(() => {
    replenishTableUsersProject();
  }, [projectsSource]);

  useEffect(() => {
    replenishTableProjects();
  }, [course]);

  useEffect(() => {
    
    replenishTableCourses();
  }, []);

  return (
    <div>
      <div>
        Selecciona curso :
        <Select style={{ width: 120 }} onChange={handleChangeCourse}>
          {courseSource.map((course) => {
            return (
              <Option key={course.id} value={course.id}>
                {course.nombre}
              </Option>
            );
          })}
        </Select>
      </div>
      <br />
      <div>
        Convocatoria :
        <Select
          style={{ width: 120 }}
          defaultValue="Ordinaria"
          onChange={handleChangeAnnouncement}
        >
          <Option value="Ordinaria">Ordinaria</Option>
          <Option value="Extraordinaria">Extraordinaria</Option>
        </Select>
      </div>
      <br />

      <div>
        {projectsSource.map((user) => {
          return (
            <label key={user.id}>
              <input
                className="cb_users"
                type="checkbox"
                id={user.id}
                value={user.id}
                onChange={storeUser}
              />
              {user.nombre} {user.apellidos}
            </label>
          );
        })}
      </div>

      <div>
        Selecciona fecha para el Informe : &nbsp;&nbsp;
        <DatePicker onChange={onChangeDate} defaultValue={moment()} />
        <br />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { report: readReport(state) };
};

export default connect(mapStateToProps, {
  readReport,
  editReport,
})(CourseReport);
