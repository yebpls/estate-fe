import { Input, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function ApartmentRow({ apartment, stt }) {
  const { buildings } = useSelector((state) => state.buildingReducer);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [building, setBuilding] = useState(null);
  const formattedNumber = apartment.price.toLocaleString("de-DE");

  const openEdiApartment = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    console.log(buildings);
    const buildingitem = buildings?.filter(
      (item) => item.id === apartment.buildingId
    );
    setBuilding(buildingitem[0]);

    console.log(buildingitem);
  }, [apartment]);
  return (
    <div>
      <tr className="flex items-center hover:bg-slate-100">
        <td className="mx-6 py-4">
          <p>{stt}</p>
        </td>
        <td className="mx-4 py-4">
          <div className="w-40 h-20">
            <img src={apartment.mainImage} alt="" className="w-full h-full" />
          </div>
        </td>
        <td className="whitespace-nowrap px-6  py-4 font-medium text-sm">
          {apartment.apartmentNumber}
        </td>
        <td className="whitespace-nowrap mx-3  py-4 text-sm">
          {formattedNumber}đ
        </td>
        <td className=" mx-2  py-auto text-sm w-44">{building?.address}</td>
        <td className="whitespace-nowrap  ml-10 mr-6   py-4 text-sm">
          {building?.buildingName}
        </td>

        <td className="whitespace-nowrap text-sm ml-20">
          {apartment.status === 1 ? "Còn mở đăng ký bán" : "Chưa bán"}
        </td>
        <td className="whitespace-nowrap ml-20 py-4 flex justify-between">
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
