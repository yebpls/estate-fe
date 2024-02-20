import { DatePicker, Input, Modal, Select } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ProjectRow() {
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
  return (
    <div>
      <tr className="flex">
        <Link to="/investor/project/1" className="hover:bg-slate-100">
          <td className=" px-6 py-4">
            <div className="w-40 h-20">
              <img
                src={`https://cdnassets.hw.net/04/2c/967deff449bd8a24c5fbb96dccd2/6474f8a03a894163ac235432988b491f.png`}
                alt=""
                className="w-full h-full"
              />
            </div>
          </td>
          <td className="whitespace-nowrap px-14 mx-2 py-4 font-medium">
            Name
          </td>
          <td className="whitespace-nowrap px-6 mx-2 py-4">From 19/02/2024</td>
          <td className="whitespace-nowrap px-6 mx-2 py-4">To 24/02/2024</td>

          {/* <td className="whitespace-nowrap px-6 py-4">
        {pet.isSold ? "Đã bán" : "Chưa bán"}
      </td> */}
          <td className="whitespace-nowrap pl-8 mx-2 py-4 font-medium">
            Available
          </td>
        </Link>
        <td className="whitespace-nowrap px-6 py-4 flex justify-between">
          <button
            className="text-white h-8 px-4 mt-14 mx-1 rounded-md bg-blue-500"
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
              <Input
                placeholder="Project Image"
                id="image"
                name="image"
              ></Input>
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
              <p className="m-2">Start Date</p>
              <DatePicker
                value={dayjs("2024-02-29")}
                onChange={onChangeEndDate}
              />
            </div>
          </Modal>
          <button className="text-white h-8 px-4 mt-14 mx-1  rounded-md bg-red-500">
            Xoá
          </button>
        </td>
      </tr>
    </div>
  );
}
