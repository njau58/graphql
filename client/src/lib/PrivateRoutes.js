import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

const PrivateRoute = ({ Component }) => {
  const cookie = new Cookies();
  const authToken = cookie.get("authToken", { path: "/" });

  return authToken ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;
