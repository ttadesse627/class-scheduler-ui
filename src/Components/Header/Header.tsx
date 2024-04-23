import { useEffect, useRef, useState } from "react";
import {} from "react-icons/ai";
import { FaSchool } from "react-icons/fa6";
import { FaPray } from "react-icons/fa";

function Header() {
  const [cssClass, setCssClass] = useState("display-block");
  const profileContainerRef = useRef(null);

  let displayProfileMenu = () => {
    setCssClass("none");
  };

  const handleClickOutside = (event: Event) => {
    if (
      profileContainerRef.current &&
      !profileContainerRef.current.contains(event.target)
    ) {
      setCssClass("display-none");
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [profileContainerRef]);

  const toggleTheme = () => {
    const theme = localStorage.getItem("theme");
    if (theme === "bg-dark") {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <div className="flex flex-row justify-between p-[10px] bg-gray-400 sticky w-full top-0">
      <div className="bg-cyan-800">
        <FaSchool className="w-11" />
        <span className="app-name">
          <h1>My App</h1>
        </span>
      </div>
      <div className="flex flex-row justify-around p-2">
        <div className="w-full m-2 p-1">
          <ul className="inline-flex list-none">
            <li>Sign In</li>
          </ul>
        </div>
        <div
          className="flex flex-col justify-between p-0 border-2 w-12 h-12 container rounded-full"
          onClick={displayProfileMenu}
          ref={profileContainerRef}
        >
          <FaPray />
        </div>
        <div className={` ${cssClass}`}>
          <span>
            <ul className="list-none">
              <li>Sign Out</li>
              <li>
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="text-pretty w-2 rounded-md"
                >
                  Change Theme
                </button>
              </li>
            </ul>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Header;
