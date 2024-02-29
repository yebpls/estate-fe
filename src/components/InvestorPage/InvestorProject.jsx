import {
  Button,
  Col,
  DatePicker,
  Input,
  Modal,
  Pagination,
  Row,
  Spin,
} from "antd";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

import ProjectRow from "./ProjectRow";
import { useDispatch, useSelector } from "react-redux";
import {
  createProject,
  getAllProjectByInvesId,
  setIsChange,
} from "../../store/slices/projectSlice";
import { ToastContainer, toast } from "react-toastify";
import { Controller, useForm } from "react-hook-form";
import { LoadingOutlined } from "@ant-design/icons";
import LoadingComponent from "../SharedComponent/LoadingComponent";

export default function InvestorProject() {
  const { projects, isChange, isLoading, loadingChange } = useSelector(
    (state) => state.projectReducer
  );
  const [currentPage, setCurrentPage] = useState(1);

  const { investor } = useSelector((state) => state.accountReducer);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const form = useForm();

  const dispatch = useDispatch();

  const { reset, control } = form;
  const { register: registerAddProject, handleSubmit: handleSubmitAddProject } =
    form;

  const handleCancel = () => {
    reset();
    setIsModalOpen(false);
  };

  const openForm = () => {
    setIsModalOpen(true);
  };

  const onSubmitCreate = (data) => {
    const investorId = investor.id;
    if (data.endDate < data.startDate) {
      toast.error("Ngày kết thúc phải sau ngày bắt đầu");
      return;
    } else {
      const params = {
        investorId,
        name: data.projectName,
        startDate: data.startDate,
        endDate: data.endDate,
        image: data.image,
      };
      dispatch(createProject(params));
      dispatch(setIsChange());
      setIsModalOpen(false);
      reset();
    }
  };

  useEffect(() => {
    dispatch(getAllProjectByInvesId(investor?.id));
  }, [investor, isChange]);

  // MAKE A PAGING
  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * 5;
  const endIndex = startIndex + 5;

  // Slice the data array to show only the items for the current page
  const currentData = projects?.slice(startIndex, endIndex);
  // console.log("current: ", currentData);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div className="mx-auto mt-10 w-full px-4">
      <p className="m-2 text-center text-2xl  font-semibold text-blue-700">
        Dự án
      </p>
      <LoadingComponent loadingDependency={loadingChange} />
      <button
        onClick={openForm}
        className="px-2 py-1 bg-sky-400 text-white border-transparent hover:text-sky-500 hover:bg-white hover:border-sky-400"
      >
        Tạo dự án mới
      </button>

      <div className="border-b  pl-26 w-full font-medium dark:border-neutral-500">
        <tr>
          <th scope="col" className=" inline-block ml-11 mr-4 py-4">
            STT
          </th>
          <th scope="col" className=" inline-block ml-16 py-4">
            Hình ảnh
          </th>
          <th scope="col" className=" inline-block ml-24 py-4">
            Tên
          </th>
          <th scope="col" className=" inline-block ml-32 py-4">
            Ngày bắt đầu
          </th>
          <th scope="col" className=" inline-block ml-20 py-4">
            Ngày kết thúc
          </th>
          <th scope="col" className=" inline-block ml-20 py-4">
            Trạng thái
          </th>
          <th scope="col" className=" inline-block ml-14 py-4">
            Hành động
          </th>
        </tr>
      </div>
      {/* DISPLAY PAGING */}
      {isLoading ? (
        <div className="flex justify-center mt-32">
          <Spin />
        </div>
      ) : (
        <div>
          {currentData &&
            currentData.map((project, index) => (
              <ProjectRow
                key={project.id}
                stt={index + startIndex + 1}
                project={project}
              />
            ))}
          <Pagination
            current={currentPage}
            total={projects?.length}
            pageSize={5}
            onChange={handlePageChange}
          />
        </div>
      )}
      {/* CREATE NEW PROJECT */}
      <Modal
        okButtonProps={{ style: { backgroundColor: "#4974a5" } }}
        title="Tạo 1 dự án mới"
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
        className="text-cyan-700"
      >
        <form onSubmit={handleSubmitAddProject(onSubmitCreate)}>
          <div className="m-2">
            <p className="m-2">Tên dự án</p>
            <input
              className="px-2 py-1"
              placeholder="Tên dự án"
              {...registerAddProject("projectName", { required: true })}
              id="projectName"
              name="projectName"
            ></input>
          </div>

          <div className="m-2">
            <p className="m-2">Hình ảnh</p>
            <input
              className="px-2 py-1"
              placeholder="Hình ảnh"
              {...registerAddProject("image", { required: true })}
              id="image"
              name="image"
            ></input>
          </div>

          <div className="m-2">
            <p className="m-2">Ngày bắt đầu</p>
            <Controller
              name="startDate"
              control={control}
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
              control={control}
              render={({ field }) => (
                <DatePicker
                  onChange={(date, dateString) => field.onChange(dateString)}
                  value={field.value ? dayjs(field.value) : null}
                />
              )}
            />
          </div>

          <div>
            <button
              className="px-2 py-1 ml-2 bg-white text-sky-400 hover:bg-sky-400 hover:text-white"
              type="submit"
            >
              Tạo
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
