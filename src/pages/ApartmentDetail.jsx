import { Card } from "antd";
import React from "react";
import SearchBar from "../components/SearchPage/SearchBar";
import ApartmentImg from "../components/ApartmentDetail/ApartmentImg";
import ProjectDescription from "../components/ApartmentDetail/ProjectDescription";
import ApartmentOverView from "../components/ApartmentDetail/ApartmentOverView";
import ApartmentInfo from "../components/ApartmentDetail/ApartmentInfo";

export default function ApartmentDetail() {
  return (
    <div>
      <SearchBar />
      {/* <UploaderDetail /> */}
      {/* <ApartmentImg /> */}
      {/* <ProjectDescription /> */}
      {/* <ApartmentOverView /> */}
      <ApartmentInfo />
    </div>
  );
}
