import React from "react";
import { ScaleLoader } from "react-spinners";

const Spinner = ({ customColor, customHeight }) => {
  const options = {
    height: customHeight ? customHeight : 15,
    color: customColor ? customColor : "#3b82f6",
  };

  return (
    <div className="d-flex justify-content-center">
      <ScaleLoader color={options.color} height={options.height} />
    </div>
  );
};

export default Spinner;
