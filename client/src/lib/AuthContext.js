import { createContext, useState } from "react";

import Cookies from "universal-cookie";
const cookie = new Cookies();
export const AuthContext = createContext({
  value: cookie.get("authToken"),
});

export const AuthContextProvider = ({ children }) => {
  const cookie = new Cookies();
  const [auth, setAuthToken] = useState(cookie.get("authToken"));

  const logout = () => {
    cookie.remove("authToken", { path: "/" });

    // redirect user to the landing page
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ logout, auth }}>
      {children}
    </AuthContext.Provider>
  );
};
