import { Button, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAppointmentByApartmentId } from "../../store/slices/appointmentSlice";
import { getSubcriptionByAppointmentId } from "../../store/slices/subcriptionSlice";

export default function ViewAppointment({ apartment }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { appointmentByApartment } = useSelector(
    (state) => state.appointmentReducer
  );
  const { subcriptionByAppointment } = useSelector(
    (state) => state.subcriptionReducer
  );
  const dispatch = useDispatch();
  const showModal = () => {
    dispatch(getAppointmentByApartmentId(apartment.id));
    dispatch(getSubcriptionByAppointmentId(appointmentByApartment?.id));
    console.log(
      "jabahfbah",
      apartment?.id,
      appointmentByApartment.id,
      subcriptionByAppointment
    );
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <button onClick={showModal}>Xem</button>
      <Modal
        title="Danh sách đăng ký xem nhà"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div>
          <div></div>
          <div>
            {subcriptionByAppointment &&
              subcriptionByAppointment?.map((subcription) => (
                <div>{subcription.id}</div>
              ))}
          </div>
        </div>
      </Modal>
    </div>
  );
}
