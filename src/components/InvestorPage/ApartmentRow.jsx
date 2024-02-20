import { Input, Modal, Select } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ApartmentRow() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openEdiApartment = () => {
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
        <td className="whitespace-nowrap px-6 mx-2  py-4 font-medium text-sm">
          Number
        </td>
        <td className="whitespace-nowrap px-6 mx-2  py-4 text-sm">Price</td>
        <td className=" mx-2  py-auto text-sm">
          12 Le Loi Boulevard, Tan Uyen Town, Binh Duong
        </td>
        <td className="whitespace-nowrap  ml-10 mr-6   py-4 text-sm">
          Building Name
        </td>

        {/* <td className="whitespace-nowrap px-6 py-4">
      {pet.isSold ? "Đã bán" : "Chưa bán"}
    </td> */}
        <td className="whitespace-nowrap px-6 py-4 flex justify-between">
          <button
            className="text-white h-8 px-4  mx-1 rounded-md bg-blue-500 text-sm"
            onClick={openEdiApartment}
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
              <p className="m-2">Apartment Image</p>
              <Input
                placeholder="Project Image"
                id="image"
                name="image"
              ></Input>
            </div>
            {/* Apartment Price */}
            <div className="m-2">
              <p className="m-2">Apartment Number</p>
              <Input
                placeholder="Apartment Number"
                id="number"
                name="number"
              ></Input>
            </div>
            <div className="m-2">
              <p className="m-2">Apartment Number</p>
              <Input
                placeholder="Apartment Number"
                id="number"
                name="number"
              ></Input>
            </div>
            <div className="m-2">
              <p className="m-2">Building Name</p>
              <Select
                defaultValue="building1"
                style={{
                  width: 300,
                }}
                options={[
                  {
                    value: "building1",
                    label: "Building 1",
                  },
                  {
                    value: "building2",
                    label: "Building 2",
                  },
                  {
                    value: "building3",
                    label: "Building 3",
                  },
                ]}
              />
            </div>
          </Modal>
          <button className="text-white h-8 px-4  mx-1  rounded-md bg-red-500 text-sm">
            Xoá
          </button>
        </td>
      </tr>
    </div>
  );
}
