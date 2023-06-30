import { FaUsers } from "react-icons/fa";
import { BsArrowUpShort } from "react-icons/bs";
import { useQuery } from "@apollo/client";
import { GET_CLIENTS } from "../queries/clientQueries";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";

const DashboardClientsCard = () => {
  const { loading, error, data } = useQuery(GET_CLIENTS);
  const navigate = useNavigate()
  const goToClients = ()=>{
    navigate('/clients')
  }
  



  return (
    <div onClick={goToClients} className=" border-b-[4px] border-b-green-500  p-6 w-full hover:shadow-lg    bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col px-4  ">
      
        <div className="flex justify-start items-start mb-6">
          {" "}
          <div className="  bg-green-500 bg-opacity-10 p-5  text-center text-xl rounded-full text-green-500 ">
            {" "}
            <FaUsers className="text-xl" />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-gray-400">Clients</div>

          <div className="font-bold text-5xl">{data?data.clients?.length:error?<div className="text-sm font-medium text-gray-700">An errror occured.</div>:loading?<Spinner/>:""}</div>
          <div className=" flex justify-end text-green-500 opacity-80">
            0.45%{" "}
            <span className="text-center text-xl inline-flex">
              <BsArrowUpShort></BsArrowUpShort>
            </span>
            <div className="text-gray-500">Since last month</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardClientsCard;
