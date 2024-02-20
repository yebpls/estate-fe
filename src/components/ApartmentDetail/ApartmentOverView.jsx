import React from "react";

export default function ApartmentOverView({ apartment }) {
  return (
    <div>
      <p className="text-md font-semibold my-5">
        Đăng ký mua trực tiếp căn hộ thuộc dự án {apartment?.projectName}{" "}
        {apartment?.cityName}{" "}
      </p>
    </div>
  );
}
