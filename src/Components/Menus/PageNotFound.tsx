import { useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function PageNotFound() {
  useEffect(() => {
    document.title = "Page Not found";
  }, []);
  return (
    <div className="w-5/6 bg-slate-50 text-red-800 rounded p-5 shadow-lg">
      <h1 className="text-red-900 text-2xl">Oops!!!</h1>
      <h3>This page does not exist!</h3>
      <p>
        Go to <NavLink to="/" className="text-blue-800">Homepage</NavLink>.
      </p>
    </div>
  );
}
