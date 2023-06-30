import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectQueries";
import Spinner from "../components/Spinner";
import ProjectCard from "../components/ProjectCard.jsx";
import DefaultLayout from "../layout/DefaultLayout";
import Breadcrumb from "./BreadCrumb";
import { AiOutlineReload } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import AddProjectModal from "./AddProjectModal";

const Projects = () => {
  const { loading, error, data } = useQuery(GET_PROJECTS);
  const [toggleModal, setToggleModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterByStatus, setFilterByStatus] = useState("");
  const [filterByStatusProjects, setFilterByStatusProjects] = useState([]);

  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    const filteredProjects = data?.projects.filter((projects) =>
      projects.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredProjects(filteredProjects);
  }, [searchTerm, data]);

  useEffect(() => {
    const res = data?.projects.filter(
      (projects) => projects.status === filterByStatus
    );

    setFilterByStatusProjects(res);
  }, [filterByStatus, data]);

  const mergedArray = [
    ...new Set(filterByStatusProjects?.concat(filteredProjects)),
  ];

  const reloadPage = () => {
    window.location.reload();
  };

  const toggleNewProjectModal = () => {
    setToggleModal(!toggleModal);
  };

  const renderUI = () => {
    if (loading)
      return (
        <>
          <div className="mx-auto flex items-center justify-center  h-screen my-auto">
            <Spinner />
          </div>
        </>
      );

    if (error)
      return (
        <>
          <div className="mx-auto flex flex-col space-y-4  items-center justify-center h-screen my-auto ">
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
        </>
      );

    if (!error && !loading && data)
      return (
        <>
         <div className="mt-16"><Breadcrumb pageName="Projects"></Breadcrumb></div> 
          {toggleModal && (
            <AddProjectModal toggleModal={toggleNewProjectModal} />
          )}

          <div class="  max-w-6xl mx-auto my-4 w-full    ">
            <div class="flex flex-col  w-ful items-center justify-between  space-y-3 md:flex-row md:space-y-0 md:space-x-4">
              <div class="w-full md:w-[85%] bg-white">
                <form class="flex items-center bg-white ">
                  <label for="simple-search" class="sr-only">
                    Search
                  </label>
                  <div class="relative w-full">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        aria-hidden="true"
                        class="w-5 h-5 text-gray-500 dark:text-gray-400"
                        fill="currentColor"
                        viewbox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      type="text"
                      id="simple-search"
                      class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Search"
                      required=""
                    ></input>
                  </div>
                </form>
              </div>
              <div class="flex justify-between space-x-4 w-full ">
                <select
                  value={filterByStatus}
                  onChange={(e) => setFilterByStatus(e.target.value)}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[10rem] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected value="">
                    Filter by status
                  </option>
                  <option value="Completed">Completed</option>
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                </select>

                <button
                  onClick={toggleNewProjectModal}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg "
                >
                  <span className="inline-block pl-1.5">
                    {" "}
                    <FaPlus />
                  </span>{" "}
                  New Project
                </button>
              </div>
            </div>
          </div>

          {data.projects.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto grid-cols-1">
              {mergedArray.map((project) => {
                return (
                  <ProjectCard key={project.id} project={project}></ProjectCard>
                );
              })}
            </div>
          ) : (
            <p className="flex justify-center items-center my-12 font-light">There are no projects.</p>
          )}
        </>
      );
  };

  return <DefaultLayout>{renderUI()}</DefaultLayout>;
};

export default Projects;
