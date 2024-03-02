import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getApartmentByCity,
  getApartmentBySquare,
} from "../../../../store/slices/apartmentSlice";
import { Select, Slider } from "antd";
import { getAllCity } from "../../../../store/slices/buildingSlice";

export default function BySquare() {
  const dispatch = useDispatch();
  const [minSquare, setMinSquare] = useState(0);
  const [maxSquare, setMaxSquare] = useState(100);

  const filterMinSquare = (newValue) => {
    setMinSquare(newValue);
    console.log(newValue);
    dispatch(
      getApartmentBySquare({
        min: newValue ? newValue : minSquare,
        max: maxSquare,
      })
    );
  };
  const filterMaxSquare = (newValue) => {
    setMaxSquare(newValue);
    console.log(newValue);
    dispatch(
      getApartmentBySquare({
        min: minSquare,
        max: newValue ? newValue : maxSquare,
      })
    );
  };
  useEffect(() => {
    dispatch(getAllCity());
  }, []);
  return (
    <div>
      <p className="text-sm text-slate-500 pt-2">
        Diện tích tối thiểu: {minSquare} m2
      </p>
      <Slider
        min={0}
        max={50}
        onChange={filterMinSquare}
        value={typeof minSquare === "number" ? minSquare : 0}
      />
      <p className="text-sm text-slate-500">Diện tích tối đa:{maxSquare} m2</p>
      <Slider
        min={50}
        max={100}
        onChange={filterMaxSquare}
        value={typeof maxSquare === "number" ? maxSquare : 100}
      />
    </div>
  );
}
