import React from "react";
// import "./../../styles/spinner.css";
import "../../assets/font-awesome-4.7.0/css/font-awesome.min.css";

const Spinner: React.FC = () => {
  return (
    <div className="spinner">
      <div className="spinner-border" role="status"></div>
    </div>
  );
};

export default Spinner;
