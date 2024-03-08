import { Button, Modal, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { getAppointmentByApartmentId } from "../../store/slices/appointmentSlice";
import { getSubcriptionByAppointmentId } from "../../store/slices/subcriptionSlice";
import { useDispatch, useSelector } from "react-redux";
import SubcriptionRow from "./SubcriptionRow";
import { LoadingOutlined } from "@ant-design/icons";

export default function AppointmentModal({
  openModal,
  handleCancel,
  apartment,
  isModalOpen,
  children,
}) {
  const { loadingSubcription } = useSelector(
    (state) => state.subcriptionReducer
  );
  const { appointmentByApartment } = useSelector(
    (state) => state.appointmentReducer
  );
  const { subcriptionByAppointment } = useSelector(
    (state) => state.subcriptionReducer
  );
  const dispatch = useDispatch();
  // useEffect(() => {
  //   console.log(
  //     apartment?.id,
  //     appointmentByApartment?.id,
  //     subcriptionByAppointment
  //   );
  //   dispatch(getAppointmentByApartmentId(apartment?.id));
  //   dispatch(getSubcriptionByAppointmentId(appointmentByApartment?.id));
  // }, [apartment, dispatch]);
  return (
    <div>
      <div onClick={openModal}>{children}</div>
      <Modal
        title="Danh sách các cuộc hẹn"
        open={isModalOpen}
        onOk={handleCancel}
        onCancel={handleCancel}
        footer={null}
      >
        <div>
          {loadingSubcription ? (
            // <div className="mt-11 ml-32 h-20">
            //   <Spin
            //     indicator={
            //       <LoadingOutlined
            //         style={{
            //           fontSize: 24,
            //         }}
            //         spin
            //       />
            //     }
            //   />
            //   Đang tải dự án
            // </div>
            ""
          ) : (
            <SubcriptionRow
              apartment={apartment}
              subcriptions={subcriptionByAppointment}
            />
          )}
        </div>
      </Modal>
    </div>
  );
}
