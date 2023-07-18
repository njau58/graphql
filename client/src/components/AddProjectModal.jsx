import React, { useState } from "react";

import { useMutation, useQuery } from "@apollo/client";
import { ADD_PROJECT } from "../mutations/projectMutations";
import { GET_PROJECTS } from "../queries/projectQueries";
import { GET_CLIENTS } from "../queries/clientQueries";
import moment from "moment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";



const AddProjectModal = ({ toggleModal }) => {
  const { data } = useQuery(GET_CLIENTS);
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    clientId: "",
    status: "new",
  });

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: {
      name: formData.name,
      description: formData.description,
      clientId: formData.clientId,
      status: formData.status,

      startDate: moment(startDate?.$d).format("YYYY-MM-DD"),
      dueDate: moment(dueDate?.$d).format("YYYY-MM-DD"),
    },
    onError: (error) => {
      alert(error);
    },

    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });

      cache.writeQuery({
        query: GET_PROJECTS,

        data: { projects: [...projects, addProject] },
      });
    },
  });

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      formData.name === "" ||
      formData.description === "" ||
      formData.status === "" ||
      formData.clientId === "" ||
      startDate === "" ||
      dueDate === ""
    ) {
      return alert("Please fiil all the fields.");
    }
    addProject();
    toggleModal();
  };

  return (
    <>
      <div
        aria-hidden="true"
        class="fixed top-0 left-0 right-0 z-50 bg-gray-800 bg-opacity-70  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0  h-screen"
      >
        <div class="relative  mx-auto max-w-md h-full">
          <div class="relative bg-white rounded-lg  shadow dark:bg-gray-700">
            <button
              type="button"
              onClick={toggleModal}
              class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-hide="authentication-modal"
            >
              <svg
                aria-hidden="true"
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
            <div class="px-6 py-6 lg:px-8">
              <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                Add new project
              </h3>
              <form onSubmit={onSubmit} class="space-y-6" action="#">
                <div>
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Web Application"
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleOnChange}
                  ></input>
                </div>

                <div className="my-4">
                  <label
                    for="message"
                    class="block text-sm  mb-4 font-medium text-gray-900 dark:text-white"
                  >
                    Project Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={handleOnChange}
                    name="description"
                    rows="4"
                    class="block p-2.5 w-full  pb-4 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write a description for the project..."
                  ></textarea>
                </div>

                <div className="flex flex-row justify-between space-x-4 pt-6 w-full">
                <div className=" mb-4">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Start date"
                        value={startDate}
                        onChange={(newValue) => setStartDate(newValue)}
                      />
                    </LocalizationProvider>
                  </div>
                  <div className=" mb-4">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Due date"
                        value={dueDate}
                        onChange={(newValue) => setDueDate(newValue)}
                      />
                    </LocalizationProvider>
                  </div>
                </div>

                <div className="mb-4">
                  <label class="block text-sm  mb-4 font-medium text-gray-900 dark:text-white">
                    Status
                  </label>
                  <select
                    name="status"
                    class="bg-gray-50 border  mt-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={formData.status}
                    onChange={handleOnChange}
                  >
                    <option value="new">Not Started</option>
                    <option value="progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <label
                  for="countries"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Select an option
                </label>
                <select
                  name="clientId"
                  value={formData.clientId}
                  onChange={handleOnChange}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="">Select Client</option>
                  {data?.clients?.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name}
                    </option>
                  ))}
                </select>

                <button
                  type="submit"
                  class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Add project
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProjectModal;
