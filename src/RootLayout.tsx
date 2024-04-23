import { NavLink, Outlet } from "react-router-dom";

// import "./styles/menu-style.css";

export default function RootLayout() {
  return (
    <div className="w-full h-screen mt-24 pt-1 pr-2 pb-2 pl-1 flex flex-1 justify-start">
      <nav className="h-full w-52 fixed overflow-y-scroll overflow-x-hidden pt-5 top-28">
        <ul className="list-none m-0 p-0 w-full bg-gray-100 overflow-hidden">
          <li className="">
            <NavLink className="block text-black p-3 active:bg-black active:text-white" to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className="block text-black p-3 active:bg-black active:text-white" to="departments">
              Departments
            </NavLink>
          </li>
          <li >
            <NavLink className="block text-black p-3 active:bg-black active:text-white" to="courses">
              Courses
            </NavLink>
          </li>
          <li >
            <NavLink className="block text-black p-3 active:bg-black active:text-white" to="rooms">
              Rooms
            </NavLink>
          </li>
        </ul>
      </nav>

      <main className="ml-56 w-11/12 h-screen border-2 p-2 overflow-x-hidden shadow-md">
        <Outlet />
      </main>
    </div>
  );
}
