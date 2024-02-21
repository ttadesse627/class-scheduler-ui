import React, { useEffect, useState } from "react";
import { InputField } from "../../Common/InputField/InputField";
import Button from "../../Common/Button/Button";
// import "../../../styles/form-style.css";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { submitPost } from "./../../Services/CrudServices";
import IDepartmentData from "../../Interfaces/IDepartmentData";
import CourseRegistration from "../Course/CourseRegistration";
import ICourseData from "../../Interfaces/ICourseData";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import { FormControl } from "@mui/material";
import { red } from "@mui/material/colors";

const DepartmentRegistration: React.FC<IDepartmentData> = () => {
  document.title = "Department Registration";
  const [formData, setFormData] = useState<IDepartmentData["departmentData"]>({
    id: "00000000-0000-0000-0000-000000000000",
    name: "",
    shortName: "",
    numberOfSemisters: 0,
    currentSemister: 0,
    Courses: [],
  });

  const [courseFormData, setCourseFormData] = useState<
    ICourseData["courseData"]
  >({
    id: "00000000-0000-0000-0000-000000000000",
    name: "",
    courseCode: "",
    creditHours: 0,
    ects: 0,
  });

  const [displayCourseForm, setDisplayCourseForm] = useState(false);
  const [courseColection, setCourseCollection] = useState<
    ICourseData["courseData"][]
  >([]);
  const [open, setOpen] = useState(false);

  let changeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { type, name, value } = e.target;
    let parsedValue = type === "number" ? parseInt(value, 10) : value;
    if (typeof parsedValue === "number" && isNaN(parsedValue)) parsedValue = 0;
    setFormData({ ...formData, [name]: parsedValue });
  };

  const updateCourseFormData = (
    newCourseFormData: ICourseData["courseData"]
  ) => {
    setCourseFormData(newCourseFormData);
  };
  const updateCourseCollection = (
    newCoursecollection: ICourseData["courseData"][]
  ) => {
    setCourseCollection(newCoursecollection);
  };

  let removeListItem = (index: number) => {
    let newCoursecollection = courseColection.filter((_item, i) => i !== index);
    setCourseCollection(newCoursecollection);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);

  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const { name, shortName, numberOfSemisters, currentSemister } = formData;

  let handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(formData);
    var response = submitPost(
      "Departmentk",
      formData,
      "Department created Successfully"
    );
    console.log(courseColection);

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
    // <div className="container">
    <Container sx={{ background: red }}>
      <Link to="/departments">Back</Link>
      <h1>Department Registration Form</h1>
      <form className="input-form" onSubmit={handleSubmit}>
        <FormControl className="input-container">
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
        </FormControl>
        {displayCourseForm ? (
          <CourseRegistration
            courseData={courseFormData}
            updateCourseFormData={updateCourseFormData}
            updateCourseCollection={updateCourseCollection}
          />
        ) : (
          <></>
        )}
        <Button
          id="addButton"
          type="button"
          text="Add Course"
          onClick={() => handleClickOpen()}
        />
        {courseColection.length > 0 ? (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Index</TableCell>
                  <TableCell>Course Name</TableCell>
                  <TableCell>Course Code</TableCell>
                  <TableCell>Credit Hourse</TableCell>
                  <TableCell>ECTS</TableCell>
                  <TableCell>Remove</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {courseColection.map((course, index) => (
                  <TableRow>
                    <TableCell>{index}</TableCell>
                    <TableCell>{course.name}</TableCell>
                    <TableCell>{course.courseCode}</TableCell>
                    <TableCell>{course.creditHours.toFixed()}</TableCell>
                    <TableCell>{course.ects.toFixed()}</TableCell>
                    <TableCell>
                      <button onClick={() => removeListItem(index)}>
                        <img src="src\assets\images\icons\1564505_close_delete_exit_remove_icon.png" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <></>
        )}
        <Button id="submitButton" type="submit" text="Submit" />
      </form>
      <ToastContainer />
      {/* </div> */}
    </Container>
  );
};

export default DepartmentRegistration;
