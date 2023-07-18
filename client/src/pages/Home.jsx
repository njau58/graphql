import { useContext } from "react";

import { ToggleContext } from "../context/ToggleSideBarContext";

import DefaultLayout from "../layout/DefaultLayout";
import DashboardProjectCard from "../components/DashboardProjectCard";
import DashboardClientsCard from "../components/DashboardClientsCard";
import ProjectsChart from "../components/ProjectsChart";
import Banner from "../components/Banner";

const Home = () => {
  const { showSideBar } = useContext(ToggleContext);
  return (
    <DefaultLayout>
         <Banner/>
      <div className="grid max-w-6xl mx-auto grid-cols-1 mt-16 gap-12 md:grid-cols-2 md:gap-6   ">
     
        <DashboardProjectCard />
        <DashboardClientsCard />
      </div>
      <div className="mb-6">
        {" "}
        <ProjectsChart />
      </div>
    </DefaultLayout>
  );
};

export default Home;
