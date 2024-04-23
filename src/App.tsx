import "react-toastify/ReactToastify.css";

import RootLayout from "./RootLayout";
import Header from "./Components/Header/Header";
import Home from "./Components/Menus/HomeMenu/Home";
import PageNotFound from "./Components/Menus/PageNotFound";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import DepartmentRoutes from "./Components/Menus/Department/DepartmentRoutes";
import CourseRoutes from "./Components/Menus/Course/CourseRoutes";
import RoomRoutes from "./Components/Menus/Room/RoomRoutes";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="departments/*" element={<DepartmentRoutes />} />
        <Route path="courses/*" element={<CourseRoutes />} />
        <Route path="rooms/*" element={<RoomRoutes />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    )
  );
  return (
    <div>
      <Header />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
