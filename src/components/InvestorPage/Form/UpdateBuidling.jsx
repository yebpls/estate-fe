import { Button, DatePicker, Modal, Popconfirm, Select, Spin } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProjectByInvesId,
  getProjectById,
  setIsChange,
  setProjectDetail,
  updateProject,
} from "../../../store/slices/projectSlice";
import { LoadingOutlined } from "@ant-design/icons";
import { updateBuilding } from "../../../store/slices/buildingSlice";

export default function UpdateBuilding({ building, projectId }) {
  const { city, loadingModal } = useSelector((state) => state.buildingReducer);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();
  const { reset } = useForm();
  const openEditProject = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    dispatch(setProjectDetail());
    reset();
    setIsModalOpen(false);
  };
  const options = city?.map((city) => ({
    value: city.id,
    label: city.cityName,
  }));
  const formChangeBuilding = useForm({
    defaultValues: {
      id: building ? building.id : "",
      buildingName: building ? building.name : "",
      cityId: building ? building.cityId : "",
      cityname: city?.map((city) => city.id === building.cityId),
      address: building ? building.address : "",
      projectId: projectId ? projectId : "",
      // Other fields as needed
    },
  });
  const {
    register: registerChangeBuilding,
    handleSubmit: handleSubmitChangeBuilding,
  } = formChangeBuilding;
  const onSubmitChangeBuilding = (data) => {
    console.log("update data", data);
    const { cityName, id, ...params } = data;
    console.log("update param", params);
    dispatch(updateBuilding({ params: params, id: data.id }));
    handleCancel();
  };
  useEffect(() => {
    // When projectDetail is available (i.e., fetched), update form default values
    if (building) {
      formChangeBuilding.reset({
        id: building.id,
        buildingName: building.buildingName,
        cityId: building.cityId,
        address: building.address,
        cityName: city?.filter((city) => {
          return city.id === building.cityId;
        }),
        projectId: projectId,
        // Set other fields as necessary
      });
      console.log(building);
    }
  }, [building, formChangeBuilding.reset]);
  return (
    <div>
      <button
        className="mb-1 mx-1 w-12 text-white px-1 bg-blue-500"
        onClick={() => openEditProject()}
      >
        Sửa
      </button>
      <Modal
        footer={null}
        title="Sửa Thông tin tòa nhà"
        open={isModalOpen}
        onCancel={handleCancel}
        className="text-cyan-700"
      >
        {loadingModal ? (
          <div className="mt-11 ml-32 h-20">
            <Spin
              indicator={
                <LoadingOutlined
                  style={{
                    fontSize: 24,
                  }}
                  spin
                />
              }
            />{" "}
            Đang tải dự án
          </div>
        ) : (
          <form onSubmit={handleSubmitChangeBuilding(onSubmitChangeBuilding)}>
            <div className="m-2">
              <p className="m-2">Tên tòa nhà</p>
              <input
                className="px-2 py-1"
                placeholder="Tên tòa nhà"
                {...registerChangeBuilding("buildingName", { required: true })}
                id="buildingName"
                name="buildingName"
              ></input>
            </div>
            <div className="m-2 w-96">
              <p className="m-2">Địa chỉ tòa nhà</p>
              <input
                className="px-2 py-1 w-full"
                placeholder="Địa chỉ tòa nhà"
                {...registerChangeBuilding("address", { required: true })}
                id="address"
                name="address"
              ></input>
            </div>

            <div className="mb-2">
              <p className="mb-2">Tỉnh/Thành phố</p>
              <Controller
                name="cityId"
                control={formChangeBuilding.control}
                render={({ field }) => (
                  <Select
                    {...field}
                    style={{ width: 150 }}
                    placeholder={"Chọn tỉnh thành"}
                    // defaultValue={options[0].value}
                    onChange={(value) => field.onChange(value)}
                    options={options}
                  />
                )}
              />
            </div>

            <Popconfirm
              placement="right"
              title="Nhắc nhở"
              description="Bạn có muốn đổi sửa lại dự án không?"
              onConfirm={handleSubmitChangeBuilding(onSubmitChangeBuilding)}
              okButtonProps={{
                style: { backgroundColor: "#1ac5ff " },
              }}
              okText="Đổi"
              cancelText="Không"
              cancelButtonProps={{
                style: {
                  color: "#1ac5ff ",
                },
              }}
            >
              <Button
                className="px-2 py-1 ml-2 mt-1 w-16 bg-white text-sky-400 hover:bg-sky-400 border-slate-300 hover:text-white"
                type="submit"
              >
                Sửa
              </Button>
            </Popconfirm>
          </form>
        )}
      </Modal>
    </div>
  );
}
