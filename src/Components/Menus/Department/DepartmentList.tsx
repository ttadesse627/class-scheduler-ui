import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../../styles/grid-style.css";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { UUID } from "crypto";
import ToastNotification from "../../Common/ToastNotification";
import { api_url } from "../../../Environment";
import IDepartmentData from "../../Interfaces/IDepartmentData";

const DepartmentList: React.FC<IDepartmentData> = () => {
  // const [counter, setCounter] = useState(1);
  document.title = "List of Departments";
  const [data, setData] = useState<IDepartmentData["departmentData"][]>();
  let rows: React.JSX.Element[] = [];

  useEffect(() => {
    handleGetList();
  }, []);

  if (data !== undefined) {
    if (data.length > 0) {
      rows = data.map((dept, index) => (
        <tr key={`${dept!.id}-${index}`} className="table-row">
          <td className="row-data">{index + 1}</td>
          <td className="row-data">{dept!.name}</td>
          <td className="row-data">{dept!.shortName}</td>
          <td className="row-data">{dept!.numberOfSemisters.toFixed()}</td>
          <td className="row-data">{dept!.currentSemister.toFixed()}</td>
          <td className="row-data">
            {dept!.Courses ? dept!.Courses.length : 0}
          </td>
          <td className="row-data">
            <button
              type="button"
              title="Delete"
              onClick={() => handleDelete(dept!.id)}
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
              onClick={() => ToastNotification.SuccessNotification(dept!.id)}
            >
              <img
                src="src\assets\images\icons\view-1.png"
                alt="view detail"
                style={{ width: 30, height: 30 }}
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
      response = await axios.get(`${api_url}/Department`);
      setData(response.data.data);
    } catch (error) {
      ToastNotification.ErrorNotification("" + error);
    }
  };

  const handleDelete = async (id: UUID) => {
    var response = null;
    try {
      response = await axios.delete(`${api_url}/Department/Delete/${id}`);
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
              <th>Id</th>
              <th>Name</th>
              <th>Short Name</th>
              <th>Number Of Semester</th>
              <th>Current Semester</th>
              <th>Number Of Courses</th>
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

export default DepartmentList;
