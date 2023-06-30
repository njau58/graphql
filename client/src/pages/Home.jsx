import { useContext } from "react";

import { ToggleContext } from "../context/ToggleSideBarContext";

import DefaultLayout from "../layout/DefaultLayout";
import DashboardProjectCard from "../components/DashboardProjectCard";
import DashboardClientsCard from "../components/DashboardClientsCard";
import ProjectsChart from "../components/ProjectsChart";

const Home = () => {
  const { showSideBar } = useContext(ToggleContext);
  console.log(showSideBar, "header");
  return (
    <DefaultLayout>
      <div className="grid max-w-6xl mx-auto grid-cols-1 mt-16 gap-12 md:grid-cols-2 md:gap-6   ">
        <DashboardProjectCard />
        <DashboardClientsCard />
      </div>
      <div className="pb-12">
        {" "}
        <ProjectsChart />
      </div>
    </DefaultLayout>
  );
};

export default Home;
