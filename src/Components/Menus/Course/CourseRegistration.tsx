import React, {useState } from "react";
import { InputField } from "../../Common/InputField/InputField";
import {ICourseData} from "../../Interfaces/FormData";
import { FaCut } from "react-icons/fa";

const CourseRegistration: React.FC<{getCourseCollection: (
  newCourseCollection: ICourseData["courseData"][]
) => void;
} > = ({getCourseCollection}) => {
  const [courseFormData, setCourseFormData] = useState<ICourseData["courseData"]>(
    {
      id: undefined,
      name: "",
      courseCode: "",
      creditHours: 0,
      ects: 0
    }
  );
  const [courseCollection, setCourseCollection] = useState<
    ICourseData["courseData"][]
  >([]);

  let tableRows: JSX.Element[] = [];

  let changeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { type, name, value } = e.target;
    let parsedValue = type === "number" ? parseInt(value, 10) : value;
    if (typeof parsedValue === "number" && isNaN(parsedValue)) parsedValue = 0;
    setCourseFormData({ ...courseFormData, [name]: parsedValue });
  };

  const addTest = (e: React.FormEvent) => {
    e.preventDefault();
    const newCourseCollection = [...courseCollection, courseFormData];
    setCourseCollection(newCourseCollection);
    setCourseFormData({
      id: undefined,
      name: "",
      courseCode: "",
      creditHours: 0,
      ects: 0
    })
  };

  if (courseCollection.length > 0) {
    tableRows = courseCollection.map((course, index) => (
      <tr key={`${course.id}-${index}`} className="w-full p-1">
        <td className="text-center">{index + 1}</td>
        <td className="text-center">{course.courseCode}</td>
        <td className="text-center">{course.name}</td>
        <td className="text-center">{course.ects.toFixed()}</td>
        <td className="text-center">{course.creditHours.toFixed()}</td>
        <td className="text-center">
          <button
            className="w-8 h-8"
            type="button"
            title="Remove"
            style={{ padding: 0, margin: 0 }}
            onClick={() => handleRemove(course.courseCode)}
          >
            <FaCut />
          </button>
        </td>
      </tr>
    ));
  } 

  const handleRemove = (courseCode: string) => {
setCourseCollection(courseCollection.filter((course) => course.courseCode != courseCode))
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    getCourseCollection(courseCollection);
  }

  const { name, courseCode, creditHours, ects } = courseFormData;

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
          </div>
          <button onClick={addTest}>Add More</button>
        </div>
        {tableRows.length > 0 ? (
        <><div className="w-3/5 mt-4 rounded p-1 shadow shadow-black">
          <table className="w-full">
            <thead>
              <tr className="text-center">
                <th>Index</th>
                <th>Course Name</th>
                <th>Course Code</th>
                <th>Credit Hours</th>
                <th>ECTS</th>
              </tr>
            </thead>
            <tbody>
              {tableRows}
            </tbody>
          </table>
          
        </div>
        <button className="w-40 h-8 text-center text-white text-lg m-4 ml-20 right-4 rounded bg-primary p-1 shadow shadow-black" type="submit">Finish</button>
        </>): <></>}
      </form>
  );
};

export default CourseRegistration;
