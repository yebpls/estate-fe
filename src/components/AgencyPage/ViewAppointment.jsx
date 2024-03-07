import { Button, Modal, Pagination, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubcriptionByAppointmentId } from "../../store/slices/subcriptionSlice";
import SubcriptionRow from "./SubcriptionRow";
import { getAppointmentByApartmentId } from "../../store/slices/appointmentSlice";
import { LoadingOutlined } from "@ant-design/icons";

export default function ViewAppointment({ apartment, buildingName }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { appointmentByApartment } = useSelector(
    (state) => state.appointmentReducer
  );
  const { subcriptionByAppointment, loadingSubcription } = useSelector(
    (state) => state.subcriptionReducer
  );
  const dispatch = useDispatch();
  const showModal = async (id) => {
    // dispatch(getAppointmentByApartmentId(id));
    // const { appointmentByApartment } = useSelector(
    //   (state) => state.appointmentReducer
    // );

    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // MAKE A PAGING
  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * 5;
  const endIndex = startIndex + 5;
  // Slice the data array to show only the items for the current page
  const currentData = subcriptionByAppointment?.slice(startIndex, endIndex);
  const handlePageChange = (page) => {
    setCurrentPage(page);
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
        width={777}
      >
        <div>
          <p>
            Căn {apartment?.apartmentNumber} của tòa {buildingName} thuộc dự án{" "}
            {apartment?.projectName}
          </p>
          <div className="flex mt-4 mb-2">
            <p className="w-1/6 text-base text-slate-500">Stt</p>
            <p className="w-1/6 text-base text-slate-500 -ml-7">Mã khách</p>
            <p className="w-1/5 text-base text-slate-500">Ngày đăng ký</p>
            <p className="w-1/5 text-base text-slate-500">Trạng thái</p>
            <p className="w-1/4 text-base text-slate-500">Ngày cập nhật</p>
            <p className="w-1/4 text-base text-slate-500">
              Cập nhật trạng thái
            </p>
          </div>
          <div>
            {loadingSubcription ? (
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

                    <Pagination
                      current={currentPage}
                      total={subcriptionByAppointment?.length}
                      pageSize={5}
                      onChange={handlePageChange}
                    />
                  </div>
                ) : (
                  <p>Nothing to display</p>
                )}
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}
