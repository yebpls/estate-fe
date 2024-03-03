import { Card, Col, Row, Spin } from "antd";
import React, { useEffect } from "react";
import ApartmentImg from "../components/ApartmentDetail/ApartmentImg";
import ProjectDescription from "../components/ApartmentDetail/ProjectDescription";
import ApartmentOverView from "../components/ApartmentDetail/ApartmentOverView";
import ApartmentInfo from "../components/ApartmentDetail/ApartmentInfo";
import RelatedApartment from "../components/Suggest/RelatedApartment";
import Tool from "../components/Suggest/Tool";
import BrokerInfo from "../components/Suggest/BrokerInfo";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getApartmentById } from "../store/slices/apartmentSlice";
import SearchBar from "../components/SharedComponent/SearchBar";
import AgencyInfo from "../components/ApartmentDetail/AgencyInfo";
import { getAgencyByApartmentId } from "../store/slices/accountSlice";
import { getAllCity } from "../store/slices/buildingSlice";

export default function ApartmentDetail() {
  const { id } = useParams();
  const { apartmentDetail, isLoading } = useSelector(
    (state) => state.apartmentReducer
  );
  const { agencyByApartment } = useSelector((state) => state.accountReducer);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getApartmentById(id));
    dispatch(getAgencyByApartmentId(id));
    dispatch(getAllCity());
  }, [id, dispatch]);

  return (
    <div className="px-5">
      <SearchBar />
      <div className="mt-10">
        {isLoading ? (
          <div className="flex justify-center items-center h-[200px]">
            <Spin size="large" />
          </div>
        ) : (
            <div className="flex m-5 mx-20  ">
              <Row gutter={16} className="mt-8">
                <Col className="gutter-row" span={5}>
                  <AgencyInfo agency={agencyByApartment} />
                  <RelatedApartment />
                  <Tool />
                  <BrokerInfo />
                </Col>
                <Col className="gutter-row" span={19}>
                  <Row gutter={16}>
                    <ApartmentImg apartment={apartmentDetail} />
                    <ApartmentOverView apartment={apartmentDetail} />
                    <ProjectDescription apartment={apartmentDetail} />
                </Row>
              </Col>
            </Row>
          </div>
        )}
      </div>
    </div>
  );
}
