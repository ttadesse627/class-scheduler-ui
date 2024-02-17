import { Route, Routes } from "react-router-dom";
import Home from "./HomeMenu/Home";
import PageNotFound from "./PageNotFound";

function Menu() {
  return (
    <div className="routes">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" Component={PageNotFound} />
      </Routes>
    </div>
  );
}

export default Menu;
