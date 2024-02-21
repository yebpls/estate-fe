import React, { useEffect, useState } from "react";
import ApartmentRow from "./ApartmentRow";
import { Button, Input, Modal, Select } from "antd";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllByProjectId } from "../../store/slices/buildingSlice";
import { getAllApartmentByProjectId } from "../../store/slices/apartmentSlice";

export default function InvestorApartment() {
  const { buildings } = useSelector((state) => state.buildingReducer);
  const { apartmentByProject } = useSelector((state) => state.apartmentReducer);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { projectId } = useParams();

  const dispatch = useDispatch();
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

  useEffect(() => {
    dispatch(getAllByProjectId(projectId));
    dispatch(getAllApartmentByProjectId(projectId));
  }, [projectId]);

  return (
    <div className="mx-3 px-3 mt-10">
      <p className="m-2 text-center text-2xl  font-semibold text-blue-700">
        Các căn hộ của bạn
      </p>
      <div className="my-4">
        <p className="font-bold text-lg">Danh sách toà nhà:</p>

        {buildings &&
          buildings.map((building) => (
            <button
              className="px-4 py-1 mr-2 bg-transparent hover:bg-sky-400 text-black hover:text-white"
              key={building.id}
            >
              {building.buildingName}
            </button>
          ))}
      </div>
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
          <th scope="col" className="inline-block mx-4 py-4">
            STT
          </th>
          <th scope="col" className="inline-block mx-6 py-4">
            Ảnh
          </th>
          <th scope="col" className="inline-block ml-32  py-4">
            Số phòng
          </th>
          <th scope="col" className="inline-block ml-14 py-4">
            Giá
          </th>
          <th scope="col" className="inline-block ml-12 py-4">
            Địa chỉ
          </th>
          <th scope="col" className="inline-block ml-44 py-4">
            Toà nhà
          </th>
          <th scope="col" className="inline-block ml-32 py-4">
            Trạng thái
          </th>
          <th scope="col" className="inline-block ml-32 py-4">
            Hành động
          </th>
        </tr>
      </thead>
      {apartmentByProject &&
        apartmentByProject.map((item, index) => (
          <ApartmentRow apartment={item} key={item.id} stt={index + 1} />
        ))}
      {/* <ApartmentRow />
      <ApartmentRow />
      <ApartmentRow />
      <ApartmentRow />
      <ApartmentRow />
      <ApartmentRow /> */}
    </div>
  );
}
