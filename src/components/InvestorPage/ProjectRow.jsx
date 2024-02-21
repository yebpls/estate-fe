import { Button, DatePicker, Input, Modal, Select } from "antd";
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

export default function ProjectRow({ project, stt }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const { investor } = useSelector((state) => state.accountReducer);
  const { city } = useSelector((state) => state.buildingReducer);
  const { projectDetail } = useSelector((state) => state.projectReducer);

  const dispatch = useDispatch();

  // const form = useForm({
  //   defaultValues: {
  //     projectName: "",
  //     image: "",
  //     status: 0,
  //     startDate: null,
  //     endDate: null,
  //     // Other fields as needed
  //   },
  // });
  const { reset } = useForm();
  // const {
  //   reset,
  //   formState: { errors },
  //   control,
  // } = formBuilding;

  const formBuilding = useForm();
  const formChangeProject = useForm({
    defaultValues: {
      projectName: "",
      image: "",
      status: 0,
      startDate: null,
      endDate: null,
      // Other fields as needed
    },
  });

  const { register: registerBuilding, handleSubmit: handleSubmitBuilding } =
    formBuilding;
  const {
    register: registerChangeProject,
    handleSubmit: handleSubmitChangeProject,
  } = formChangeProject;

  const onSubmitBuilding = (data) => {
    console.log(data);
    let formBuilding = {
      projectId: project.id,
      buildingName: data.buildingName,
      address: data.address,
      cityId: data.city,
    };
    dispatch(createBuilding(formBuilding));
    handleCancel();
  };

  const onSubmitChangeProject = (data) => {
    let params = {
      name: data.projectName,
      startDate: data.startDate,
      endDate: data.endDate,
      status: data.status,
      investorId: investor.id,
      image: data.image,
    };
    console.log(params);
    dispatch(updateProject({ params: params, id: project.id }));
    dispatch(setIsChange());
    handleCancel();
  };

  const openEditProject = (id) => {
    dispatch(getProjectById(id));
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    dispatch(setProjectDetail());
    reset();
    setIsModalOpen(false);
  };

  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const showModal = () => {
    setIsModalAddOpen(true);
  };

  const handleAddCancel = () => {
    setIsModalAddOpen(false);
  };

  const handleDeleteProject = (id) => {
    dispatch(deleteProject(id, investor.id));
  };

  useEffect(() => {
    // When projectDetail is available (i.e., fetched), update form default values
    if (projectDetail) {
      const startDate = new Date(projectDetail.startDate);
      let startDateFormat = startDate.toISOString().split("T")[0];
      const endDate = new Date(projectDetail.endDate);
      let endDateFormat = endDate.toISOString().split("T")[0];
      formChangeProject.reset({
        projectName: projectDetail.name,
        image: projectDetail.image,
        status: projectDetail.status, // Ensure compatibility with your Select component
        startDate: startDateFormat,
        endDate: endDateFormat,
        // Set other fields as necessary
      });
    }
  }, [projectDetail, formChangeProject.reset]);

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
        <button
          className="text-white h-8 px-4 mx-1 rounded-md bg-blue-500"
          onClick={() => openEditProject(project.id)}
        >
          Sửa
        </button>
        <Modal
          footer={null}
          title="Sửa dự án"
          open={isModalOpen}
          onCancel={handleCancel}
          className="text-cyan-700"
        >
<<<<<<< HEAD
          {/* Apartment Image */}
          <div className="m-2">
            <p className="m-2">Project Image</p>
            <Input placeholder="Project Image" id="image" name="image"></Input>
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
            <p className="m-2">End Date</p>
            <DatePicker
              value={dayjs("2024-02-29")}
              onChange={onChangeEndDate}
            />
          </div>
=======
          <form onSubmit={handleSubmitChangeProject(onSubmitChangeProject)}>
            <div className="m-2">
              <p className="m-2">Tên dự án</p>
              <input
                className="px-2 py-1"
                placeholder="Tên dự án"
                {...registerChangeProject("projectName", { required: true })}
                id="projectName"
                name="projectName"
              ></input>
            </div>

            <div className="m-2">
              <p className="m-2">Hình ảnh</p>
              <input
                className="px-2 py-1"
                placeholder="Hình ảnh"
                {...registerChangeProject("image", { required: true })}
                id="image"
                name="image"
              ></input>
            </div>

            <div className="m-2">
              <p className="m-2">Ngày bắt đầu</p>
              <Controller
                name="startDate"
                control={formChangeProject.control}
                render={({ field }) => (
                  <DatePicker
                    onChange={(date, dateString) => field.onChange(dateString)}
                    value={field.value ? dayjs(field.value) : null}
                  />
                )}
              />
            </div>
            <div className="m-2">
              <p className="m-2">Ngày kết thúc</p>
              <Controller
                name="endDate"
                control={formChangeProject.control}
                render={({ field }) => (
                  <DatePicker
                    onChange={(date, dateString) => field.onChange(dateString)}
                    value={field.value ? dayjs(field.value) : null}
                  />
                )}
              />
            </div>
            <div className="m-2">
              <p className="m-2">Trạng thái</p>
              <Controller
                name="status" // The name of the field
                control={formChangeProject.control} // The control object from useForm()
                render={({ field }) => (
                  <Select
                    {...field}
                    // You can set a default value like this, but it's better to set it in useForm's defaultValues if using react-hook-form
                    style={{ width: 300 }}
                    onChange={(value) => field.onChange(value)} // Ensuring the selected value is updated in react-hook-form
                    options={[
                      {
                        value: 0,
                        label: "Ngưng hoạt động",
                      },
                      {
                        value: 1,
                        label: "Còn hoạt động",
                      },
                    ]}
                  />
                )}
              />
            </div>

            <button
              className="px-2 py-1 ml-2 bg-white text-sky-400 hover:bg-sky-400 hover:text-white"
              type="submit"
            >
              Sửa
            </button>
          </form>
>>>>>>> origin/dev
        </Modal>
        <button
          onClick={() => handleDeleteProject(project.id)}
          className="text-white h-8 px-4 mx-1  rounded-md bg-red-500"
        >
          Xoá
        </button>
        <Button
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
              <p className="m-2">Ảnh</p>
              <input
                className="w-full p-1"
                {...registerBuilding("address", { require: true })}
                placeholder="Địa chỉ"
                id="address"
                name="address"
              ></input>
            </div>
            <div>
              <p className="ml-2">Thành Phố</p>
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
        </Modal>
      </td>
    </tr>
  );
}
