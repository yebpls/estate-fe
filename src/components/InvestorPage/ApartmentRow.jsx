import { Input, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteApartment,
  setIsChange,
  updateApartment,
} from "../../store/slices/apartmentSlice";

export default function ApartmentRow({ apartment, stt }) {
  const { buildings } = useSelector((state) => state.buildingReducer);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [building, setBuilding] = useState(null);
  const formattedNumber = apartment.price.toLocaleString("de-DE");

  const dispatch = useDispatch();

  const formChange = useForm({
    defaultValues: {
      apartmentNumber: apartment ? apartment.apartmentNumber : "",
      livingRoom: apartment ? apartment.livingRoom : 0,
      bedRoom: apartment ? apartment.bedRoom : 0,
      bathRoom: apartment ? apartment.bathRoom : 0,
      kitchen: apartment ? apartment.kitchen : 0,
      price: apartment ? apartment.price : 0,
      buildingId: apartment ? apartment.buildingId : 0,
      status: apartment ? apartment.status : 0,
      area: apartment ? apartment.area : 0,
      mainImage: apartment ? apartment.mainImage : "",
    },
  });
  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = formChange;

  const options = buildings?.map((building) => ({
    value: building.id,
    label: building.buildingName,
  }));

  const onSubmit = (data) => {
    dispatch(updateApartment({ params: data, id: apartment.id }));
    dispatch(setIsChange());
    handleCancel();
  };

  const isNumber = (value) => {
    return (!isNaN(value) && !isNaN(parseFloat(value))) || "Phải là số";
  };

  const openEdiApartment = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    reset();
    setIsModalOpen(false);
  };

  const handleDeleteApartment = (id) => {
    dispatch(deleteApartment(id));
  };

  useEffect(() => {
    const buildingitem = buildings?.filter(
      (item) => item.id === apartment.buildingId
    );
    setBuilding(buildingitem[0]);
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

        <td className="whitespace-nowrap text-sm ml-20 w-32">
          {apartment.status === 0 ? "Đã bán" : ""}
          {apartment.status === 1 ? "Còn mở đăng ký bán" : ""}
          {apartment.status === 2 ? "Đã có agency đăng ký" : ""}
        </td>
        <td className="whitespace-nowrap ml-20 py-4 flex justify-between">
          <button
            className="text-white h-8 px-4  mx-1 rounded-md bg-blue-500 text-sm"
            onClick={openEdiApartment}
          >
            Sửa
          </button>
          <Modal
            title="Chỉnh sửa căn hộ"
            open={isModalOpen}
            onCancel={handleCancel}
            footer={null}
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
                      <span className="text-red-500">
                        {errors.bedRoom.message}
                      </span>
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
                      <span className="text-red-500">
                        {errors.kitchen.message}
                      </span>
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
                  control={formChange.control}
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
              <div className="mb-2">
                <p className="mb-2">Trạng thái</p>
                <Controller
                  name="status"
                  control={formChange.control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      style={{ width: 300 }}
                      onChange={(value) => field.onChange(value)}
                      options={[
                        {
                          value: 0,
                          label: "Đã bán",
                        },
                        {
                          value: 1,
                          label: "Còn mở đăng ký bán",
                        },
                        {
                          value: 2,
                          label: "Đã có agency đăng ký",
                        },
                      ]}
                    />
                  )}
                />
              </div>
              <button
                type="submit"
                className="px-3 py-1 ml-2 bg-white text-sky-400 hover:bg-sky-400 hover:text-white"
              >
                Sửa
              </button>
            </form>
          </Modal>
          <button
            onClick={() => handleDeleteApartment(apartment.id)}
            className="text-white h-8 px-4  mx-1  rounded-md bg-red-500 border-transparent hover:border-red-500 hover:bg-white hover:text-red-500 text-sm"
          >
            Xoá
          </button>
        </td>
      </tr>
    </div>
  );
}
