import React, { useEffect } from "react";
import { getAppointmentByApartmentId } from "../../store/slices/appointmentSlice";
import { getSubcriptionByAppointmentId } from "../../store/slices/subcriptionSlice";
import { useDispatch, useSelector } from "react-redux";

export default function SubcriptionRow({ subcriptions }) {
  return (
    <div>
      {subcriptions?.map((subcription) => (
        <div>
          <p>{subcription?.id}</p>
          <p>{subcription?.subscribeDate}</p>
        </div>
      ))}
    </div>
  );
}
