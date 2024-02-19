import React, { useState } from "react";
import { InputField } from "../../Common/InputField/InputField";
import "../../../styles/form-style.css";
import ICourseData from "../../Interfaces/ICourseData";

const CourseRegistration: React.FC<
  ICourseData & {
    updateCourseFormData: (
      newCourseFormData: ICourseData["courseData"]
    ) => void;
    updateCourseCollection: (
      newCourseCollection: ICourseData["courseData"][]
    ) => void;
  }
> = ({ courseData, updateCourseFormData, updateCourseCollection }) => {
  const [courseFormData, setCourseFormData] = useState(courseData);
  const [courseCollection, setCourseCollection] = useState<
    ICourseData["courseData"][]
  >([]);

  let changeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { type, name, value } = e.target;
    let parsedValue = type === "number" ? parseInt(value, 10) : value;
    if (typeof parsedValue === "number" && isNaN(parsedValue)) parsedValue = 0;
    setCourseFormData({ ...courseFormData, [name]: parsedValue });
    updateCourseFormData({ ...courseFormData, [name]: parsedValue });
  };

  const addTest = () => {
    const newCourseCollection = [...courseCollection, courseFormData];
    setCourseCollection(newCourseCollection);
    updateCourseCollection(newCourseCollection);
  };

  const { name, courseCode, creditHours, ects } = courseFormData;

  return (
    <>
      <h1>Course Registration Form</h1>
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
          id="courseCode"
          type="text"
          name="courseCode"
          label="Course Code"
          value={courseCode}
          onChange={changeInputHandler}
        />
        <InputField
          id="creditHours"
          type="number"
          name="creditHours"
          label="Number of Semesters"
          value={creditHours}
          onChange={changeInputHandler}
        />
        <InputField
          id="ects"
          type="number"
          name="ects"
          label="ECTS"
          value={ects}
          onChange={changeInputHandler}
        />
      </div>
      <button onClick={addTest}>Add More</button>
    </>
  );
};

export default CourseRegistration;
