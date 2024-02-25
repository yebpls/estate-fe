import { Button, Modal } from "antd";
import React, { useState } from "react";

export default function AccountRow({ account }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const changeConfirm = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOk = () => {
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
              src={
                "https://agenciameme.com/wp-content/uploads/2021/01/Chems.jpg"
              }
              alt=""
              className="w-full h-full"
            />
          </div>
        </td>
        <td className="whitespace-nowrap px-6 ml-6 py-4 text-sm">
          user@gmail.com
        </td>
        <td className="whitespace-nowrap px-6 ml-6  py-4  w-32 text-sm">
          Very super user
        </td>
        <td className=" mx-2 py-auto text-sm ml-14 w-20">customer</td>
        <td className="whitespace-nowrap  ml-10 mr-6 text-sm">
          Đang hoạt động
        </td>

        <td className="whitespace-nowrap px-2 py-4 ml-4 flex justify-between">
          <button
            className="text-white h-8 px-4  mx-1  rounded-md bg-green-700 text-sm"
            onClick={changeConfirm}
          >
            Đổi trạng thái
          </button>
          <Modal
            title={`Bạn có muốn đổi trạng thái tài khoản này không`}
            open={isModalOpen}
            onCancel={handleCancel}
            onOk={handleOk}
            okText="Đổi"
            footer={
              <div>
                <Button className="text-red-400 mr-3">Hủy</Button>
                <Button className="text-lime-600">Đổi</Button>
              </div>
            }
            className="text-cyan-700 mt-40"
          ></Modal>
        </td>
      </tr>
    </div>
  );
}
