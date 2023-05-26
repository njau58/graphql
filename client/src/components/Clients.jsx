import React from "react";
import { useQuery } from "@apollo/client";
import ClientRow from "./ClientRow";
import { GET_CLIENTS } from "../queries/clientQueries";
import Spinner from "./Spinner";

const Clients = () => {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  

  if (loading) return <Spinner />;

  if (error) return <div>Something went wrong</div>;

  if (!error && !loading && data) {
    return (
      <table className="table container table-hover mt- bg-white">
        <thead>
          <tr><th>Name</th><th>Email</th><th>Phone</th><th></th></tr>
        </thead>
        <tbody>
          {data.clients.map((client) => {
            return <ClientRow key={client.id} client={client} />;
          })}
        </tbody>
      </table>
    );
  }
};

export default Clients;
