import React from "react";
import moment from "moment";

const ProjectCard = ({ project }) => {
  return (
    <div className="p-6    bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 hover:shadow-lg dark:border-gray-700 ">
      <div className="flex flex-col space-y-9 justify-content-between align-items-center">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          {project.name}
        </h5>

        <div className="py-4">
          <a
            className="text-gray-900 bg-gray-100  border-gray-300 focus:outline-none hover:bg-gray-200 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            href={`/projects/${project.id}`}
          >
            View
          </a>
        </div>
      </div>
      <p className="small">
        Status:{" "}
        <span
          className={`${
            project.status === "Not Started"
              ? "bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300"
              : project.status === "In Progress"
              ? "bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300"
              : "bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
          }`}
        >
          {project.status}
        </span>
      </p>
      <div className="flex flex-col mt-12 space-y-2">
                <div className="text-sm font-semibold">Created:<span className="pl-2 text-xs text-gray-600 font-light">{moment(project.createdAt).format("YYYY-MM-DD HH:mm:ss")}</span></div>
                <div className="text-sm font-semibold">Updated:<span className="pl-2 text-xs text-gray-600 font-light">{moment(project.updatedAt).format("YYYY-MM-DD HH:mm:ss")}</span></div>


              </div>
    </div>
  );
};

export default ProjectCard;
