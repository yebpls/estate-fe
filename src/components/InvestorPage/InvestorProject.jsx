import { Button, Col, Input, Modal, Row } from "antd";
import React, { useEffect, useState } from "react";
import ProjectRow from "./ProjectRow";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjectByInvesId } from "../../store/slices/projectSlice";

export default function InvestorProject() {
  const { projects } = useSelector((state) => state.projectReducer);
  const { investor } = useSelector((state) => state.accountReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProjectByInvesId(investor.id));

    console.log(projects);
  }, [investor]);
  return (
    <div className="mx-auto mt-10 w-full px-8">
      <p className="m-2 text-center text-2xl  font-semibold text-blue-700">
        Dự án
      </p>

      <div className="w-full pl-26">
        <thead className="border-b w-full font-medium dark:border-neutral-500">
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
        </thead>
        {projects &&
          projects.map((project) => <ProjectRow project={project} />)}
      </div>
    </div>
  );
}
