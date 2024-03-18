import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { createProject } from "../../../store/slices/projectSlice";
import { DatePicker, Modal } from "antd";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import schemaAddProject from "../../../yup/schema/schemaAddProject";
import { yupResolver } from "@hookform/resolvers/yup";

export default function AddProject({ investor }) {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const form = useForm({
    resolver: yupResolver(schemaAddProject),
  });
  const { reset, control } = form;
  const {
    register: registerAddProject,
    handleSubmit: handleSubmitAddProject,
    formState: { errors },
  } = form;

  const handleCancel = () => {
    reset();
    setIsModalOpen(false);
  };

  const openForm = () => {
    setIsModalOpen(true);
  };

  const onSubmitCreate = (data) => {
    const params = {
      investorId: investor?.id,
      name: data.projectName,
      startDate: data.startDate,
      endDate: data.endDate,
      image: data.image,
    };
    console.log("create project: ", data, investor?.id);
    dispatch(createProject(params));
    // dispatch(setIsChange());
    setIsModalOpen(false);
    reset();
  };

  const disableStartDate = (current) => {
    const endDate = form.getValues("endDate");

    if (!endDate) {
      return false; // Allow selection when endDate is not set
    }

    const end = dayjs(endDate);
    const minStartDate = end.subtract(3, "months");

    return (
      current && (current < dayjs().startOf("day") || current > minStartDate)
    );
  };

  const disableEndDate = (current) => {
    const startPlusThreeMonths = form.getValues("startDate")
      ? dayjs(form.getValues("startDate")).add(3, "month")
      : null;
    return (
      current &&
      (current < dayjs().startOf("day") ||
        (startPlusThreeMonths && current < startPlusThreeMonths))
    );
  };

  useEffect(() => {
    console.log("investor add: ", investor?.id);
  }, []);
  return (
    <div>
      <button
        onClick={openForm}
        className="px-2 py-1 bg-sky-400 text-white border-transparent hover:text-sky-500 hover:bg-white hover:border-sky-400"
      >
        Tạo dự án mới
      </button>

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
            <p className="text-red-500">{errors.projectName?.message}</p>
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
            <p className="text-red-500">{errors.image?.message}</p>
          </div>

          <div className="m-2">
            <p className="m-2">Ngày bắt đầu</p>
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  disabledDate={disableStartDate}
                  onChange={(date, dateString) => field.onChange(dateString)}
                  value={field.value ? dayjs(field.value) : null}
                />
              )}
            />
            <p className="text-red-500">{errors.startDate?.message}</p>
          </div>
          <div className="m-2">
            <p className="m-2">Ngày kết thúc</p>
            <Controller
              name="endDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  disabledDate={disableEndDate}
                  onChange={(date, dateString) => field.onChange(dateString)}
                  value={field.value ? dayjs(field.value) : null}
                />
              )}
            />
            <p className="text-red-500">{errors.endDate?.message}</p>
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
