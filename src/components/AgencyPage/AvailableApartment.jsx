import React, { useEffect, useState } from "react";
import AvailableApartmentRow from "./AvailableApartmentRow";
import { useDispatch, useSelector } from "react-redux";
import { getAllBuilding } from "../../store/slices/buildingSlice";
import { getAllAvailableApartment } from "../../store/slices/apartmentSlice";
import { Spin } from "antd";

export default function AvailableApartment() {
  const { availableApartment, isLoading } = useSelector(
    (state) => state.apartmentReducer
  );
  const { isChange } = useSelector((state) => state.bookingDistributionReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllBuilding());
  }, []);
  useEffect(() => {
    dispatch(getAllAvailableApartment());
  }, [isChange]);

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
        <div className="flex justify-center">
          <Spin />
        </div>
      ) : (
        ""
      )}
      {availableApartment &&
        availableApartment.map((item, index) => (
          <AvailableApartmentRow
            key={item.id}
            apartment={item}
            stt={index + 1}
          />
        ))}
      {/* <AvailableApartmentRow />
      <AvailableApartmentRow />
      <AvailableApartmentRow />
      <AvailableApartmentRow />
      <AvailableApartmentRow />
      <AvailableApartmentRow />
      <AvailableApartmentRow /> */}
    </div>
  );
}
