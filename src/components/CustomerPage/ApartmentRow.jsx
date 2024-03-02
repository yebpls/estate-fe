import { Modal } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ApartmentRow() {
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
        <Link
          to=""
          className=" hover:bg-slate-100 flex items-center p-1 rounded-md"
        >
          <td className="mx-6 py-4">
            <p>1</p>
          </td>
          <td className=" px-6 py-4">
            <div className="w-40 h-20">
              <img
                src={`https://www.souciehorner.com/wp-content/uploads/2017/04/Kitchen3-1536.jpg`}
                alt=""
                className="w-full h-full  rounded-sm"
              />
            </div>
          </td>
          <div className="w-64">
            <p className="whitespace-nowrap text-xl font-semibold py-1 text-slate-600">
              Dự án Rivana
            </p>
            <p className="whitespace-nowrap text-xs text-slate-500">
              Phòng 606 tòa River
            </p>
            <p className="text-xs py-2">
              68 Quốc lộ 13, Phường Vĩnh Phú, Thành Phố Thuận An, Tỉnh Bình
              Dương
            </p>
          </div>
          <div className="w-60 ml-9">
            <p className="whitespace-nowrap text-sm py-2 text-orange-600">
              Tình trạng đăng ký: Chờ đợi
            </p>
            <p className="whitespace-nowrap text-xs text-orange-400 py-1">
              Ngày cập nhật: 30/02/2024
            </p>
            <p className="whitespace-nowrap text-xs text-orange-400">
              Ngày đăng ký: 24/02/2024
            </p>
          </div>
          <div className="w-60 ml-4">
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
        </Link>
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
