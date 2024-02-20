import React, { useState } from "react";
import ApartmentRow from "./ApartmentRow";
import { Button, Input, Modal, Select } from "antd";

export default function InvestorApartment() {
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
  function handleBuildingChange(value) {
    console.log(`selected ${value}`);
  }
  return (
    <div className="mx-10 mt-10">
      <p className="m-2 text-center text-2xl  font-semibold text-blue-700">
        Apartment
      </p>
      <Button
        style={{ backgroundColor: "#4974a5", color: "white" }}
        onClick={showModal}
      >
        Add new apartment
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
        {/* Apartment Building Name */}
        <div className="m-2">
          <p className="m-2">Building Name</p>
          <Select
            placeholder="Select the building"
            style={{
              width: 300,
            }}
            onChange={handleBuildingChange}
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
      <thead className="border-b font-medium dark:border-neutral-500 text-sm">
        <tr>
          <th scope="col" className="px-6 py-4">
            STT
          </th>
          <th scope="col" className="px-6 py-4">
            Image
          </th>
          <th scope="col" className="pl-36  py-4">
            Number
          </th>
          <th scope="col" className="pl-14 py-4">
            Price
          </th>
          <th scope="col" className="pl-12 py-4">
            Address
          </th>
          <th scope="col" className="pl-72 py-4">
            Building Name
          </th>
          <th scope="col" className="pl-14 py-4">
            Action
          </th>
        </tr>
      </thead>
      <ApartmentRow />
      <ApartmentRow />
      <ApartmentRow />
      <ApartmentRow />
      <ApartmentRow />
      <ApartmentRow />
      <ApartmentRow />
    </div>
  );
}
