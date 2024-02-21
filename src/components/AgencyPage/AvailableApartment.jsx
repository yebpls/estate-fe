import React, { useState } from "react";
import AvailableApartmentRow from "./AvailableApartmentRow";

export default function AvailableApartment() {
  return (
    <div className="mx-10 mt-10">
      <p className="m-2 text-center text-2xl  font-semibold text-blue-700">
        Các căn hộ chưa bàn giao
      </p>
      <thead className="border-b font-medium dark:border-neutral-500 text-sm">
        <tr>
          <th scope="col" className="px-6 py-4">
            STT
          </th>
          <th scope="col" className="px-4 py-4 pl-14">
            Ảnh
          </th>
          <th scope="col" className="pl-28  py-4">
            Số của căn hộ
          </th>
          <th scope="col" className="pl-10 py-4">
            Giá
          </th>
          <th scope="col" className="px-28 py-4">
            Địa chỉ
          </th>
          <th scope="col" className="pl-40 py-4">
            Tên tòa nhà
          </th>
          <th scope="col" className="pl-14 py-4">
            Hủy dự án
          </th>
        </tr>
      </thead>
      <AvailableApartmentRow />
      <AvailableApartmentRow />
      <AvailableApartmentRow />
      <AvailableApartmentRow />
      <AvailableApartmentRow />
      <AvailableApartmentRow />
      <AvailableApartmentRow />
    </div>
  );
}
