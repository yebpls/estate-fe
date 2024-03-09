import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApartmentById } from "../../store/slices/apartmentSlice";
import axios from "axios";

export default function ApartmentRow({ subcription, stt }) {
  const apartmentPrice = subcription?.price.toLocaleString("de-DE");
  const subcribeDate = new Date(subcription?.subscribeDate)
    .toISOString()
    .split("T")[0];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const DeleteConfirm = () => {
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
      <tr className="flex items-center hover:bg-slate-100">
        <div className=" hover:bg-slate-100 flex items-center p-1 rounded-md">
          <td className="mx-2 py-4">
            <p>{stt}</p>
          </td>
          <td className=" px-6 py-4">
            <div className="w-40 h-20">
              <img
                src={subcription?.mainImage}
                alt=""
                className="w-full h-full  rounded-sm"
              />
            </div>
          </td>
          <div className="w-80">
            <p className="whitespace-nowrap text-xl font-semibold py-1 text-slate-600">
              {subcription?.projectName}
            </p>
            <p className="text-xs text-slate-500">
              Căn {subcription?.apartmentNumber} Tòa {subcription?.buildingName}
            </p>
            <p className="text-xs py-1 text-slate-500">
              {subcription?.address}
            </p>
            <p className="text-sm py-1 text-slate-700">
              Có giá {apartmentPrice}đ ({subcription?.area}m2)
            </p>
          </div>
          <div className="w-64 ml-3">
            {subcription?.subscriptionStatus === 0 ? (
              <p className="text-red-400 text-sm py-2">
                Tình trạng đăng ký: Căn hộ đã bán
              </p>
            ) : subcription?.subscriptionStatus === 1 ? (
              <p className="text-orange-400 text-sm py-2">
                Tình trạng đăng ký: Chờ xác nhận
              </p>
            ) : subcription?.subscriptionStatus === 2 ? (
              <p className="text-green-400 text-sm py-2">
                Tình trạng đăng ký: Đã lên lịch hẹn
              </p>
            ) : (
              ""
            )}
            <p className="whitespace-nowrap text-xs text-blue-400">
              Ngày đăng ký: {subcribeDate}
            </p>
          </div>
          <div className="w-60 ml-2">
            <p className="whitespace-nowrap text-sm py-2 text-orange-600">
              Tình trạng cuộc hẹn: Chờ đợi
            </p>
            <p className="whitespace-nowrap text-xs text-orange-400 py-1">
              Ngày cập nhật: 30/02/2024
            </p>
            <p className="whitespace-nowrap text-xs text-orange-400">
              Ngày hẹn gặp: 24/02/2024
            </p>
          </div>
        </div>
        {/* <td className="whitespace-nowrap px-6 py-4">
{pet.isSold ? "Đã bán" : "Chưa bán"}
</td> */}
        <td className="whitespace-nowrap px-6 py-4 ml-9 flex justify-between">
          <button
            className="text-white h-8 px-4  mx-1  rounded-md bg-red-500 text-sm"
            onClick={DeleteConfirm}
          >
            Hủy hẹn
          </button>
          <Modal
            okText="Hủy"
            okButtonProps={{ style: { backgroundColor: "red" } }}
            title="Bạn có muốn hủy cuộc hẹn này không?"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            cancelText="Không"
            className="text-cyan-700 mt-40"
          ></Modal>
        </td>
      </tr>
    </div>
  );
}
