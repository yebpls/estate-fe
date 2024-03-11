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
import {
  getAgencyByApartmentId,
  getCustomerId,
} from "../store/slices/accountSlice";
import { getAllCity } from "../store/slices/buildingSlice";
import { getAppointmentByApartmentId } from "../store/slices/appointmentSlice";

export default function ApartmentDetail({ cus }) {
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
    dispatch(getAgencyByApartmentId(id));
    dispatch(getAppointmentByApartmentId(id));
    dispatch(getAllCity());
  }, [id, dispatch]);

  return (
    <div className="">
      <div className="flex">
        <button className="border-none inline-block text-left mt-5 ml-5">
          <Link to="/" className="text-sky-600 hover:text-sky-400">
            ← Trở về trang trước
          </Link>
        </button>
      </div>
      <div className="">
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
          <div className="flex mx-20  ">
            <Row gutter={16} className="mt-8">
              <Col className="gutter-row" span={5}>
                <AgencyInfo
                  agency={agencyByApartment}
                  appointment={appointmentByApartment}
                  apartmentId={id}
                />
                {/* <RelatedApartment />
                <Tool />
                <BrokerInfo /> */}
              </Col>

              <Col className="gutter-row" span={19}>
                <ApartmentOverView apartment={apartmentDetail} />

                <Row gutter={16}>
                  <Col span={12}>
                    <ApartmentImg apartment={apartmentDetail} />
                  </Col>
                  <Col span={12}>
                    <ProjectDescription apartment={apartmentDetail} />
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        )}
      </div>
    </div>
  );
}
