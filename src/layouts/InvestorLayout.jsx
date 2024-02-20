import React from "react";
import InvestorSidebar from "../components/InvestorPage/InvestorSidebar";
import { Outlet } from "react-router-dom";
import InvestorInfo from "../components/InvestorPage/InvestorInfo";
import Header from "../components/Header";

function InvestorLayout() {
  return (
    <div>
      <Header />
      <div className="flex">
        <InvestorSidebar />
        <Outlet />
      </div>
    </div>
  );
}

export default InvestorLayout;
