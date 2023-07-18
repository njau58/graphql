import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "../queries/projectQueries";
import Spinner from "../components/Spinner";
import ClientInfo from "../components/ClientInfo";
import DefaultLayout from "../layout/DefaultLayout";
import { AiOutlineReload } from "react-icons/ai";
import Breadcrumb from "../components/BreadCrumb";
import { AiOutlineEllipsis } from "react-icons/ai";
import ConfirmDeleteProject from "../components/ConfirmDeleteProject";
import EditProjectModal from "../components/EditProjectModal";
import moment from "moment";
import useToggle from "../customHooks/useToggle";

const Project = () => {
  const { id } = useParams();
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useToggle(false);
  const [showProjectEditModal, setShowProjectEditModal] = useToggle(false);
  const [showActions, setShowActions] = useToggle(false);

  const [daysDue, setDaysDue] = useState(0);
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id: id },
  });

  

  useEffect(() => {
    const due = new Date(data?.project.dueDate).getTime() / 1000;
    const diff = (due - new Date().getTime() / 1000) / 86400;
    console.log(diff);
    if (diff < 1) {
      setDaysDue("Today");
    } else {
      setDaysDue(diff.toFixed(0));
    }
  }, [data]);

  const reloadPage = () => {
    window.location.reload();
  };

  if (loading)
    return (
      <DefaultLayout>
        <div className="mx-auto flex items-center justify-center  h-screen my-auto mt-32">
          <Spinner />
        </div>
      </DefaultLayout>
    );

  if (error) return <DefaultLayout></DefaultLayout>;

  const renderUI = () => {
    if (error)
      return (
        <div className="mx-auto flex flex-col space-y-4  items-center justify-center ">
          <p>An error ocurred while loading projects. </p>
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
        <>
          <div className="mx-auto flex items-center justify-center mt-44  h-screen my-auto">
            <Spinner />
          </div>
        </>
      );

    if (!error && !loading && data)
      return (
        <div className=" mx-auto  max-w-8xl h-full bg ">
          <div className="flex flex-row justify-between items-center my-4 ">
            <div className="">
              {" "}
              <Link
                to="/projects"
                className="text-gray-900 bg-white pt-4  border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              >
                Back
              </Link>
            </div>

            <div className="flex flex-row items-center justify-start mt-3 space-x-4">
              <h5 className="text-gray-900 font-bold">Project Status:</h5>
              <div className="">
                <p
                  className={`${
                    data.project.status === "Not Started"
                      ? "bg-red-100  text-red-800 text-xs font-medium  px-4  rounded dark:bg-red-900 dark:text-red-300"
                      : data.project.status === "In Progress"
                      ? "bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300"
                      : "bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
                  }`}
                >
                  {data.project.status}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:justify-between space-y-6 md:space-y-0 md:space-x-6 ">
            <div className="border p-6 w-full rounded-md bg-white">
              <div className=" relative flex flex-row justify-between w-full mb-6">
                {" "}
                <h1 className="mb-2 text-xl font-medium tracking-tight text-gray-900 dark:text-white">
                  {data.project.name}
                </h1>
                <div>
                  <div
                    onClick={setShowActions
                    }
                    className="text-3xl font-bold rounded-full hover:bg-gray-100"
                  >
                    <AiOutlineEllipsis />
                  </div>
                  {showActions && (
                    <>
                      <div
                        onClick={setShowActions}
                        class="fixed top-0 left-0 right-0 z-30 bg-transparent bg-opacity-70  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0  h-screen"
                      ></div>
                      <div className=" absolute z-40 flex flex-col text-sm py-4  w-32 px-2 items-center space-y-4  border right-2   bg-white border-gray-200 rounded-lg">
                        <div
                          onClick={setShowProjectEditModal}
                          className="hover:bg-gray-300 py-2 cursor-pointer  rounded-lg w-full text-center"
                        >
                          Update
                        </div>
                        <div
                          onClick={setShowConfirmDeleteModal}
                          className="hover:bg-gray-300 py-2 cursor-pointer  rounded-lg w-full text-center"
                        >
                          Delete
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <p className="font-normal bg-gray-50 text-gray-700 dark:text-gray-400 h-72 overflow-auto p-2 ">
                {data.project.description}
              </p>
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col mt-12 space-y-4">
                  <div className="text-sm font-semibold">
                    Created:
                    <span className="pl-2 text-sm text-gray-600 font-light">
                      {moment(data?.project.createdAt).format(
                        "YYYY-MM-DD HH:mm"
                      )}
                    </span>
                  </div>
                  <div className="text-sm font-semibold">
                    Updated:
                    <span className="pl-2 text-sm text-gray-600 font-light">
                      {moment(data?.project.updatedAt).format(
                        "YYYY-MM-DD HH:mm"
                      )}
                    </span>
                  </div>
                  <div className="text-sm font-semibold">
                    StartDate:
                    <span className="pl-2 text-sm text-gray-600 font-light">
                      {moment(data?.project.startDate).format("YYYY-MM-DD")}
                    </span>
                  </div>
                </div>
                <div>
                  <div>
                    Due:
                    <span className="pl-2 text-sm text-gray-600 font-light">
                      {data.project.dueDate}
                    </span>
                  </div>
                  <div className="font-bold text-sm mt-3">
                    {daysDue === "Today" ? (
                      <div className="text-red-500">Project is due Today</div>
                    ) : (
                      <div>({daysDue} days remaining)</div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <ClientInfo client={data.project.client} />
          </div>

          <hr className="mt-6"></hr>
        </div>
      );
  };

  return (
    <DefaultLayout>
      {showConfirmDeleteModal && (
        <ConfirmDeleteProject
          toggleModal={setShowConfirmDeleteModal}
          projectId={data.project.id}
        />
      )}

      {showProjectEditModal && (
        <EditProjectModal
          project={data.project}
          toggleModal={setShowProjectEditModal}
        />
      )}

      <div className="mt-16">
        <Breadcrumb pageName={data?.project.name} />
      </div>

      {renderUI()}
    </DefaultLayout>
  );
};
export default Project;
