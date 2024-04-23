import { Route, Routes } from "react-router-dom";
import PageNotFound from "../PageNotFound";
import CourseList from "./CourseList";

function CourseRoutes() {
  return (
    <Routes>
      <Route index element={<CourseList />}/>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default CourseRoutes;
