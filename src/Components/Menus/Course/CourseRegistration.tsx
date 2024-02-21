import React, { useEffect, useState } from "react";
import { InputField } from "../../Common/InputField/InputField";
import "../../../styles/form-style.css";
import ICourseData from "../../Interfaces/ICourseData";
import { FormControl } from "@mui/material";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

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

  const [open, setOpen] = useState(false);

  const descriptionElementRef = React.useRef<HTMLElement>(null);

  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

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
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle>Course Registration Form</DialogTitle>
        <DialogContent>
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
          </FormControl>
          <button onClick={addTest}>Add More</button>
        </DialogContent>
        <DialogActions>
          <button onClick={() => setOpen(false)}>Cancel</button>
          <button onClick={() => setOpen(false)}>Subscribe</button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CourseRegistration;
