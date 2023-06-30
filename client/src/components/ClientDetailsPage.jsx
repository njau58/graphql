import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";

import Spinner from "../components/Spinner";
import ClientInfo from "../components/ClientInfo";

import DefaultLayout from "../layout/DefaultLayout";
import { AiOutlineReload } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import Breadcrumb from "../components/BreadCrumb";

import { GET_PROJECTS } from "../queries/projectQueries";
import { GET_CLIENT } from "../queries/clientQueries";

const ClientDetailsPage = () => {
  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_PROJECTS);

  const {
    loading: clientLoading,
    error: clientError,
    data: clientData,
  } = useQuery(GET_CLIENT, {
    variables: { id: id },
  });

  const clientProjects = data?.projects.filter(
    (project) => project.client.id === id
  );

  console.log(clientProjects);

  const reloadPage = () => {
    window.location.reload();
  };

  const renderUI = () => {
    if (loading || clientLoading)
      return (
        <div className="mx-auto flex items-center justify-center ">
          <Spinner />
        </div>
      );

    if (error || clientError)
      return (
        <div className="mx-auto flex flex-col space-y-4  items-center justify-center ">
          <p>An error ocurred while loading client. </p>
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

    if (!loading && !error && data && clientData)
      return (
        <div className="flex  items-center md:items-stretch max-w-7xl md:mx-auto my-4 md:space-x-4 flex-col space-y-6 md:flex-row md:space-y-0  w-full">
          <div className=" w-full h-72">
            {" "}
            <ClientInfo client={clientData.client}></ClientInfo>
          </div>
          {clientProjects.length > 0 ? (
            <>
              {" "}
              <div className=" w-full p-4 bg-white border rounded-md">
                <div className="mb-4 text-sm text-gray-500">
                  Projects for client{" "}
                  <span className="font-medium text-gray-800">
                    {clientData?.client?.name}
                  </span>
                </div>
                <table class="w-full overflow-scroll text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" class="px-4 py-3">
                        Project
                      </th>
                      <th scope="col" class="px-4 py-3">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="rounded-b-md">
                    {clientProjects.map((project) => {
                      return (
                        <tr className="bg-white border-b overflow-auto w-full dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                          <td className="px-6 py-4">
                            <Link
                              to={`/projects/${project.id}`}
                              className="text-sm hover:text-blue-500 hover:underline cursor-pointer "
                            >
                              {project.name}
                            </Link>
                          </td>
                          <td className="mx-12  py-4">
                            <div className="flex items-center">
                              {" "}
                              <span
                                className={`${
                                  project.status === "Not Started"
                                    ? "bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300"
                                    : project.status === "In Progress"
                                    ? "bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5  rounded dark:bg-yellow-900 dark:text-yellow-300"
                                    : "bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
                                }`}
                              >
                                {project.status}
                              </span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className="w-full p-12 bg-white  border flex justify-center items-center rounded-md text-sm font-normal">
           <div>   There are no project(s) for this client. You can create a project
              for{" "}
              <span className=" font-medium">{clientData?.client.name} </span>{" "}
              by creating a new project in <Link className="text-blue-500 hover:underline" to="/projects">Project module.</Link>{" "}</div>
            </div>
          )}
        </div>
      );
  };

  return (
    <>
      <DefaultLayout>
        <div className="mt-16">
          <Breadcrumb pageName={clientData?.client.name} />
        </div>
        {renderUI()}
      </DefaultLayout>
    </>
  );
};
export default ClientDetailsPage;
