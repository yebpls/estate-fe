import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

function MainLayout() {
  return (
    <div className="relative">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default MainLayout;
