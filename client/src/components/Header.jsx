import { useContext, useState } from "react";
import SideBar from "./SideBar";
import logo from "./assets/logo.png";
import { ToggleContext } from "../context/ToggleSideBarContext";
import {AiOutlineMenuUnfold} from 'react-icons/ai'
import {RxCross2} from 'react-icons/rx'
 
import DropDownUser from "./DropDownUser";

export default function Header() {

  const {showSideBar, toggleSideBar} = useContext(ToggleContext)
  console.log(showSideBar)

  const [showUser, setShowUser] = useState(false)
 
  const userName = "Simon Njau";

  const profileLetter = userName.charAt(0);
  const toggleUserProfile = ()=>{

    setShowUser(!showUser)

  }
console.log(showUser)


  return (
    <>
      <nav class="fixed top-0 z-40 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div class="px-3 py-3 lg:px-5 lg:pl-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center justify-start">
              <button
             onClick={toggleSideBar}
                aria-controls="logo-sidebar"
                type="button"
                class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                {showSideBar?<span className="text-2xl"><AiOutlineMenuUnfold/></span>:<span className="text-2xl"><RxCross2/></span>}
               
              </button>

              <a href="/" class="flex ml-2 pr-12 md:mr-32">
                <img src={logo} class="h-8 mr-3" alt="FlowBite Logo" />
                <span class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  SAPMS
                </span>
              </a>

              <form class="flex justify-end w-full">
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
            <div class="flex items-center ">
              <div class="flex items-center ml-3">
                <div>
                  <div class="flex items-center ml-3">
                    <div>
                      <button
                        class=" flex text-white  h-8 w-8 items-center justify-center text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600  "
                        aria-expanded="false"
                        data-dropdown-toggle="dropdown-user"
                        onClick={toggleUserProfile}
                      >
                        {profileLetter}
                      </button>
                    </div>
                  </div>
                </div>
             
              </div>
              
            </div>
          </div>
          
        </div>
       
        {showUser&&<DropDownUser/> }
     
       
      </nav>

      <SideBar />
    </>
  );
}
