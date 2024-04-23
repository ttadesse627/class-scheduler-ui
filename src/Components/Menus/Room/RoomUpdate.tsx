import React, {useState } from "react";
import { InputField, SelectField } from "../../Common/InputField/InputField";
import {ICourseData} from "../../Interfaces/FormData";
import { handleGet } from "../../Services/CrudServices";
import ToastNotification from "../../Common/ToastNotification";

const RoomUpdate: React.FC<{editCourse: (
  prevCourseData: ICourseData["courseData"]
) => void;
course: ICourseData["courseData"];
} > = ({editCourse, course}) => {

  const [courseFormData, setCourseFormData] = useState<ICourseData["courseData"]>(course);

  let changeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { type, name, value } = e.target;
    let parsedValue = type === "number"? parseInt(value, 10) : value;
    setCourseFormData({ ...courseFormData, [name]: parsedValue });
  };

  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  }

  const { name, courseCode, creditHours, ects, departmentName } = courseFormData;

  return (
      <form className="p-2" onSubmit={handleSubmit}>
        <h1 className="text-2xl">Course Registration Form</h1>
        <div>
          <div className="mt-2 ml-2 p-1 w-fit grid grid-cols-3">
            <InputField
              id="name"
              type="text"
              name="name"
              label="Course Name"
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
              label="Credit Hours"
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
            <SelectField
              id="departmentId"
              type="text"
              name="departmentId"
              label="Department"
              value={departmentName}
              onChange={changeInputHandler}
            />
          </div>
          <button className="w-40 h-8 text-center text-white text-lg m-4 ml-20 right-4 rounded bg-primary p-1 shadow shadow-black" type="submit">Update</button>
        </div>
      </form>
  );
};

export default RoomUpdate;
