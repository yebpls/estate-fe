import { Button, Col, DatePicker, Input, Modal, Pagination, Row } from "antd";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Controller, useForm } from "react-hook-form";
import ApartmentRow from "./ApartmentRow";
import { useDispatch, useSelector } from "react-redux";
import { getSubcriptionByCustomerId } from "../../store/slices/subcriptionSlice";

export default function BookingApartment() {
  const [currentPage, setCurrentPage] = useState(1);

  const { customer, id } = useSelector((state) => state.accountReducer);
  const { subcriptionByCus } = useSelector((state) => state.subcriptionReducer);
  const dispatch = useDispatch();
  // MAKE A PAGING
  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * 5;
  const endIndex = startIndex + 5;
  // Slice the data array to show only the items for the current page
  const currentData = subcriptionByCus?.slice(startIndex, endIndex);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    dispatch(getSubcriptionByCustomerId(customer?.id));
  }, [dispatch, id]);
  return (
    <div className="mx-auto mt-10 px-8">
      <p className="m-2 text-center text-2xl  font-semibold text-blue-900">
        Danh sách cuộc hẹn của tôi
      </p>
      {currentData &&
        currentData.map((subcription, index) => (
          <ApartmentRow
            key={subcription?.id}
            subcription={subcription}
            stt={index + 1 + startIndex}
          />
        ))}
      {subcriptionByCus?.length > 5 ? (
        <Pagination
          current={currentPage}
          total={subcriptionByCus?.length}
          pageSize={5}
          onChange={handlePageChange}
        />
      ) : (
        ""
      )}
    </div>
  );
}
