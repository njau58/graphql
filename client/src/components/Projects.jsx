import React from "react";
import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectQueries";
import Spinner from "../components/Spinner";
import ProjectCard from "../components/ProjectCard.jsx";

const Projects = () => {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  console.log(data);

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong.</p>;

  return (
    <div className="container mx-auto">
      {data.projects.length > 0 ? (
        <div className="row mt-4">
          {data.projects.map((project) => {
            return (
              <ProjectCard key={project.id} project={project}></ProjectCard>
            );
          })}
        </div>
      ) : (
        <p>There are no projects.</p>
      )}
    </div>
  );
};

export default Projects;
