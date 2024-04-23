import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ToastNotification from "../../Common/ToastNotification";
import {IDepartmentData} from "../../Interfaces/FormData";
import { handleDelete, handleGet } from "../../Services/CrudServices";
import { FaReadme, FaSpinner } from "react-icons/fa6";
import { FaCut } from "react-icons/fa";

const DepartmentList: React.FC<IDepartmentData> = () => {

  document.title = "List of Departments";
  const [data, setData] = useState<IDepartmentData["departmentData"][]>([]);
  const [isloading, setIsLoading] = useState(true);
  let rows: React.JSX.Element[] = [];

  useEffect(() => {
    getData();
  }, []);

  if (data.length > 0) {
    rows = data.map((dept, index) => (
      <tr key={`${dept.id}-${index}`} className="table-row">
        <td>{index + 1}</td>
        <td>{dept.name}</td>
        <td>{dept.shortName}</td>
        <td>{dept.numberOfSemisters.toFixed()}</td>
        <td>{dept.currentSemister.toFixed()}</td>
        <td>{dept.Courses ? dept.Courses.length : 0}</td>
        <td className="flex justify-evenly">
          <span
            className="w-8 h-8 m-2 border-none cursor-pointer"
            onClick={async () => {
              var { success } = await handleDelete(
                `Department/Delete/${dept.id}`
              );
              if (success) {
                ToastNotification.SuccessNotification("Successfully Deleted");
                getData();
              }
            }}
          >
            <FaCut/>
          </span>
          <span><FaReadme /></span>
        </td>
      </tr>
    ));
  }

  const getData = async () => {
      const { response, success } = await handleGet("Department/GetAll");
      if (success) {
        setData(response.data.data);
      }

    setIsLoading(false);
  }

  return (
    <div className="w-11/12 p-4 border-solid border border-gray-200 rounded shadow-black">
      <Link className="text-blue-700" to="add-new">Add New</Link>
      {isloading ? (
        <FaSpinner className="animate-spin"/>
      ) : rows.length > 0 ? (
        <table className="w-11/12 border-solid border border-gray-400 rounded p-1 border-collapse border-spacing-0">
          <thead className="text-lg">
            <tr>
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
