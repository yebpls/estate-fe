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

export default function UpdateProject({ project }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { investor } = useSelector((state) => state.accountReducer);
  const { projectDetail, loadingModal } = useSelector(
    (state) => state.projectReducer
  );

  const dispatch = useDispatch();
  const { reset } = useForm();
  const openEditProject = (id) => {
    dispatch(getProjectById(id));
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    dispatch(setProjectDetail());
    reset();
    setIsModalOpen(false);
  };
  const formBuilding = useForm();
  const startDate = new Date(project.startDate);
  const endDate = new Date(project.endDate);
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
  const onSubmitChangeProject = (data) => {
    console.log(data);
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
    // dispatch(getAllProjectByInvesId(investor.id));
    handleCancel();
  };
  const disableStartDate = (current) => {
    return current && current < dayjs().startOf("day");
  };

  const disableEndDate = (current) => {
    const startPlusThreeMonths = startDate
      ? dayjs(startDate).add(3, "month")
      : null;
    return (
      current &&
      (current < dayjs().startOf("day") ||
        (startPlusThreeMonths && current < startPlusThreeMonths))
    );
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
  return (
    <div>
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
                    disabledDate={disableStartDate}
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
                    disabledDate={disableEndDate}
                    onChange={(date, dateString) => field.onChange(dateString)}
                    value={field.value ? dayjs(field.value) : null}
                  />
                )}
              />
            </div>
            <div className="m-2">
              <p className="m-2">Trạng thái</p>
              <Controller
                name="status"
                control={formChangeProject.control}
                render={({ field }) => (
                  <Select
                    {...field}
                    style={{ width: 300 }}
                    onChange={(value) => field.onChange(value)}
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
            <Popconfirm
              placement="right"
              title="Nhắc nhở"
              description="Bạn có muốn đổi sửa lại dự án không?"
              onConfirm={handleSubmitChangeProject(onSubmitChangeProject)}
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
