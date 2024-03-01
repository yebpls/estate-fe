import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCity } from "../../../store/slices/buildingSlice";
import { Select } from "antd";
import {
  getApartmentByCity,
  getViewApartment,
} from "../../../store/slices/apartmentSlice";

export default function FilterApartments() {
  const { city } = useSelector((state) => state.buildingReducer);
  const dispatch = useDispatch();

  const filterByCity = (value) => {
    console.log(`selected ${value}`);
    dispatch(getApartmentByCity(value));
  };
  const resetFilter = () => {
    dispatch(getViewApartment());
  };
  const citySelectOption = city?.map((city) => {
    return { value: city?.cityName, label: city?.cityName };
  });
  useEffect(() => {
    dispatch(getAllCity());
  }, []);
  return (
    <div>
      <div className="bg-orange-100 p-4 rounded-md">
        <p className="text-lg text-gray-500 font-semibold mb-3">
          Bộ lọc căn hộ
        </p>
        <Select
          showSearch
          style={{
            width: 200,
          }}
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").includes(input)
          }
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "")
              .toUpperCase()
              .localeCompare((optionB?.label ?? "").toUpperCase())
          }
          options={citySelectOption}
          onChange={filterByCity}
        />
        <a
          onClick={resetFilter}
          className="underline mt-5 ml-24 hover:text-orange-400"
        >
          Làm mới bộ lọc
        </a>
      </div>
    </div>
  );
}
