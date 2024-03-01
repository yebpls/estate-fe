import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCity } from "../../../store/slices/buildingSlice";
import { Select } from "antd";
import {
  getApartmentByCity,
  getViewApartment,
} from "../../../store/slices/apartmentSlice";
import ByCityName from "./FilterField/ByCityName";
import BySquare from "./FilterField/BySquare";

export default function FilterApartments() {
  const dispatch = useDispatch();

  const resetFilter = () => {
    dispatch(getViewApartment());
  };
  return (
    <div>
      <div className="bg-orange-100 p-4 rounded-md">
        <p className="text-lg text-gray-500 font-semibold mb-3">
          Bộ lọc căn hộ
        </p>
        <ByCityName />
        <BySquare />
        <a
          onClick={resetFilter}
          className="underline mt-5 ml-24 hover:text-orange-400 text-gray-500"
        >
          Làm mới bộ lọc
        </a>
      </div>
    </div>
  );
}
