import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApartmentByCity } from "../../../../store/slices/apartmentSlice";
import { Select } from "antd";
import { getAllCity } from "../../../../store/slices/buildingSlice";

export default function ByCityName() {
  const { city } = useSelector((state) => state.buildingReducer);
  const dispatch = useDispatch();

  const filterByCity = (value) => {
    console.log(`selected ${value}`);
    dispatch(getApartmentByCity(value));
  };
  const citySelectOption = city?.map((city) => {
    return { value: city?.cityName, label: city?.cityName };
  });
  useEffect(() => {
    dispatch(getAllCity());
  }, []);
  return (
    <div>
      <p className="text-sm text-slate-500 py-2">Vị trí</p>
      <Select
        className="w-44"
        showSearch
        optionFilterProp="children"
        filterOption={(input, option) => (option?.label ?? "").includes(input)}
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? "")
            .toUpperCase()
            .localeCompare((optionB?.label ?? "").toUpperCase())
        }
        placeholder="Chọn khu vực"
        options={citySelectOption}
        onChange={filterByCity}
      />
    </div>
  );
}
