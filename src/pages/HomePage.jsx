import React from "react";
import { Link, useNavigate } from "react-router-dom";
import storageService from "../config/storageService";
import News from "../components/HomePage/News";
import Project from "../components/HomePage/Project";

function HomePage() {
  return (
    <div className="mt-30 ">
      <News />
      <Project />
    </div>
  );
}

export default HomePage;
