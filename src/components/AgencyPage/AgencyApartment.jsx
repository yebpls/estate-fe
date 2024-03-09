import React, { useEffect, useState } from "react";
import { Button, Input, Modal, Pagination, Select, Spin } from "antd";
import AgencyApartmentRow from "./AgencyApartmentRow";
import { useDispatch, useSelector } from "react-redux";
import { getAllBuilding } from "../../store/slices/buildingSlice";
import LoadingComponent from "../SharedComponent/LoadingComponent";

export default function AgencyApartment() {
  const [agencyApart, setAgencyApart] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { apartments, isLoading } = useSelector(
    (state) => state.apartmentReducer
  );
  const { bookingDistribution } = useSelector(
    (state) => state.bookingDistributionReducer
  );
  const dispatch = useDispatch();
  // MAKE A PAGING
  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * 5;
  const endIndex = startIndex + 5;
  // Slice the data array to show only the items for the current page
  const currentData = agencyApart?.slice(startIndex, endIndex);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    const matchedApartments = apartments
      ?.map((apartment) => {
        // Find the matching booking for the current apartment
        const matchingBooking = bookingDistribution?.find(
          (booking) => booking.apartmentId === apartment.id
        );

        // If there's a matching booking, spread its desired properties into the current apartment object
        if (matchingBooking) {
          return {
            ...apartment,
            bookingFee: matchingBooking.bookingFee,
            distributionDate: matchingBooking.distributionDate,
            expireDistributionDate: matchingBooking.expireDistributionDate,
            bookingId: matchingBooking.id,
            // Include any other booking properties you need
          };
        }

        // If no matching booking is found, return the apartment as is
        return apartment;
      })
      .filter((apartment) => apartment.bookingFee);

    setAgencyApart(matchedApartments);
    // console.log(matchedApartments);
  }, [bookingDistribution, apartments]);

  useEffect(() => {
    dispatch(getAllBuilding());
  }, []);
  return (
    <div className="mx-5 mt-10">
      <LoadingComponent loadingDependency={isLoading} message={"Đang huỷ"} />
      <p className="m-2 text-center text-2xl  font-semibold text-blue-700">
        Các căn hộ đang bán hộ
      </p>
      <thead className="border-b font-medium dark:border-neutral-500 text-sm text-slate-600">
        <tr>
          <th scope="col" className="px-6 py-4">
            STT
          </th>
          <th scope="col" className="px-2 py-4 pl-4">
            Ảnh
          </th>
          <th scope="col" className="pl-40  py-4">
            Số căn hộ
          </th>
          <th scope="col" className="pl-9 py-2">
            Giá
          </th>
          <th scope="col" className="pl-28   py-4">
            Dự án
          </th>
          <th scope="col" className="pl-12 py-4">
            Tên tòa nhà
          </th>
          <th scope="col" className="pl-10 py-4">
            Mức phí
          </th>
          <th scope="col" className="pl-11 py-4">
            Ngày phân phối
          </th>
          <th scope="col" className="pl-12 py-4">
            Ngày hết hạn
          </th>
          <th scope="col" className="pl-14 py-4">
            Hành động
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
              <AgencyApartmentRow
                key={item.id}
                apartment={item}
                stt={index + startIndex + 1}
                // apartmentId={item.apartmentId}
              />
            ))}
          <Pagination
            current={currentPage}
            total={agencyApart?.length}
            pageSize={5}
            onChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}
