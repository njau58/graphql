import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "../queries/projectQueries";
import Spinner from "../components/Spinner";
import ClientInfo from "../components/ClientInfo";

import DefaultLayout from "../layout/DefaultLayout";
import { AiOutlineReload } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import Breadcrumb from "../components/BreadCrumb";
import { BsArrowLeft } from "react-icons/bs";
import ConfirmDeleteProject from "../components/ConfirmDeleteProject";
import EditProjectModal from "../components/EditProjectModal";
import moment from 'moment'

const Project = () => {
  const { id } = useParams();
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [showProjectEditModal, setShowProjectEditModal] = useState(false);

  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id: id },
  });

  console.log('created',new Date(data?.project.createdAt))
  console.log('updated',new Date(data?.project.updatedAt))


  const reloadPage = () => {
    window.location.reload();
  };

  const toggleConfirmDeleteModal = () => {
    setShowConfirmDeleteModal(!showConfirmDeleteModal);
  };
  const toggleEditProjectModal = () => {
    setShowProjectEditModal(!showProjectEditModal);
  };
  if (loading)
    return (
      <DefaultLayout>
        <div className="mx-auto flex items-center justify-center ">
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
              <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {data.project.name}
              </h1>
              <p className="font-normal text-gray-700 dark:text-gray-400 h-72 overflow-auto p-2 ">
                {data.project.description}
              </p>
              <div className="flex flex-col mt-12 space-y-4">
                <div className="text-sm font-semibold">Created:<span className="pl-2 text-sm text-gray-600 font-light">{moment(data?.project.createdAt).format("YYYY-MM-DD HH:mm:ss")}</span></div>
                <div className="text-sm font-semibold">Updated:<span className="pl-2 text-sm text-gray-600 font-light">{moment(data?.project.updatedAt).format("YYYY-MM-DD HH:mm:ss")}</span></div>


              </div>
            </div>

            <ClientInfo client={data.project.client} />
          </div>

          <hr className="mt-6"></hr>

          <div className="flex flex-row bg-white  space-x-6 items-center justify-center mt-6 border rounded-md p-12">
            <button
              onClick={toggleEditProjectModal}
              type="submit"
              class=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Update
            </button>
            <button
              onClick={toggleConfirmDeleteModal}
              type="button"
              class="text-white flex items-center justify-center bg-red-600   hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
            >
              <span className="">
                <FaTrash className="mr-2"></FaTrash>
              </span>{" "}
              Delete
            </button>
          </div>
        </div>
      );
  };

  return (
    <DefaultLayout>
      {showConfirmDeleteModal && (
        <ConfirmDeleteProject
          toggleModal={toggleConfirmDeleteModal}
          projectId={data.project.id}
        />
      )}

      {showProjectEditModal && (
        <EditProjectModal
          project={data.project}
          toggleModal={toggleEditProjectModal}
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
