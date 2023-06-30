import React from "react";
import { ScaleLoader } from "react-spinners";

const Spinner = () => {
  return (
    <div className="d-flex justify-content-center">
      <ScaleLoader color="#3b82f6" height={15} />
    </div>
  );
};

export default Spinner;
