import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import { getSubcriptionByAppointmentId } from "../../store/slices/subcriptionSlice";
import { Pagination, Spin } from "antd";
import SubcriptionRow from "./SubcriptionRow";
import { getApartmentById } from "../../store/slices/apartmentSlice";
import { LoadingOutlined } from "@ant-design/icons";
import LoadingComponent from "../SharedComponent/LoadingComponent";
import { getAppointmentByApartmentId } from "../../store/slices/appointmentSlice";

export default function Subcription() {
  const { apartmentId } = useParams();
  const { state } = useLocation();
  const [appointId, setAppointId] = useState(null);
  const [appointDate, setAppointDate] = useState(null);
  // const [appointStatus, setAppointStatus] = useState(null);
  // const [appointDate, setAppointDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { subcriptionByAppointment, loadingSubcription, loadingSubNofi } =
    useSelector((state) => state.subcriptionReducer);

  const { apartmentDetail } = useSelector((state) => state.apartmentReducer);
  const { appointmentByApartment } = useSelector(
    (state) => state.appointmentReducer
  );

  const dispatch = useDispatch();
  // MAKE A PAGING
  const startIndex = (currentPage - 1) * 5;
  const endIndex = startIndex + 5;
  const currentData = subcriptionByAppointment?.slice(startIndex, endIndex);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const fetch = async (id) => {
    try {
      const res = await axios.get(
        `https://estate.zouzoumanagement.xyz/api/appointment/apartment/${id}`
      );
      setAppointId(res.data.id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetch(apartmentId);
    dispatch(getAppointmentByApartmentId(apartmentId));
    // console.log(state);
  }, [apartmentId]);

  useEffect(() => {
    dispatch(getApartmentById(apartmentId));
    if (appointId) dispatch(getSubcriptionByAppointmentId(appointId));
  }, [appointId]);

  useEffect(() => {
    const date = appointmentByApartment?.meetingDate;

    const newAppointDate = date ? date.toString().split("T")[0].split("-") : [];

    setAppointDate(newAppointDate);
    // console.log("date: ", date, appointDate);
  }, [appointmentByApartment]);
  return (
    <div className="mx-10 mt-10 w-full">
      <p className="text-center block text-xl font-semibold text-orange-400">
        Căn {apartmentDetail?.apartmentNumber} ở tòa {state?.buildingName} thuộc
        dự án {apartmentDetail?.projectName}
      </p>
      {appointDate && appointmentByApartment?.appointmentStatus === 1 ? (
        <p className="p-1 px-2 block text-right text-slate-500 mt-3">
          Căn hộ này đã được hẹn gặp mặt vào ngày {appointDate[2]} -{" "}
          {appointDate[1]} - {appointDate[0]}
        </p>
      ) : appointmentByApartment?.appointmentStatus === 2 ? (
        <Link to="/agency/contract" className="p-1 px-2 block text-right">
          <span className="text-base bg-yellow-400 hover:bg-yellow-200  text-white hover:text-yellow-500 p-1 px-2 rounded-md ">
            Hiển thị hợp đồng
          </span>
        </Link>
      ) : (
        <div className="mt-5 h-5"></div>
      )}
      <div className="flex mt-4 mb-2 text-center">
        <p className="w-1/12 text-base text-slate-500">Stt</p>
        <p className="w-1/6 text-base text-slate-500 -ml-7">Mã khách</p>
        <p className="w-1/5 text-base text-slate-500">Ngày đăng ký</p>
        <p className="w-1/5 text-base text-slate-500">Trạng thái</p>
        <p className="w-1/5 text-base text-slate-500">Cập nhật trạng thái</p>
      </div>
      <div>
        <LoadingComponent
          message={"Đang cập nhật lại"}
          loadingDependency={loadingSubNofi}
        />
        {loadingSubcription ? (
          <div className="text-center mt-32 h-20 text-lg text-slate-500">
            <Spin
              indicator={
                <LoadingOutlined
                  style={{
                    fontSize: 27,
                    margin: 2,
                  }}
                  spin
                />
              }
            />
            Đang tải danh sách đăng ký
          </div>
        ) : (
          <div>
            {currentData && currentData.length > 0 ? (
              <div>
                {currentData.map((subcription, index) => (
                  <div key={subcription.id}>
                    <SubcriptionRow
                      stt={index + startIndex + 1}
                      subcription={subcription}
                    />
                  </div>
                ))}
                {subcriptionByAppointment?.length > 5 ? (
                  <Pagination
                    current={currentPage}
                    total={subcriptionByAppointment?.length}
                    pageSize={5}
                    onChange={handlePageChange}
                  />
                ) : (
                  ""
                )}
              </div>
            ) : (
              <p className="text-center mt-32 text-xl text-slate-500">
                Hiện chưa có đăng ký
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
