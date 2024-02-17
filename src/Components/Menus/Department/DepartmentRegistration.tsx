import React, { useState } from "react";
import { InputField } from "../../Common/InputField/InputField";
import Button from "../../Common/Button/Button";
import "../../../styles/form-style.css";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { submitPost } from "./../../Services/CrudServices";
import IDepartmentData from "../../Interfaces/IDepartmentData";

const DepartmentRegistration: React.FC<IDepartmentData> = () => {
  const title = "Department Registration";
  document.title = title;
  const [formData, setFormData] = useState<IDepartmentData["departmentData"]>({
    id: "00000000-0000-0000-0000-000000000000",
    name: "",
    shortName: "",
    numberOfSemisters: 0,
    currentSemister: 0,
    Courses: [],
  });

  let changeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { type, name, value } = e.target;
    let parsedValue = type === "number" ? parseInt(value, 10) : value;
    if (typeof parsedValue === "number" && isNaN(parsedValue)) parsedValue = 0;
    setFormData({ ...formData, [name]: parsedValue });
  };

  const { name, shortName, numberOfSemisters, currentSemister } = formData;

  let handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    var response = submitPost(
      "Department",
      formData,
      "Department created Successfully"
    );

    if ((await response).success) {
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
    <div className="container">
      <Link to="/departments">Back</Link>
      <h1>{title} Form</h1>
      <form className="input-form" onSubmit={handleSubmit}>
        <div className="input-container">
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
        <Button id="addButton" type="button" text="Add Course" />
        <Button id="submitButton" type="submit" text="Submit" />
      </form>
      <ToastContainer />
    </div>
  );
};

export default DepartmentRegistration;
