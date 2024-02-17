import { useEffect, useRef, useState } from "react";
import "../../styles/header-style.css";

function Header() {
  const [cssClass, setCssClass] = useState("hidden-profile");
  const profileContainerRef = useRef(null);

  let displayProfileMenu = () => {
    setCssClass("displayed-profile");
  };

  const handleClickOutside = (event: any) => {
    if (
      profileContainerRef.current &&
      !profileContainerRef.current.contains(event.target)
    ) {
      setCssClass("hidden-profile");
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [profileContainerRef]);

  return (
    <div className="header">
      <div className="app-logo">
        <img src="src\assets\images\icons\honey-2.png" alt="App-Logo" />
        <span className="app-name">
          <h1>My App</h1>
        </span>
      </div>
      <div className="account-menu">
        <div className="login">
          <ul>
            <li>Sign In</li>
          </ul>
        </div>
        <div
          className="profile-container"
          onClick={displayProfileMenu}
          ref={profileContainerRef}
        >
          <img
            src="src\assets\images\icons\user_1077063.png"
            alt="React-Logo"
          />
          <div className={cssClass}>
            <span>
              <i>Sign Out</i>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
