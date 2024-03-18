import React, { useEffect, useState } from "react";
import ApartmentRow from "./ApartmentRow";
import { Button, Modal, Pagination, Select, Spin } from "antd";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllByProjectId } from "../../store/slices/buildingSlice";
import {
  createApartment,
  getAllApartmentByProjectId,
  getApartmentByBuilding,
  setIsChange,
  getAll,
} from "../../store/slices/apartmentSlice";
import { Controller, useForm } from "react-hook-form";
import AddApartment from "./Form/AddApartment";
import LoadingComponent from "../SharedComponent/LoadingComponent";
import AddBuilding from "./Form/AddBuilding";
import ManageBuilding from "./ManageBuilding";

export default function InvestorApartment() {
  const [currentPage, setCurrentPage] = useState(1);
  const { buildings, isLoading, buildingByProject } = useSelector(
    (state) => state.buildingReducer
  );
  const { loadingApartment, loadingChange, displayApartment } = useSelector(
    (state) => state.apartmentReducer
  );
  // const [displayApartment, setdisplayApartment] = useState(apartmentByProject);
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

  // const options = buildings?.map((building) => ({
  //   value: building.id,
  //   label: building.buildingName,
  // }));

  const isNumber = (value) => {
    return (!isNaN(value) && !isNaN(parseFloat(value))) || "Phải là số";
  };

  const getAllApartment = () => {
    dispatch(getAll());
  };
  const filterBuilding = (id) => {
    console.log(id);
    dispatch(getApartmentByBuilding(id));
  };
  // MAKE A PAGING
  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * 5;
  const endIndex = startIndex + 5;
  // Slice the data array to show only the items for the current page
  const currentData = displayApartment?.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    dispatch(getAllByProjectId(projectId));
    console.log(projectId);
    dispatch(getAllApartmentByProjectId(projectId));
    // dispatch(getAll());
    // console.log("displayed:", displayApartment);
  }, [projectId]);

  return (
    <div className="mx-3 px-3 mt-4">
      <LoadingComponent loadingDependency={loadingChange} />
      <div className="flex">
        <button className="border-none inline-block text-left">
          <Link
            to="/investor/project"
            className="text-sky-600 hover:text-sky-400"
          >
            ← Trở về trang trước
          </Link>
        </button>
        <p className="mx-auto inline-block text-center text-2xl  font-semibold text-blue-700">
          Các căn hộ của bạn
        </p>{" "}
      </div>

      <div className="my-4">
        <p className="font-bold text-lg">Danh sách toà nhà:</p>
        <ManageBuilding projectId={projectId} buildings={buildingByProject} />

        {isLoading ? (
          <LoadingComponent
            loadingDependency={isLoading}
            message={"Đang tải danh sách tòa nhà"}
          />
        ) : (
          <div className="inline">
            <button
              className="my-1 px-4 py-1 mr-2 bg-transparent hover:bg-sky-400 text-black hover:text-white"
              onClick={() => getAllApartment(projectId)}
            >
              All
            </button>
            {buildingByProject &&
              buildingByProject?.map((building) => (
                <button
                  className="my-1 px-4 py-1 mr-2 bg-transparent hover:bg-sky-400 text-black hover:text-white"
                  key={building.id}
                  onClick={() => filterBuilding(building.id)}
                >
                  {building.buildingName}
                </button>
              ))}
          </div>
        )}
      </div>
      <AddApartment />
      <thead className="border-b font-medium dark:border-neutral-500 text-sm">
        <tr>
          <th scope="col" className="inline-block mx-4 py-4">
            STT
          </th>
          <th scope="col" className="inline-block mx-8 py-4">
            Ảnh
          </th>
          <th scope="col" className="inline-block ml-28  py-4">
            Số phòng
          </th>
          <th scope="col" className="inline-block ml-10 py-4">
            Giá
          </th>
          <th scope="col" className="inline-block ml-28 py-4">
            Địa chỉ
          </th>
          <th scope="col" className="inline-block ml-44 py-4">
            Toà nhà
          </th>
          <th scope="col" className="inline-block ml-20 py-4">
            Trạng thái
          </th>
          <th scope="col" className="inline-block ml-36 py-4">
            Hành động
          </th>
        </tr>
      </thead>
      {loadingApartment ? (
        <div className="flex justify-center mt-32">
          <Spin />
          <p className="ml-2 text-blue-400 text-lg font-thin">Đang lấy dự án</p>
        </div>
      ) : (
        <div>
          {currentData &&
            currentData.map((item, index) => (
              <ApartmentRow
                apartment={item}
                key={item.id}
                stt={index + startIndex + 1}
              />
            ))}
          {displayApartment?.length > 5 ? (
            <Pagination
              current={currentPage}
              total={displayApartment?.length}
              pageSize={5}
              onChange={handlePageChange}
            />
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
}
