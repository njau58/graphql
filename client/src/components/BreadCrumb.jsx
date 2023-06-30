import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const Breadcrumb = ({ pageName }) => {
  return (
    <>
      <div className="mb-6 flex flex-col gap-3 md:flex-row justify-between ">
        <h2 className="text-3xl font-semibold text-black dark:text-white">
          {pageName}
        </h2>

        <nav>
          <ol className="flex items-center gap-2">
            <li>
              <Link to="/" className="font-semibold text-gray-600">
                {" "}
                <span className="inline-block mr-2">
                  {" "}
                  <FaHome />
                </span>
                Dashoard /
              </Link>
            </li>
            <li className="text-blue-600 ">{pageName}</li>
          </ol>
        </nav>
      </div>
      <hr></hr>
    </>
  );
};

export default Breadcrumb;
