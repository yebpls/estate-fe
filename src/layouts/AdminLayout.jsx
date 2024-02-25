import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import SideBar from "../components/SharedComponent/SideBar";

export default function AdminLayout() {
  return (
    <div>
      <Header />
      <div className="flex">
        <SideBar />
        <Outlet />
      </div>
    </div>
  );
}
