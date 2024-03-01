import {
  Button,
  DatePicker,
  Input,
  Modal,
  Popconfirm,
  Select,
  Spin,
} from "antd";
import { Option } from "antd/es/mentions";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createBuilding } from "../../store/slices/buildingSlice";
import {
  deleteProject,
  getProjectById,
  setIsChange,
  setProjectDetail,
  updateProject,
} from "../../store/slices/projectSlice";
import { DevTool } from "@hookform/devtools";
import { LoadingOutlined } from "@ant-design/icons";
import ChangeForm from "./Form/UpdateProject";
import UpdateProject from "./Form/UpdateProject";
import AddBuilding from "./Form/AddBuilding";

export default function ProjectRow({ project, stt }) {
  const [selectedCity, setSelectedCity] = useState(null);
  const { investor } = useSelector((state) => state.accountReducer);
  const { city } = useSelector((state) => state.buildingReducer);
  const { projectDetail } = useSelector((state) => state.projectReducer);

  const dispatch = useDispatch();
  // });
  const { reset } = useForm();
  // const {
  //   reset,
  //   formState: { errors },
  //   control,
  // } = formBuilding;

  const formBuilding = useForm();

  const { register: registerBuilding, handleSubmit: handleSubmitBuilding } =
    formBuilding;

  const onSubmitBuilding = (data) => {
    console.log(data);
    let formBuilding = {
      projectId: project.id,
      buildingName: data.buildingName,
      address: data.address,
      cityId: data.city,
    };
    dispatch(createBuilding(formBuilding));
  };

  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const showModal = () => {
    setIsModalAddOpen(true);
  };

  const handleAddCancel = () => {
    setIsModalAddOpen(false);
  };

  const handleDeleteProject = (id) => {
    dispatch(deleteProject(id, investor?.id));
  };

  const startDate = new Date(project.startDate);
  let startDateFormat = startDate.toISOString().split("T")[0];
  const endDate = new Date(project.endDate);
  let endDateFormat = endDate.toISOString().split("T")[0];

  return (
    <tr className="flex items-center mb-2 py-2">
      <Link
        to={`/investor/project/${project.id}`}
        className=" hover:bg-slate-100 ml-8 flex items-center p-2 rounded-md"
      >
        <td className="ml-4 mr-10">
          <p>{stt}</p>
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
        {/* Update Button */}
        <UpdateProject project={project} />
        <button
          onClick={() => handleDeleteProject(project.id)}
          className="text-white h-8 px-4 mx-1  rounded-md bg-red-500"
        >
          Xoá
        </button>
        {/* <Button 
          style={{ backgroundColor: "#4974a5", color: "white" }}
          onClick={showModal}
        >
          Thêm Toà nhà
        </Button>
        <Modal
          title="Toà nhà mới"
          open={isModalAddOpen}
          footer={null}
          onCancel={handleAddCancel}
          className="text-cyan-700"
        >
          <form>
            <div className="m-2">
              <p className="m-2">Tên toà nhà</p>
              <input
                className="w-full p-1"
                placeholder="Tên toà nhà"
                id="buildingName"
                name="buildingName"
                {...registerBuilding("buildingName", { require: true })}
              ></input>
            </div>
            <div className="m-2">
              <p className="m-2">Địa chỉ</p>
              <input
                className="w-full p-1"
                {...registerBuilding("address", { require: true })}
                placeholder="Địa chỉ"
                id="address"
                name="address"
              ></input>
            </div>
            <div>
              <p className="ml-2">Tỉnh</p>
              <select
                className="border-2 rounded-md m-2 p-1"
                {...registerBuilding("city", { required: true })}
              >
                {city &&
                  city.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.cityName}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <button></button>
              <button
                className="py-1 px-4 bg-white hover:bg-sky-400 ml-2"
                onClick={handleSubmitBuilding(onSubmitBuilding)}
              >
                Tạo
              </button>
            </div>
          </form>
        </Modal> */}
        <AddBuilding project={project} />
      </td>
    </tr>
  );
}
