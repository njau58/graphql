import React from "react";
import AddClientModal from "../components/AddClientModal";
import Projects from "../components/Projects";
import Clients from "../components/Clients";
import AddProjectModal from "../components/AddProjectModal"

const Home = () => {
  return (
    <>
      <div className="d-flex gap-3 mb-12 pt-5" >
        
        <AddClientModal />
        <AddProjectModal/>
      </div>
      <Projects />
      <hr></hr>

      <Clients />
    </>
  );
};

export default Home;
