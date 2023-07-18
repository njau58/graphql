import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

// interface DefaultLayoutProps {
//   children: ReactNode;
// }

const DefaultLayout = ({ children }) => {
  return (
    <div className="h-screen  ">
      <Header />

      <main className="p-4 sm:ml-64 bg-gray-50 h-screen overflow-auto ">
        {children}
        <Footer></Footer>
      </main>
 

    </div>
  );
};

export default DefaultLayout;
