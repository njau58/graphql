import React from "react";

const ProjectCard = ({ project }) => {
  return (
    <div className="col-md-4">
      <div className="card mb-3">
        <div className="card-body shadow-sm">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title">{project.name}</h5>

            <a className="btn btn-light" href={`/projects/${project.id}`}>
              View
            </a>
          </div>
          <p className="small">
            Status: <span className={`${project.status==='Not Started'?'badge bg-danger':
                project.status==='In Progress'?'badge bg-primary':'badge bg-success'
                }`}>{project.status}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
