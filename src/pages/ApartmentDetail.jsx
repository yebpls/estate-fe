import { Card } from "antd";
import React, { useEffect } from "react";
import SearchBar from "../components/SearchPage/SearchBar";
import ApartmentImg from "../components/ApartmentDetail/ApartmentImg";
import ProjectDescription from "../components/ApartmentDetail/ProjectDescription";
import ApartmentOverView from "../components/ApartmentDetail/ApartmentOverView";
import ApartmentInfo from "../components/ApartmentDetail/ApartmentInfo";
import UploaderDetail from "../components/ApartmentDetail/UploaderDetail";
import RelatedApartment from "../components/Suggest/RelatedApartment";
import Tool from "../components/Suggest/Tool";
import BrokerInfo from "../components/Suggest/BrokerInfo";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getApartmentById } from "../store/slices/apartmentSlice";

export default function ApartmentDetail() {
  const { apartment } = useSelector((state) => state.apartmentReducer);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getApartmentById(id));
  }, [id]);
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
          <ApartmentImg apartment={apartment} />
          <ApartmentOverView apartment={apartment} />
          <ProjectDescription />
          <ApartmentInfo apartment={apartment} />
        </div>
      </div>
    </div>
  );
}
