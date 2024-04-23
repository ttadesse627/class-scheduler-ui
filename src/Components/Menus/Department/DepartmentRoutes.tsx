import { Route, Routes } from "react-router-dom";
import PageNotFound from "../PageNotFound";
import DepartmentRegistration from "./DepartmentRegistration";
import DepartmentList from "./DepartmentList";

function DepartmentRoutes() {
  return (
    <Routes>
      <Route
        index
        element={
          <DepartmentList departmentData={{
            id: undefined,
            name: "",
            shortName: "",
            numberOfSemisters: 0,
            currentSemister: 0,
            Courses: undefined
          }} />
        }
      />
      <Route
        path="add-new"
        element={
          <DepartmentRegistration
            departmentData={{
              id: undefined,
              name: "",
              shortName: "",
              numberOfSemisters: 0,
              currentSemister: 0,
              Courses: undefined,
            }}
          />
        }
      />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default DepartmentRoutes;
