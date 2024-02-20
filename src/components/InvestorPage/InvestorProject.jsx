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
    <div className="mx-10 mt-10">
      <p className="m-2 text-center text-2xl  font-semibold text-blue-700">
        Project
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
          <p className="m-2">Number</p>
          <Input
            placeholder="Apartment Number"
            id="number"
            name="number"
          ></Input>
        </div>
        {/* Apartment Image */}
        <div className="m-2">
          <p className="m-2">Apartment Image</p>
          <Input placeholder="Apartment Image" id="image" name="image"></Input>
        </div>
        {/* Apartment Price */}
        <div className="m-2">
          <p className="m-2">Price</p>
          <Input placeholder="Apartment Price" id="price" name="price"></Input>
        </div>
      </Modal>
      <thead className="border-b font-medium dark:border-neutral-500">
        <tr>
          <th scope="col" className="px-11 py-4">
            Image
          </th>
          <th scope="col" className="pl-32 py-4">
            Name
          </th>
          <th scope="col" className="pl-20 py-4">
            Start Date
          </th>
          <th scope="col" className="pl-24 py-4">
            End Date
          </th>
          <th scope="col" className="pl-20 py-4">
            Status
          </th>
          <th scope="col" className="pl-14 py-4">
            Action
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
  );
}
