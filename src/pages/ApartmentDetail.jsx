import { Card, Spin } from "antd";
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
  const { id } = useParams();
  const { apartmentDetail, isLoading } = useSelector(
    (state) => state.apartmentReducer
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getApartmentById(id));
  }, [id, dispatch]);

  return (
    <div>
      <SearchBar />
      {isLoading ? (
        <div className="flex justify-center items-center h-[200px]">
          <Spin size="large" />
        </div>
      ) : (
        <div className="flex m-5 mx-44  ">
          <div>
            <UploaderDetail />
            <RelatedApartment />
            <Tool />
            <BrokerInfo />
          </div>
          <div>
            <ApartmentImg apartment={apartmentDetail} />
            <ApartmentOverView apartment={apartmentDetail} />
            <ProjectDescription apartment={apartmentDetail} />
          </div>
        </div>
      )}
    </div>
  );
}
