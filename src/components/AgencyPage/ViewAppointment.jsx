import { Button, Modal, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubcriptionByAppointmentId } from "../../store/slices/subcriptionSlice";
import SubcriptionRow from "./SubcriptionRow";
import { getAppointmentByApartmentId } from "../../store/slices/appointmentSlice";
import { LoadingOutlined } from "@ant-design/icons";

export default function ViewAppointment({ apartment, buildingName }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { appointmentByApartment } = useSelector(
    (state) => state.appointmentReducer
  );
  const { subcriptionByAppointment } = useSelector(
    (state) => state.subcriptionReducer
  );
  const dispatch = useDispatch();
  const showModal = (id) => {
    dispatch(getAppointmentByApartmentId(id));
    dispatch(getSubcriptionByAppointmentId(appointmentByApartment?.id));
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
      <button
        className="text-white h-8 px-4  mx-1  rounded-md bg-orange-400 text-sm hover:bg-orange-500"
        onClick={() => showModal(apartment.id)}
      >
        Xem
      </button>
      <Modal
        title="Danh sách đăng ký xem nhà"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div>
          <p>
            Căn {apartment?.apartmentNumber} của tòa {buildingName} thuộc dự án{" "}
            {apartment?.projectName}
          </p>
          <div>
            <div className="mt-11 ml-32 h-20">
              <Spin
                indicator={
                  <LoadingOutlined
                    style={{
                      fontSize: 24,
                    }}
                    spin
                  />
                }
              />
              Đang tải dự án
            </div>
          </div>
          <div>
            {subcriptionByAppointment &&
              subcriptionByAppointment?.map((subcription) => (
                <div>
                  <SubcriptionRow subcription={subcription} />
                </div>
              ))}
          </div>
        </div>
      </Modal>
    </div>
  );
}
