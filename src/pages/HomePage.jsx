import React from "react";
import storageService from "../config/storageService";
import News from "../components/HomePage/News";
import Project from "../components/HomePage/Project";
import RemarkableProject from "../components/HomePage/RemarkableProject";
import ProjectByLocation from "../components/HomePage/ProjectByLocation";

function HomePage() {
  return (
    <div className="mt-30">
      <News />
      <Project />
      <ProjectByLocation />
    </div>
  );
}

export default HomePage;
