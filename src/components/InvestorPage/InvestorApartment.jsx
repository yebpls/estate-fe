import React, { useEffect, useState } from "react";
import ApartmentRow from "./ApartmentRow";
import { Button, Modal, Select, Spin } from "antd";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllByProjectId } from "../../store/slices/buildingSlice";
import {
  createApartment,
  getAllApartmentByProjectId,
  setIsChange,
} from "../../store/slices/apartmentSlice";
import { Controller, useForm } from "react-hook-form";

export default function InvestorApartment() {
  const { buildings } = useSelector((state) => state.buildingReducer);
  const { apartmentByProject, isChange } = useSelector(
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

  useEffect(() => {
    dispatch(getAllByProjectId(projectId));
    dispatch(getAllApartmentByProjectId(projectId));
  }, [projectId]);

  useEffect(() => {
    dispatch(getAllApartmentByProjectId(projectId));
  }, [projectId, isChange]);

  return (
    <div className="mx-3 px-3 mt-4">
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
        title="Tạo căn hộ mới"
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
        className="text-cyan-700"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2">
            <p className="mb-2 inline-block">Số phòng:</p>
            <input
              className={`ml-1 px-2 py-1 w-full ${
                errors.apartmentNumber && "border-red-500"
              }`}
              placeholder="Số phòng"
              {...register("apartmentNumber", { required: true })}
              id="apartmentNumber"
              name="apartmentNumber"
            ></input>
          </div>
          <div className="mb-2">
            <p className="mb-2 inline-block">Ảnh chính:</p>
            <input
              className={`ml-1 px-2 py-1 w-full ${
                errors.mainImage && "border-red-500"
              }`}
              placeholder="Ảnh chính"
              {...register("mainImage", { required: true })}
              id="mainImage"
              name="mainImage"
            ></input>
          </div>
          <div className="mb-2">
            <p className="mb-2 inline-block">Giá:</p>{" "}
            {errors.price && (
              <span className="text-red-500">{errors.price.message}</span>
            )}
            <input
              className={`ml-1 px-2 py-1 w-full ${
                errors.price && "border-red-500"
              }`}
              placeholder="Giá"
              {...register("price", { required: true, validate: isNumber })}
              id="price"
              name="price"
            />
          </div>
          <div className="flex justify-between w-full">
            <div className="flex flex-col w-1/2">
              <div className="mb-2 mr-2">
                <p className="mb-2 mr-2 inline-block">Phòng khách:</p>{" "}
                {errors.livingRoom && (
                  <span className="text-red-500">
                    {errors.livingRoom.message}
                  </span>
                )}
                <input
                  className={`ml-1 mr-2 px-2 py-1 w-full ${
                    errors.livingRoom && "border-red-500"
                  }`}
                  placeholder="Phòng khách"
                  {...register("livingRoom", {
                    required: true,
                    validate: isNumber,
                  })}
                  id="livingRoom"
                  name="livingRoom"
                />
              </div>
              <div className="mb-2 mr-2">
                <p className="mb-2 mr-2 inline-block">Phòng ngủ:</p>{" "}
                {errors.bedRoom && (
                  <span className="text-red-500">{errors.bedRoom.message}</span>
                )}
                <input
                  className={`ml-1 mr-2 px-2 py-1 w-full ${
                    errors.bedRoom && "border-red-500"
                  }`}
                  placeholder="Phòng ngủ"
                  {...register("bedRoom", {
                    required: true,
                    validate: isNumber,
                  })}
                  id="bedRoom"
                  name="bedRoom"
                />
              </div>
            </div>
            <div className="flex flex-col w-1/2">
              <div className="mb-2 mr-2">
                <p className="mb-2 mr-2 inline-block">Phòng tắm:</p>{" "}
                {errors.bathRoom && (
                  <span className="text-red-500">
                    {errors.bathRoom.message}
                  </span>
                )}
                <input
                  className={`ml-1 mr-2 px-2 py-1 w-full ${
                    errors.bathRoom && "border-red-500"
                  }`}
                  placeholder="Phòng tắm"
                  {...register("bathRoom", {
                    required: true,
                    validate: isNumber,
                  })}
                  id="bathRoom"
                  name="bathRoom"
                />
              </div>
              <div className="mb-2">
                <p className="mb-2 inline-block">Nhà bếp:</p>{" "}
                {errors.kitchen && (
                  <span className="text-red-500">{errors.kitchen.message}</span>
                )}
                <input
                  className={`ml-1 px-2 py-1 w-full ${
                    errors.kitchen && "border-red-500"
                  }`}
                  placeholder="Nhà bếp"
                  {...register("kitchen", {
                    required: true,
                    validate: isNumber,
                  })}
                  id="kitchen"
                  name="kitchen"
                />
              </div>
            </div>
          </div>
          <div className="mb-2">
            <p className="mb-2 inline-block">Diện tích:</p>{" "}
            {errors.area && (
              <span className="text-red-500">{errors.area.message}</span>
            )}
            <input
              className={`ml-1 px-2 py-1 w-full ${
                errors.area && "border-red-500"
              }`}
              placeholder="Diện tích"
              {...register("area", { required: true, validate: isNumber })}
              id="area"
              name="area"
            />
          </div>
          <div className="mb-2">
            <p className="mb-2">Toà nhà</p>
            <Controller
              name="buildingId"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  style={{ width: 300 }}
                  placeholder={"Chọn toà nhà"}
                  // defaultValue={options[0].value}
                  onChange={(value) => field.onChange(value)}
                  options={options}
                />
              )}
            />
          </div>
          <button
            type="submit"
            className="px-3 py-1 ml-2 bg-white text-sky-400 hover:bg-sky-400 hover:text-white"
          >
            Tạo
          </button>
        </form>
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
