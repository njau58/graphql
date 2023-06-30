import { FaProjectDiagram } from "react-icons/fa";
import { BsArrowUpShort } from "react-icons/bs";
import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectQueries";
import Spinner from '../components/Spinner'
import { useNavigate } from "react-router-dom";

const DashboardProjectCard = () => {
  const { loading, error, data } = useQuery(GET_PROJECTS);
  const navigate = useNavigate()
const goToProjects = ()=>{
  navigate('/projects')
}


  return (
    <div onClick={goToProjects} className="  p-6 w-full border-b-[4px] border-b-blue-500 hover:shadow-lg  bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col px-4  ">
        <div className="flex justify-start items-start mb-6">
          {" "}
          <div className="  bg-blue-500 bg-opacity-10 p-5  text-center text-xl rounded-full text-blue-500 ">
            {" "}
            <FaProjectDiagram className="text-xl" />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-gray-400">Projects</div>
          <div className="font-bold text-5xl">
          <div className="font-bold text-5xl">{data?data.projects?.length:error?<div className="text-sm font-medium font-medium text-gray-700">An errror occured.</div>:loading?<Spinner/>:""}</div>
          </div>
          <div className=" flex justify-end text-green-500 opacity-80">
            0.45%{" "}
            <span className="text-center text-xl">
              <BsArrowUpShort></BsArrowUpShort>
            </span>
            <div className="text-gray-500">Since last month</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardProjectCard;
