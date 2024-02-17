import { Route, Routes } from "react-router-dom";
import PageNotFound from "../PageNotFound";
import DepartmentList from "./DepartmentList";
import DepartmentRegistration from "./DepartmentRegistration";

function DepartmentRoutes(props: any) {
  return (
    <Routes>
      <Route index element={<DepartmentList />} />
      <Route path="add-new" element={<DepartmentRegistration />} />
      {/* <Route path="edit/:type" element={<DepartmentEdit />} /> */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default DepartmentRoutes;
