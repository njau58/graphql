import { createContext, useState } from "react";

export const ToggleContext = createContext({
  showSideBar: true,
});

export const ToggleProvider = ({ children }) => {
  const [showSideBar, setSideBar] = useState(true);

  const toggleSideBar = () => {
    setSideBar(!showSideBar);
  };

  return (
    <ToggleContext.Provider value={{ showSideBar, toggleSideBar }}>
      {children}
    </ToggleContext.Provider>
  );
};
