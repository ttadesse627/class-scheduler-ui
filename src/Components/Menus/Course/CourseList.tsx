import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../../styles/grid-style.css";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { UUID } from "crypto";
import ToastNotification from "../../Common/ToastNotification";
import { api_url } from "../../../Environment";
import ICourseData from "../../Interfaces/ICourseData";

const CourseList: React.FC<ICourseData | { courseData?: ICourseData }> = () => {
  document.title = "List of Courses";
  const [data, setData] = useState<ICourseData["courseData"][]>();
  let rows: React.JSX.Element[] = [];

  useEffect(() => {
    handleGetList();
  }, []);

  if (data !== undefined) {
    if (data.length > 0) {
      rows = data.map((course, index) => (
        <tr key={`${course!.id}-${index}`} className="table-row">
          <td className="row-data">{index + 1}</td>
          <td className="row-data">{course!.courseCode}</td>
          <td className="row-data">{course!.name}</td>
          <td className="row-data">{course!.ects.toFixed()}</td>
          <td className="row-data">{course!.creditHours.toFixed()}</td>
          <td className="row-data">
            <button
              type="button"
              title="Delete"
              style={{ padding: 0, margin: 0 }}
              onClick={() => handleDelete(course!.id)}
            >
              <img
                src="src\assets\images\icons\seo-social-web-network-internet_262_icon-icons.com_61518.png"
                alt="delete"
                style={{ width: 30, height: 30 }}
              />
            </button>
            <button
              type="button"
              title="View"
              onClick={() => ToastNotification.SuccessNotification(course!.id)}
            >
              <img
                src="src\assets\images\icons\view-1.png"
                alt="view detail"
                style={{ width: 25, height: 25 }}
              />
            </button>
          </td>
        </tr>
      ));
    }
  }

  const handleGetList = async () => {
    var response = null;
    try {
      response = await axios.get(`${api_url}/Course`);
      setData(response.data.data);
    } catch (error) {
      ToastNotification.ErrorNotification("" + error);
    }
  };

  const handleDelete = async (id: UUID) => {
    var response = null;
    try {
      response = await axios.delete(`${api_url}/Course/Delete/${id}`);
      if (response.status === 200) {
        ToastNotification.SuccessNotification(
          response.status + ":" + response.statusText
        );
        handleGetList();
      }
    } catch (error) {
      ToastNotification.ErrorNotification("" + error);
    }
  };

  return (
    <div className="grid-container">
      <Link to="add-new">Add New</Link>
      {rows.length > 0 ? (
        <table className="grid-table">
          <thead className="table-head">
            <tr className="table-head-row">
              <th>No.</th>
              <th>Name</th>
              <th>Course Code</th>
              <th>ECTS</th>
              <th>Credit Hours</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      ) : (
        <p>No data found!</p>
      )}
      <ToastContainer />
    </div>
  );
};

export default CourseList;
