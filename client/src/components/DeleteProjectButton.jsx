import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { GET_PROJECTS } from "../queries/projectQueries";
import { DELETE_PROJECT } from "../mutations/projectMutations";
import { useMutation } from "@apollo/client";

const DeleteProjectButton = ({ projectId }) => {
  const navigate = useNavigate();

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: projectId },
     refetchQueries:[{query:GET_PROJECTS}],
    onCompleted:navigate('/')
  });

  const handleDelete = () => {
    deleteProject();
   
  };

  return (
    <div className="mt-5 d-flex ms-auto">
      <button onClick={handleDelete} className="btn btn-danger m-2 " >
        <FaTrash className="icon" />Delete Project
      </button>
    </div>
  );
};

export default DeleteProjectButton;
