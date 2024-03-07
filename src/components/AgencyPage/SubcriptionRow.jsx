import React, { useEffect } from "react";
import { getAppointmentByApartmentId } from "../../store/slices/appointmentSlice";
import { getSubcriptionByAppointmentId } from "../../store/slices/subcriptionSlice";
import { useDispatch, useSelector } from "react-redux";

export default function SubcriptionRow({ subcription }) {
  const subscribeDate = new Date(subcription?.subscribeDate)
    .toISOString()
    .split("T")[0];
  const updateDate = new Date(subcription?.updateDate)
    .toISOString()
    .split("T")[0];

  return (
    <div>
      <p>{subcription.id}</p>
      <p>{subscribeDate}</p>
      <p>{updateDate}</p>
    </div>
  );
}
