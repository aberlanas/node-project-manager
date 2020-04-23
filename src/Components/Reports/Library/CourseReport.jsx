// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import React, { useEffect, useState } from "react";
import Http from "../../../Helpers/Http";
import { connect } from "react-redux";
import { DatePicker, Select } from "antd";

import "./CourseReport.css";

import { readReport } from "../../../Redux/Reducers/ReportReducer";
import { editReport } from "../../../Redux/Actions/ReportActions";
import moment from "moment";

const CourseReport = ({ report, editReport }) => {
  const { Option } = Select;
  //const CheckboxGroup = Checkbox.Group;

  const [courseSource, setCourseSource] = useState([]);
  const [course, setCourse] = useState("");
  const [projectsSource, setProjectsSource] = useState([]);
  const [announcement, setAnnouncement] = useState("Ordinaria");

  function onChangeDate(date, dateString) {
    report.reportData = { ...report.reportData, date: date };
    editReport(report);
  }

  const handleChangeCourse = (value) => {
    console.log(`Curso seleccionado ${value}`);
    report.reportData = { users: [], date: "" };
    setCourse(value);
  };

  function handleChangeAnnouncement(value) {
    console.log(`selected ${value}`);
    setAnnouncement(value);

    const mustBeChecked = value !== "Extraordinaria";

    document.querySelectorAll("input[type]").forEach((e) => {
      e.checked = mustBeChecked;
      storeUser(e);
    });
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

  const storeUser = (ev) => {
    let e = ev.target ? ev.target : ev;
    if (e.checked) {
      report.reportData.users.push(e.id);
    } else {
      report.reportData.users.splice(report.reportData.users.indexOf(e.id), 1);
    }
  };

  useEffect(() => {
    replenishTableUsersProject();
    document.querySelectorAll("input[type]").forEach((e) => storeUser(e));
  }, [projectsSource]);

  useEffect(() => {
    replenishTableProjects();
  }, [course]);

  useEffect(() => {
    replenishTableCourses();
  }, []);

  return (
    <div>
      <div className="titleReport">Informe de Proyectos por Curso</div>
      <div>
        <div className="paramsReport">
          <div>Curso</div>
          <div>
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

          <div>Convocatoria</div>

          <div>
            <Select
              style={{ width: 120 }}
              defaultValue="Ordinaria"
              onChange={handleChangeAnnouncement}
            >
              <Option value="Ordinaria">Ordinaria</Option>
              <Option value="Extraordinaria">Extraordinaria</Option>
            </Select>
          </div>

          <div>Fecha</div>
          <div>
            <DatePicker onChange={onChangeDate} defaultValue={moment()} />
          </div>
        </div>
        
        <div className="usersFromCourseTitle">
          {(projectsSource.length) ? "Alumnado del Curso " : ""}  
        </div>
        
        <div className="usersFromCourse">
          {projectsSource.map((user) => {
            return (
              <label key={user.id}>
                <input
                  className="cb_users"
                  type="checkbox"
                  id={user.id}
                  value={user.id}
                  onChange={storeUser}
                  defaultChecked={announcement == "Ordinaria" ? true : ""}
                />
                {user.nombre} {user.apellidos}
              </label>
            );
          })}
        </div>
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
