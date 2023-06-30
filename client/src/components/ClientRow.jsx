import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import EditClientModal from "./EditClientModal";
import ConfirmDeleteClient from "./ConfirmDeleteClient";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BsTrash } from "react-icons/bs";

const ClientRow = ({ client }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);

  const toggleEditModal = () => {
    setShowEditModal(!showEditModal);
  };

  const toggleConfirmDeleteModal = () => {
    setShowConfirmDeleteModal(!showConfirmDeleteModal);
  };

  return (
    <>
      {showEditModal && (
        <EditClientModal toggleModal={toggleEditModal} client={client} />
      )}
      {showConfirmDeleteModal && (
        <ConfirmDeleteClient
          client={client}
          toggleModal={toggleConfirmDeleteModal}
        />
      )}
      <tr className="bg-white border-b overflow-auto w-full dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <th
          scope="row"
          className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
        >
          <div className="pl-3">
            <div className="text-base font-semibold">{client.name}</div>
            <div className="font-normal text-gray-500">{client.email}</div>
          </div>
        </th>
        <td className="px-6 py-4">{client.email}</td>
        <td className="px-6 py-4">
          <div className="flex items-center">{client.phone}</div>
        </td>
        <td className="px-6 py-4 flex flex-row space-x-4">
          <button className="text-blue-500 text-center   bg-gray-50 p-2 rounded-md " onClick={toggleEditModal}>
            <FaEdit />
          </button>
          <Link to={`/clients/${client.id}`} className="text-gray-700  bg-gray-50 p-2 rounded-md ">
            <FaEye />
          </Link>
          <button className="text-red-600 bg-gray-50 p-2 rounded-md " onClick={toggleConfirmDeleteModal}>
            <BsTrash />
          </button>
        </td>
      </tr>
    </>
  );
};

export default ClientRow;
