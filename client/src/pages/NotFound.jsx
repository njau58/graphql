import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import DefaultLayout from "../layout/DefaultLayout";
import error from '../components/assets/error.svg'

export default function NotFound() {
  return (
    <DefaultLayout>
      <div className="flex flex-col space-y-4 bg-white items-center justify-center  py-16 border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
     <img  src={error}></img>
        <p className="lead text-2xl font-bold mt-2">Sorry, the page can’t be found</p>
        <p className="max-w-md font-medium text-gray-500 text-center pb-4 ">The page you were looking for appears to have been moved, deleted or does not exist.</p>
        <Link to="/" className="px-10 py-4 bg-blue-600 text-white rounded-lg ">
         <span className="inline-block pl-2"><FaArrowLeft/></span> Back To Home
        </Link>
      </div>
    </DefaultLayout>
  );
}
