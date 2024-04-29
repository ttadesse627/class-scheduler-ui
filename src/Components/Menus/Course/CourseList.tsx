import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import ToastNotification from "../../Common/ToastNotification";
import {ICourseData, ICourseForm} from "../../Interfaces/FormData";
import { handleDelete, handleGet, handlePost } from "../../Services/CrudServices";
import CourseRegistration from "./CourseRegistration";
import Button from "../../Common/Button/Button";
import { FaSpinner, FaTrashCan } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { SelectField } from "../../Common/InputField/InputField";


interface IDepatmentOption
{
  departmentOption: {
    value?: string;
    optionText: string;
  }
}

interface IDepatmentOption
{
  departmentOption: {
    value?: string;
    optionText: string;
  }
}

const CourseList: React.FC<ICourseData | { courseData?: ICourseData }> = () => {
  document.title = "List of Courses";
  const [data, setData] = useState<ICourseData["courseData"][]>();

  const [isloading, setIsLoading] = useState(true);
  const [isGrid, setIsGrid] = useState(true);
  const [displayModal, setDisplayModal] = useState("hidden")
  const [displayEditModal, setDisplayEditModal] = useState("hidden")
  const [displayForm, setDisplayForm] = useState("hidden")

  const [departmentOptions, setDepartmentOptions] = useState<IDepatmentOption["departmentOption"][]>([]);
  const [departmentId, setDepartmentId] = useState<string>();
  const [courses, setCourses] = useState<ICourseForm["courseForm"]["courses"]>([]);

  let coursePayload: ICourseForm["courseForm"] = {
    courses: [],
    departmentId: undefined
  }

  let rows: React.JSX.Element[] = [];
  

  useEffect(() => {
    getData();
  }, []);

  if (data != null || data != undefined) {
    if (data.length > 0) {
      rows = data.map((course, index) => (
        <tr key={`${course.id}-${index}`} className="table-row">
          <td className="p-1">{index + 1}</td>
          <td className="p-1">{course.name}</td>
          <td className="p-1">{course.courseCode}</td>
          <td className="p-1">{course.ects.toFixed()}</td>
          <td className="p-1">{course.creditHours.toFixed()}</td>
          <td className="p-1">{course.departmentName}</td>
          <td className="p-1 flex flex-row justify-around">
            <span className="" title="Delete"><FaTrashCan className="cursor-pointer" onClick={() => deleteCourse(course.id)}/></span>
            <span className=""  title="Edit"><FaEdit className="cursor-pointer"  onClick={() => editCourse(course)}/></span>
          </td>
        </tr>
      ));
    }
  }

  const getData = async() => {

    const response = await handleGet("Course/GetAll")
    console.log(response)
    if (response.status === 200) {
      setData(response.data)
      
    }
    setIsLoading(false)
  }

  let changeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDepartmentId(e.target.value);
  };

  const deleteCourse = async(id?: string) => {
    const confirm: boolean = window.confirm(`Do you wanna delete the course with an id ${id}`)
    if (confirm == true) {
      const response = await handleDelete(`Course/Delete/${id}`)
      console.log("response: "+response)
      if (response.status == 200) {
        ToastNotification.SuccessNotification("Successfully deleted the course")
        getData()
      }
      else {
        ToastNotification.ErrorNotification("Could not delete the course: "+response)
      }
    }
  }

  const getCourses = (courseCollection: ICourseData["courseData"][]) => {
    setCourses(courseCollection)
    setDisplayModal("hidden")
    setIsGrid(false)
    getDepartments()
    setDisplayForm("block")

    return courseCollection;
  }

  const addCourseHadler =() =>{
    setDisplayModal("block")
  }

  const handleSubmit =(e: React.FormEvent) =>{
    e.preventDefault();
    setIsGrid(true)
    getData()

    coursePayload = {courses: courses, departmentId: departmentId}
    submitCourseData(coursePayload)
  }

  const getDepartments = async() =>{
    const {response, success} = await handleGet("Department/GetForCourse")
    if (success) {
      const courseValues = response.data.data;
      if ((response.data.data != undefined)&&(response.data.data.length > 0)) 
      {
        let deptOptions: IDepatmentOption["departmentOption"][] = [{
          value: undefined,
          optionText: "--Select Value--"
        }];

        courseValues.map((dept: { id: string; shortName: string; name: string; }) => {
          deptOptions.push({value: dept.id, optionText: `${dept.shortName}-${dept.name}`})
        })
        setDepartmentOptions(deptOptions);
      }
    }
  }

  const submitCourseData = async (payload: ICourseForm["courseForm"]) => {
    console.log(payload)
    const response = await handlePost("Course/Create", payload)
    if (response.statusCode == 200) {
      ToastNotification.SuccessNotification("Successfully added the course/s")
      getData();
    }
    else{
      ToastNotification.ErrorNotification("Could not delete the required course/s")
      getData();
    }
  }

  const editCourse = (course: ICourseData["courseData"]) => {
    
  }

  return (
    <div className="w-11/12 p-4 border-solid border border-gray-200 rounded shadow-black">
        {isGrid?
        (<div>
          <div className="text-blue-600 m-4">
          <Button
              id="addButton"
              type="button"
              text="Add Course"
              onClick={addCourseHadler}
            />
        </div>
          {isloading? (<div><p>Loading...</p><FaSpinner className="animate-spin" /></div>): 
          (rows.length > 0 ? (
            <table className="w-3/4 rounded shadow shadow-black">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Name</th>
                  <th>Course Code</th>
                  <th>ECTS</th>
                  <th>Credit Hours</th>
                  <th>Department Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </table>
          ) : (
            <p>No data found!</p>
          ))}
            <div id="modal" className={`fixed z-10 left-0 top-0 w-full h-full overflow-auto bg-black opacity-80 ${displayModal}`}>
              <div className="rounded-lg bg-gray-200 my-32 mx-auto p-5 border border-solid border-gray-400 w-4/5">
                <span className="text-gray-600 float-right text-3xl font-bold hover:text-red-800 hover:cursor-pointer" onClick={() => setDisplayModal("hidden")}>&times;</span>
                  <CourseRegistration
                    getCourseCollection={getCourses}
                  />
              </div>
            </div>
          </div>): 
          (<div className={displayForm}>
            <form className="p-1 w-3/4" onSubmit={handleSubmit}>
              <SelectField id="departmentId" name="departmentId" type="select" label="Department" optionValues={departmentOptions} onChange={changeInputHandler} value={departmentId}/>
              <ul className="w-3/4 p-1 rounded shadow shadow-black mt-4 mb-4">
                {courses.map((course, index) => (<li key={index} className="p-1 w-full hover:bg-gray-300 border">{`${course.courseCode} => ${course.name}`}</li>))}
              </ul>
              <Button type="submit" text="Submit"/>
            </form>
          </div>)
        }
        <ToastContainer />
    </div>
  );
};

export default CourseList;
