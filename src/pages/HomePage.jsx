import React from "react";
import { Link, useNavigate } from "react-router-dom";
import storageService from "../config/storageService";
import News from "../components/HomePage/News";
import Project from "../components/HomePage/Project";
import RemarkableProject from "../components/HomePage/RemarkableProject";
import ProjectByLocation from "../components/HomePage/ProjectByLocation";
import SearchPage from "./SearchPage";
import ApartmentDetail from "./ApartmentDetail";
import InvestorLayout from "../layouts/InvestorLayout";

function HomePage() {
  return (
    <div className="mt-30">
      <News />
      <Project />
      <RemarkableProject />
      <ProjectByLocation />
    </div>
  );
}

export default HomePage;
