import { Modal } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function AvailableApartmentRow() {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
        <td className="mx-6 py-4">
          <p>1</p>
        </td>
        <td className=" px-6 py-4">
          <div className="w-40 h-20">
            <img
              src={`https://www.souciehorner.com/wp-content/uploads/2017/04/Kitchen3-1536.jpg`}
              alt=""
              className="w-full h-full"
            />
          </div>
        </td>
        <td className="whitespace-nowrap px-6 mx-2  py-4 text-sm">1027</td>
        <td className="whitespace-nowrap px-6 mx-2 ml-6  py-4 text-sm">15tr</td>
        <td className=" mx-2 py-auto text-sm ml-14">
          12 Le Loi Boulevard, Tan Uyen Town, Binh Duong
        </td>
        <td className="whitespace-nowrap  ml-10 mr-6   py-4 text-sm">S707</td>
        {/* <td className="whitespace-nowrap px-6 py-4">
{pet.isSold ? "Đã bán" : "Chưa bán"}
</td> */}
        <td className="whitespace-nowrap px-6 py-4 ml-9 flex justify-between">
          <button
            className="text-white h-8 px-4  mx-1  rounded-md bg-green-700 text-sm"
            onClick={DeleteConfirm}
          >
            Nhận
          </button>
          <Modal
            okText="Nhận"
            okButtonProps={{ style: { backgroundColor: "green" } }}
            title="Bạn có muốn nhận dự án này không?"
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
