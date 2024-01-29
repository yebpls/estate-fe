import { Card } from "antd";
import React from "react";
import SearchBar from "../components/SearchPage/SearchBar";
import ApartmentImg from "../components/ApartmentDetail/ApartmentImg";
import ProjectDescription from "../components/ApartmentDetail/ProjectDescription";
import ApartmentOverView from "../components/ApartmentDetail/ApartmentOverView";
import ApartmentInfo from "../components/ApartmentDetail/ApartmentInfo";
import UploaderDetail from "../components/ApartmentDetail/UploaderDetail";
import RelatedApartment from "../components/Suggest/RelatedApartment";
import Tool from "../components/Suggest/Tool";
import BrokerInfo from "../components/Suggest/BrokerInfo";

export default function ApartmentDetail() {
  return (
    <div>
      <SearchBar />
      <div className="flex m-5 mx-44  ">
        <div>
          <UploaderDetail />
          <RelatedApartment />
          <Tool />
          <BrokerInfo />
        </div>
        <div>
          <ApartmentImg />
          <ApartmentOverView />
          <ProjectDescription />
          <ApartmentInfo />
        </div>
      </div>
    </div>
  );
}
