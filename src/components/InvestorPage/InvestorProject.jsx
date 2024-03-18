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
  getAllProjectByInvesId,
  setIsChange,
} from "../../store/slices/projectSlice";
import { ToastContainer, toast } from "react-toastify";
import { LoadingOutlined } from "@ant-design/icons";
import LoadingComponent from "../SharedComponent/LoadingComponent";
import AddProject from "./Form/AddProject";

export default function InvestorProject() {
  const { projects, isChange, isLoading, loadingChange } = useSelector(
    (state) => state.projectReducer
  );
  const [currentPage, setCurrentPage] = useState(1);

  const { investor } = useSelector((state) => state.accountReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProjectByInvesId(investor?.id));
    console.log("investor id:", investor);
  }, [investor]);

  // MAKE A PAGING
  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * 5;
  const endIndex = startIndex + 5;
  // Slice the data array to show only the items for the current page
  const currentData = projects?.slice(startIndex, endIndex);

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
      <AddProject investor={investor} />

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
          <p className="ml-2 text-blue-400 text-lg font-thin">Đang lấy dự án</p>
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
    </div>
  );
}
