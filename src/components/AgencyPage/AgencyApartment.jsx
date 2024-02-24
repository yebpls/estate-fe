import React, { useEffect, useState } from "react";
import { Button, Input, Modal, Select } from "antd";
import AgencyApartmentRow from "./AgencyApartmentRow";
import { useSelector } from "react-redux";

export default function AgencyApartment() {
  const [agencyApart, setAgencyApart] = useState(null);
  const { apartments } = useSelector((state) => state.apartmentReducer);
  const { bookingDistribution } = useSelector(
    (state) => state.bookingDistributionReducer
  );
  useEffect(() => {
    const matchedApartments = apartments
      ?.map((apartment) => {
        // Find the matching booking for the current apartment
        const matchingBooking = bookingDistribution.find(
          (booking) => booking.apartmentId === apartment.id
        );

        // If there's a matching booking, spread its desired properties into the current apartment object
        if (matchingBooking) {
          return {
            ...apartment,
            bookingFee: matchingBooking.bookingFee,
            distributionDate: matchingBooking.distributionDate,
            expireDistributionDate: matchingBooking.expireDistributionDate,
            // Include any other booking properties you need
          };
        }

        // If no matching booking is found, return the apartment as is
        return apartment;
      })
      .filter((apartment) => apartment.bookingFee);

    setAgencyApart(matchedApartments);
    console.log(matchedApartments);
  }, [bookingDistribution, apartments]);
  return (
    <div className="mx-10 mt-10">
      <p className="m-2 text-center text-2xl  font-semibold text-blue-700">
        Các căn hộ đang bán hộ
      </p>
      <thead className="border-b font-medium dark:border-neutral-500 text-sm">
        <tr>
          <th scope="col" className="px-6 py-4">
            STT
          </th>
          <th scope="col" className="px-4 py-4 pl-4">
            Ảnh
          </th>
          <th scope="col" className="pl-36  py-4">
            Số của căn hộ
          </th>
          <th scope="col" className="pl-10 py-4">
            Giá
          </th>
          <th scope="col" className="pl-24 py-4">
            Dự án
          </th>
          <th scope="col" className="pl-12 py-4">
            Tên tòa nhà
          </th>
          <th scope="col" className="pl-12 py-4">
            Mức phí
          </th>
          <th scope="col" className="pl-12 py-4">
            Ngày phân phối
          </th>
          <th scope="col" className="pl-12 py-4">
            Ngày hết hạn
          </th>
          <th scope="col" className="pl-10 py-4">
            Hủy dự án
          </th>
        </tr>
      </thead>

      {agencyApart &&
        agencyApart.map((item, index) => (
          <AgencyApartmentRow
            key={item.id}
            apartment={item}
            stt={index + 1}
            // apartmentId={item.apartmentId}
          />
        ))}
    </div>
  );
}
