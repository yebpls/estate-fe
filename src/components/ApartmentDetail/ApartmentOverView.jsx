import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ApartmentOverView({ apartment }) {
  const formattedNumber = apartment?.price / 1000000000;

  return (
    <div>
      <p className="text-md font-semibold my-5">
        Đăng ký mua trực tiếp căn hộ thuộc dự án {apartment?.projectName}{" "}
        {apartment?.cityName}{" "}
      </p>
    </div>
  );
}
