import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import ClientRow from "./ClientRow";
import { FaPlus } from "react-icons/fa";
import { AiOutlineReload } from "react-icons/ai";
import { GET_CLIENTS } from "../queries/clientQueries";
import Spinner from "./Spinner";
import DefaultLayout from "../layout/DefaultLayout";
import Breadcrumb from "./BreadCrumb";
import AddClientModal from "./AddClientModal";

const Clients = () => {
  const { loading, error, data } = useQuery(GET_CLIENTS);
  const [showAddModal, setShowAddModal] = useState(false);

  const toggleAddModal = () => {
    setShowAddModal(!showAddModal);
  };

  const reloadPage = () => {
    window.location.reload();
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
            <p>An error ocurred while loading clients. </p>
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

    if (!error && !loading && data) {
      return (
        <>
          <div className="mt-16">
            <Breadcrumb pageName="Clients" />
          </div>

          {showAddModal && <AddClientModal toggleModal={toggleAddModal} />}
          <div className="flex flex-col overflow-auto">
            <div class=" shadow-md  rounded-t-md  overflow-auto  w-full    ">
              <div class="flex flex-col  w-full items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
                <div class="w-full md:w-1/5">
                  <form class="flex items-center">
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
                        type="text"
                        id="simple-search"
                        class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Search"
                        required=""
                      ></input>
                    </div>
                  </form>
                </div>
                <div class=" w-full md:w-[9rem]">
                  <button
                    onClick={toggleAddModal}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg w-full "
                  >
                    <span className="inline-block pl-1.5">
                      <FaPlus />
                    </span>{" "}
                    Add Client
                  </button>
                </div>
              </div>
            </div>

            {data.clients.length > 0 ? (
              <div className="overflow-x-auto">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th class=" py-3">Name</th>
                      <th class=" py-3">Email</th>
                      <th class=" py-3">Phone</th>
                      <th class=" py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="rounded-b-md">
                    {data.clients.map((client) => {
                      return <ClientRow key={client.id} client={client} />;
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="flex justify-center items-center my-12 font-light">
                There are no clients.
              </p>
            )}
          </div>
        </>
      );
    }
  };

  return <DefaultLayout>{renderUI()}</DefaultLayout>;
};

export default Clients;
