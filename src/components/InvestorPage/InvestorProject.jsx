import { Button, Col, Input, Modal, Row } from "antd";
import React, { useState } from "react";
import ProjectRow from "./ProjectRow";

export default function InvestorProject() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="mx-auto mt-10 w-full px-8">
      <p className="m-2 text-center text-2xl  font-semibold text-blue-700">
        Dự án
      </p>
      <Button
        style={{ backgroundColor: "#4974a5", color: "white" }}
        onClick={showModal}
      >
        Add new building
      </Button>
      <Modal
        okText="Add"
        okButtonProps={{ style: { backgroundColor: "#4974a5" } }}
        title="New apart Info"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        className="text-cyan-700"
      >
        {/* Apartment Number */}
        <div className="m-2">
          <p className="m-2">Số phòng</p>
          <Input placeholder="Số phòng" id="number" name="number"></Input>
        </div>
        {/* Apartment Image */}
        <div className="m-2">
          <p className="m-2">Ảnh</p>
          <Input placeholder="Ảnh" id="image" name="image"></Input>
        </div>
        {/* Apartment Price */}
        <div className="m-2">
          <p className="m-2">Giá</p>
          <Input placeholder="giá" id="price" name="price"></Input>
        </div>
      </Modal>
      <div className="w-full">
        <thead className="border-b w-full font-medium dark:border-neutral-500">
          <tr>
            <th scope="col" className="px-11 py-4">
              Hình ảnh
            </th>
            <th scope="col" className="pl-32 py-4">
              Tên
            </th>
            <th scope="col" className="pl-20 py-4">
              Ngày bắt đầu
            </th>
            <th scope="col" className="pl-24 py-4">
              Ngày kết thúc
            </th>
            <th scope="col" className="pl-20 py-4">
              Trạng thái
            </th>
            <th scope="col" className="pl-14 py-4">
              Hành động
            </th>
          </tr>
        </thead>
        <ProjectRow />
        <ProjectRow />
        <ProjectRow />
        <ProjectRow />
        <ProjectRow />
        <ProjectRow />
      </div>
    </div>
  );
}
