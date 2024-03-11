import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ApartmentOverView({ apartment }) {
  const formattedNumber = apartment?.price / 1000000000;

  return (
    <div>
      <p className="text-xl font-semibold text-center -mt-5 text-red-500">
        Đăng ký mua trực tiếp căn hộ thuộc dự án {apartment?.projectName} tại{" "}
        {apartment?.cityName}
      </p>
    </div>
  );
}
