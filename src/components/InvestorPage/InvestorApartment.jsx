import React, { useEffect, useState } from "react";
import ApartmentRow from "./ApartmentRow";
import { Button, Modal, Select, Spin } from "antd";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllByProjectId } from "../../store/slices/buildingSlice";
import {
  createApartment,
  getAllApartmentByProjectId,
  getApartmentByBulding,
  setIsChange,
} from "../../store/slices/apartmentSlice";
import { Controller, useForm } from "react-hook-form";
import AddApartment from "./Form/AddApartment";
import LoadingComponent from "../SharedComponent/LoadingComponent";

export default function InvestorApartment() {
  const { buildings, isLoading } = useSelector(
    (state) => state.buildingReducer
  );
  const { apartmentByProject, isChange, loadingChange } = useSelector(
    (state) => state.apartmentReducer
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { projectId } = useParams();

  const dispatch = useDispatch();

  const form = useForm();
  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const options = buildings?.map((building) => ({
    value: building.id,
    label: building.buildingName,
  }));

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    reset();
    setIsModalOpen(false);
  };

  const onSubmit = (data) => {
    let status = 1;
    console.log(data);
    const params = { ...data, status };
    dispatch(createApartment(params));
    dispatch(setIsChange());
    handleCancel();
  };

  const isNumber = (value) => {
    return (!isNaN(value) && !isNaN(parseFloat(value))) || "Phải là số";
  };

  const filterBuilding = (apartmentByProject, id) => {
    dispatch(getApartmentByBulding(apartmentByProject, id));
  };
  useEffect(() => {
    dispatch(getAllByProjectId(projectId));
    console.log(projectId);
    dispatch(getAllApartmentByProjectId(projectId));
  }, [projectId]);

  useEffect(() => {
    dispatch(getAllApartmentByProjectId(projectId));
  }, [projectId]);

  return (
    <div className="mx-3 px-3 mt-4">
      <LoadingComponent loadingDependency={loadingChange} />
      <p className="m-2 text-center text-2xl  font-semibold text-blue-700">
        Các căn hộ của bạn
      </p>
      <div className="my-4">
        <p className="font-bold text-lg">Danh sách toà nhà:</p>

        {isLoading ? (
          <LoadingComponent
            loadingDependency={isLoading}
            message={"Đang tải danh sách tòa nhà"}
          />
        ) : (
          <div>
            {/* <button
              className="my-1 px-4 py-1 mr-2 bg-transparent hover:bg-sky-400 text-black hover:text-white"

              // onClick={}
            >
              All
            </button> */}
            {buildings &&
              buildings.map((building) => (
                <button
                  className="my-1 px-4 py-1 mr-2 bg-transparent hover:bg-sky-400 text-black hover:text-white"
                  key={building.id}
                  onClick={() =>
                    filterBuilding(apartmentByProject, building.id)
                  }
                >
                  {building.buildingName}
                </button>
              ))}
          </div>
        )}
      </div>
      <AddApartment />
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
    </div>
  );
}
