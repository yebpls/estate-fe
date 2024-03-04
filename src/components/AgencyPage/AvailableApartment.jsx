import React, { useEffect, useState } from "react";
import AvailableApartmentRow from "./AvailableApartmentRow";
import { useDispatch, useSelector } from "react-redux";
import { getAllBuilding } from "../../store/slices/buildingSlice";
import { getAllAvailableApartment } from "../../store/slices/apartmentSlice";
import { Pagination, Spin } from "antd";

export default function AvailableApartment() {
  const [currentPage, setCurrentPage] = useState(1);
  const { availableApartment, isLoading } = useSelector(
    (state) => state.apartmentReducer
  );
  const { isChange } = useSelector((state) => state.bookingDistributionReducer);
  const dispatch = useDispatch();
  // MAKE A PAGING
  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * 5;
  const endIndex = startIndex + 5;
  // Slice the data array to show only the items for the current page
  const currentData = availableApartment?.slice(startIndex, endIndex);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    dispatch(getAllBuilding());
  }, []);
  useEffect(() => {
    dispatch(getAllAvailableApartment());
  }, []);

  return (
    <div className="mx-10 mt-10">
      <p className="m-2 text-center text-2xl  font-semibold text-blue-700">
        Các căn hộ chưa bàn giao
      </p>
      <thead className="border-b font-medium dark:border-neutral-500 text-sm">
        <tr>
          <th scope="col" className="inline-block mx-6 py-4">
            STT
          </th>
          <th scope="col" className="inline-block mx-4 py-4 pl-4">
            Ảnh
          </th>
          <th scope="col" className="inline-block ml-36  py-4">
            Số căn hộ
          </th>
          <th scope="col" className="inline-block ml-16 py-4">
            Giá
          </th>
          <th scope="col" className="inline-block ml-28 py-4">
            Tên dự án
          </th>
          <th scope="col" className="inline-block ml-16 py-4">
            Tên toà nhà
          </th>
          <th scope="col" className="inline-block ml-20 py-4">
            Trạng thái
          </th>
          <th scope="col" className="inline-block ml-20 py-4">
            Nhận dự án
          </th>
        </tr>
      </thead>
      {isLoading ? (
        <div className="flex justify-center mt-32">
          <Spin />
          <p className="ml-2 text-blue-400 text-lg font-thin">Đang lấy dự án</p>
        </div>
      ) : (
        <div>
          {currentData &&
            currentData.map((item, index) => (
              <AvailableApartmentRow
                key={item.id}
                apartment={item}
                stt={index + startIndex + 1}
              />
            ))}
          <Pagination
            current={currentPage}
            total={availableApartment?.length}
            pageSize={5}
            onChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}
