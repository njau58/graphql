import { useState, useContext } from "react";
import { ToggleContext } from "../context/ToggleSideBarContext";
import { Link } from "react-router-dom";
import { FaUsers } from "react-icons/fa";

const SideBar = () => {
  const { showSideBar, toggleSideBar } = useContext(ToggleContext);

  console.log(showSideBar);

  return (

     
        <aside
          class={` ${showSideBar?"hidden":""} md:flex fixed -top-12 left-0 z-30 w-64  pt-12 h-screen  mt-20  bg-gray-900  border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
          aria-label="Sidebar"
        >
          <div class="h-full bg-gray-900 px-3 pb-4 overflow-y-auto  dark:bg-gray-800">
            <ul class="space-y-2 font-medium">
              <li >
                <Link

                onClick={toggleSideBar}
                
                  to="/"
                >
                  <a class="flex items-center p-2  text-gray-700 rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700">
                    <svg
                      aria-hidden="true"
                      class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                      <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                    </svg>
                    <span class="ml-3 text-white">Dashboard</span>
                  </a>
                </Link>
              </li>
              <li>
                <Link
              
              onClick={toggleSideBar}
                  to="/clients"
                >
                  <a class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700">
                    <FaUsers class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                    <span class="flex-1 ml-3 whitespace-nowrap text-white">Clients</span>
                    <span class="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-blue-500 bg-blue-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                      New
                    </span>
                  </a>
                </Link>
              </li>
              <li>
                <Link
                
                onClick={toggleSideBar}
                  to="/projects"
                >
                  <a class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700">
                    <svg
                      aria-hidden="true"
                      class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                    </svg>
                    <span class="flex-1 ml-3 whitespace-nowrap text-white">Projects</span>
                  </a>
                </Link>
              </li>
              <li>
                <a
                
                onClick={toggleSideBar}
                  href="#"
                  class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700"
                >
                  <svg
                    aria-hidden="true"
                    class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="flex-1 ml-3 whitespace-nowrap text-white">Sign In</span>
                </a>
              </li>
              <li>
                <a
                
                onClick={toggleSideBar}
                  href="#"
                  class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700"
                >
                  <svg
                    aria-hidden="true"
                    class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="flex-1 ml-3 whitespace-nowrap text-white">Sign Up</span>
                </a>
              </li>
            </ul>
          </div>
        </aside>
   

  );
};

export default SideBar;
