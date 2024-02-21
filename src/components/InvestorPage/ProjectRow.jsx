import { Button, DatePicker, Input, Modal, Select } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ProjectRow({ project }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openEditProject = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onChangeStartDate = (date, dateString) => {
    console.log("Start date: ", dateString);
  };
  const onChangeEndDate = (date, dateString) => {
    console.log("End date: ", dateString);
  };

  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const showModal = () => {
    setIsModalAddOpen(true);
  };
  const handleAddOk = () => {
    setIsModalAddOpen(false);
  };
  const handleAddCancel = () => {
    setIsModalAddOpen(false);
  };

  const startDate = new Date(project.startDate);
  let startDateFormat = startDate.toISOString().split("T")[0];
  const endDate = new Date(project.endDate);
  let endDateFormat = endDate.toISOString().split("T")[0];

  return (
    <tr className="flex items-center mb-2 py-2">
      <Link
        to="/investor/project/1"
        className=" hover:bg-slate-100 ml-8 flex items-center p-2 rounded-md"
      >
        <td className="ml-4 mr-10">
          <p>1</p>
        </td>
        <td className="mr-10">
          <div className="w-40 h-20">
            <img src={project.image} alt="" className="w-full h-full" />
          </div>
        </td>
        <td className="whitespace-nowrap inline-block w-32  ml-2  font-medium">
          {project.name}
        </td>
        <td className="whitespace-nowrap inline-block ml-12 ">
          {startDateFormat}
        </td>
        <td className="whitespace-nowrap inline-block ml-28 ">
          {endDateFormat}
        </td>
        <td className="whitespace-nowrap inline-block ml-24  font-medium">
          {project.status === 1 ? "Còn hoạt động" : "Hết hoạt động"}
        </td>
      </Link>
      <td className="whitespace-nowrap  ml-8 py-4 flex justify-between items-center">
        <button
          className="text-white h-8 px-4 mx-1 rounded-md bg-blue-500"
          onClick={openEditProject}
        >
          Sửa
        </button>
        <Modal
          okText="Edit"
          okButtonProps={{ style: { backgroundColor: "#4974a5" } }}
          title="Edit Project Info"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          className="text-cyan-700"
        >
          {/* Apartment Image */}
          <div className="m-2">
            <p className="m-2">Project Image</p>
            <Input placeholder="Project Image" id="image" name="image"></Input>
          </div>
          {/* Apartment Price */}
          <div className="m-2">
            <p className="m-2">Project Name</p>
            <Input placeholder="Project Name" id="name" name="name"></Input>
          </div>
          <div className="m-2">
            <p className="m-2">Status</p>
            <Select
              defaultValue="Available"
              style={{
                width: 300,
              }}
              options={[
                {
                  value: "true",
                  label: "Available",
                },
                {
                  value: "true",
                  label: "Not Available",
                },
              ]}
            />
          </div>
          <div className="m-2">
            <p className="m-2">Start Date</p>
            <DatePicker
              value={dayjs("2024-02-19")}
              onChange={onChangeStartDate}
            />
          </div>
          <div className="m-2">
            <p className="m-2">End Date</p>
            <DatePicker
              value={dayjs("2024-02-29")}
              onChange={onChangeEndDate}
            />
          </div>
        </Modal>
        <button className="text-white h-8 px-4 mx-1  rounded-md bg-red-500">
          Xoá
        </button>
        <Button
          style={{ backgroundColor: "#4974a5", color: "white" }}
          onClick={showModal}
        >
          Thêm Toà nhà
        </Button>
        <Modal
          okText="Add"
          okButtonProps={{ style: { backgroundColor: "#4974a5" } }}
          title="Toà nhà mới"
          open={isModalAddOpen}
          onOk={handleAddOk}
          onCancel={handleAddCancel}
          className="text-cyan-700"
        >
          <div className="m-2">
            <p className="m-2">Tên toà nhà</p>
            <Input
              placeholder="Tên toà nhà"
              id="buildingName"
              name="buildingName"
            ></Input>
          </div>
          <div className="m-2">
            <p className="m-2">Ảnh</p>
            <Input placeholder="Ảnh" id="image" name="image"></Input>
          </div>
        </Modal>
      </td>
    </tr>
  );
}
