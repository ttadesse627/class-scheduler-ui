import React, { useState } from "react";
import { InputField } from "../../Common/InputField/InputField";
import Button from "../../Common/Button/Button";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { handlePost } from "./../../Services/CrudServices";
import {IDepartmentData} from "../../Interfaces/FormData";
import CourseRegistration from "../Course/CourseRegistration";
import {ICourseData} from "../../Interfaces/FormData";
// import '../../../styles/modal-style.css'

const DepartmentRegistration: React.FC<IDepartmentData> = () => {
  document.title = "Department Registration";

  const [courseCollection, setCourseCollection] = useState<
    ICourseData["courseData"][]
  >([]);

  const [formData, setFormData] = useState<IDepartmentData["departmentData"]>({
    id: "00000000-0000-0000-0000-000000000000",
    name: "",
    shortName: "",
    numberOfSemisters: 0,
    currentSemister: 0,
    Courses: [],
  });


  const [displayModal, setDisplayModal] = useState("display-none");

  let changeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { type, name, value } = e.target;
    let parsedValue = type === "number" ? parseInt(value, 10) : value;
    if (typeof parsedValue === "number" && isNaN(parsedValue)) parsedValue = 0;
    setFormData({ ...formData, [name]: parsedValue })
  };

  const updateCourseCollection = (
    newCoursecollection: ICourseData["courseData"][]
  ) => {
    setCourseCollection(newCoursecollection);
    setFormData({...formData, Courses: courseCollection});
  };
  const { name, shortName, numberOfSemisters, currentSemister } = formData;

  let handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);

    var {success} = await handlePost("Department", formData);

    if (success) {
      setFormData({
        id: "00000000-0000-0000-0000-000000000000",
        name: "",
        shortName: "",
        numberOfSemisters: 0,
        currentSemister: 0,
        Courses: [],
      });
    }
  };

  return (
    <div className="mt-2 ml-2 p-1 w-11/12 rounded">
      <Link className="text-blue-700" to="/departments">Back</Link>
      <h1 className="text-2xl">Department Registration Form</h1>
      <form className="input-form" onSubmit={handleSubmit}>
        <div className="mt-2 ml-2 p-1 w-fit grid grid-cols-3">
          <InputField
            id="name"
            type="text"
            name="name"
            label="Name"
            value={name}
            onChange={changeInputHandler}
          />
          <InputField
            id="shortName"
            type="text"
            name="shortName"
            label="Short Name"
            value={shortName}
            onChange={changeInputHandler}
          />
          <InputField
            id="numberOfSemisters"
            type="number"
            name="numberOfSemisters"
            label="Number of Semesters"
            value={numberOfSemisters}
            onChange={changeInputHandler}
          />
          <InputField
            id="currentSemister"
            type="number"
            name="currentSemister"
            label="Current Semester"
            value={currentSemister}
            onChange={changeInputHandler}
          />
        </div>
        <div id="modal" className={displayModal}>
          <div className="modal-content">
            <span className="close" onClick={() => setDisplayModal("display-none")}>&times;</span>
              <CourseRegistration
                getCourseCollection={updateCourseCollection}
              />
          </div>
        </div>
        <Button
          id="addButton"
          type="button"
          text="Add Course"
          onClick={() => setDisplayModal("display-block")}
        />
        <Button id="submitButton" type="submit" text="Submit" />
      </form>
      <ToastContainer />
    </div>
  );
};

export default DepartmentRegistration;
