import "./styles/App.css";
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

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="departments/*" element={<DepartmentRoutes />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    )
  );
  return (
    <div className="app-container">
      <Header />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
