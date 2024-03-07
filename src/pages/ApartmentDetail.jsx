import { Card, Col, Row, Spin } from "antd";
import React, { useEffect } from "react";
import ApartmentImg from "../components/ApartmentDetail/ApartmentImg";
import ProjectDescription from "../components/ApartmentDetail/ProjectDescription";
import ApartmentOverView from "../components/ApartmentDetail/ApartmentOverView";
import ApartmentInfo from "../components/ApartmentDetail/ApartmentInfo";
import RelatedApartment from "../components/Suggest/RelatedApartment";
import Tool from "../components/Suggest/Tool";
import BrokerInfo from "../components/Suggest/BrokerInfo";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getApartmentById } from "../store/slices/apartmentSlice";
import SearchBar from "../components/SharedComponent/SearchBar";
import AgencyInfo from "../components/ApartmentDetail/AgencyInfo";
import { getAgencyByApartmentId } from "../store/slices/accountSlice";
import { getAllCity } from "../store/slices/buildingSlice";
import { getAppointmentByApartmentId } from "../store/slices/appointmentSlice";

export default function ApartmentDetail() {
  const { id } = useParams();
  const { apartmentDetail, isLoading } = useSelector(
    (state) => state.apartmentReducer
  );
  const { appointmentByApartment, loading } = useSelector(
    (state) => state.appointmentReducer
  );
  const { loadingSubcription } = useSelector(
    (state) => state.subcriptionReducer
  );
  const { agencyByApartment } = useSelector((state) => state.accountReducer);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getApartmentById(id));
    dispatch(getAgencyByApartmentId(id));
    dispatch(getAppointmentByApartmentId(id));
    dispatch(getAllCity());
  }, [id, dispatch]);

  return (
    <div className="px-5">
      <div className="flex mt-4">
        <button className="border-none inline-block text-left">
          <Link to="/" className="text-sky-600 hover:text-sky-400">
            ← Trở về trang trước
          </Link>
        </button>
      </div>
      <div className="mt-10">
        {loadingSubcription ? (
          <div className="flex justify-center items-center h-[200px]">
            <Spin size="large" />
          </div>
        ) : (
          ""
        )}

        {isLoading ? (
          <div className="flex justify-center items-center h-[200px]">
            <Spin size="large" />
          </div>
        ) : (
          <div className="flex m-5 mx-20  ">
            <Row gutter={16} className="mt-8">
              <Col className="gutter-row" span={5}>
                <AgencyInfo
                  agency={agencyByApartment}
                  appointment={appointmentByApartment}
                  apartmentId={id}
                />
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
