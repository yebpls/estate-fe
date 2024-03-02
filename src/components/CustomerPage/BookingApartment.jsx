import { Button, Col, DatePicker, Input, Modal, Row } from "antd";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Controller, useForm } from "react-hook-form";
import ApartmentRow from "./ApartmentRow";

export default function BookingApartment() {
  return (
    <div className="mx-auto mt-10 w-full px-8">
      <p className="m-2 text-center text-2xl  font-semibold text-blue-900">
        Danh sách cuộc hẹn của tôi
      </p>
      <ApartmentRow />
      <ApartmentRow />
      <ApartmentRow />
      <ApartmentRow />
      <ApartmentRow />
      <ApartmentRow />
    </div>
  );
}
