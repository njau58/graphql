import React, { useState, useEffect, useLayoutEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectQueries";
import Spinner from "./Spinner";
import { AiOutlineReload } from "react-icons/ai";
import options from "../lib/apexChartIOptions";

const ProjectsChart = () => {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  const [series, setSeries] = useState([]);
  const [percantateRep, setPercentageRep] = useState([]);

  console.log(data);
  useEffect(() => {
    if (data && !loading && !error) {
      const completed = data.projects.filter(
        (project) => project.status === "Completed"
      ).length;

      setSeries((prev) => [...prev, completed]);
      const inComplete = data.projects.filter(
        (project) => project.status === "Not Started"
      ).length;
      setSeries((prev) => [...prev, inComplete]);
      const inProgress = data.projects.filter(
        (project) => project.status === "In Progress"
      ).length;
      setSeries((prev) => [...prev, inProgress]);
    }
  }, [data, error, loading]);

  useLayoutEffect(() => {
    if (series.length > 0) {
      const completedPercentage = (
        (series[0] / data.projects.length) *
        100
      ).toFixed(2);
      setPercentageRep((prev) => [...prev, completedPercentage]);
      const notStartedPercentage = (
        (series[1] / data.projects.length) *
        100
      ).toFixed(2);
      setPercentageRep((prev) => [...prev, notStartedPercentage]);
      const inProgressPercentage = (
        (series[2] / data.projects.length) *
        100
      ).toFixed(2);
      setPercentageRep((prev) => [...prev, inProgressPercentage]);
    }
  }, [series, data]);

  const reloadPage = () => {
    window.location.reload();
  };

  const renderUI = () => {
    if (error)
      return (
        <div className="mx-auto flex flex-col space-y-4  items-center justify-center ">
          <p>An error ocurred while loading stats. </p>
          <button
            onClick={reloadPage}
            className=" flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg "
          >
            <span className="inline pr-2">
              <AiOutlineReload />
            </span>
            Reload
          </button>
        </div>
      );

    if (loading)
      return (
        <div className="flex flex-row items-center justify-center my-32">
          <Spinner />
        </div>
      );

    if (!error && !loading && data)
      return (
        <div>
          <div className="mb-2">
            <div id="chartThree" className="mx-auto flex justify-center">
              <ReactApexChart options={options} series={series} type="donut" />
            </div>
          </div>

          <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row w-full justify-between max-w-xl mx-auto">
            <div className="flex flex-row space-x-2">
              <span className="text-xs md:text-base font-medium text-gray-500 dark:text-white">
                {" "}
                Complete:{" "}
              </span>
              <span className="text-gray-900 font-bold text-sm md:text-base ">
                {" "}
                {percantateRep[0]}%
              </span>
            </div>
            <div className="flex flex-row space-x-2">
              <span className="text-xs md:text-base font-medium text-gray-500 dark:text-white">
                {" "}
                Not Started:{" "}
              </span>
              <span className="text-gray-900 font-bold text-sm md:text-base ">
                {" "}
                {percantateRep[1]}%
              </span>
            </div>
            <div className="flex flex-row space-x-2">
              <span className="text-xs md:text-base font-medium text-gray-500 dark:text-white">
                {" "}
                In Progress:{" "}
              </span>
              <span className="text-gray-900 font-bold text-sm md:text-base ">
                {" "}
                {percantateRep[2]}%
              </span>
            </div>
          </div>
        </div>
      );
  };

  return (
    <div className=" rounded-lg hover:shadow-lg  max-w-6xl mx-auto  mt-4  border border-stroke bg-white px-5 pt-12 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-12 xl:col-span-5">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            Project Status Analytics
          </h5>
        </div>
        <div></div>
      </div>
      {data.projects.length > 0 ? (
        renderUI()
      ) : (
        <div className="flex items-center justify-center font-light py-12">
          No enough data for statistics.
        </div>
      )}
    </div>
  );
};

export default ProjectsChart;
