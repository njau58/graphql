import React from "react";
import useToggle from "../customHooks/useToggle";
import { useQuery } from "@apollo/client";
import { GET_CLIENTS } from "../queries/clientQueries";

const Banner = () => {
  const { data } = useQuery(GET_CLIENTS);


  const renderBanner = () => {
    return data?.clients?.length === 0 ? (
      <div className=" relative mt-16 text-white text-center w-full bg-gray-800  text-xs  py-2">
        <div>To get Started, create client(s) first </div>
      </div>
    ) : (
      ""
    );
  };

  return <div>{renderBanner()}</div>;
};

export default Banner;
