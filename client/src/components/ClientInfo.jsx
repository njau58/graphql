import { FaEnvelope, FaPhone, FaIdBadge } from "react-icons/fa";

export default function ClientInfo({ client }) {
  return (
    <div className="px-9 py-4 h-full w-full rounded-lg border bg-white ">

      <h5 className="text-2xl font-medium  text-gray-900 dark:text-white my-6">
        Client Information
      </h5>

      <div className="flex flex-col space-y-3 text-sm">
        <div className="flex flex-row items-center ">
          <FaIdBadge className="mr-2 text-gray-500" /> {client?.name}
        </div>
        <div className="flex flex-row items-center ">
          <FaEnvelope className="mr-2 text-gray-500" /> {client?.email}
        </div>
        <div className="flex flex-row items-center ">
          <FaPhone className="mr-2 text-gray-500" /> {client?.phone}
        </div>
      </div>
    
    </div>
  );
}
