import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCustomerId } from "../../store/slices/accountSlice";

function ProjectCard({ apartment }) {
  const { id } = useSelector((state) => state.accountReducer);

  const formattedNumber = apartment.price.toLocaleString("de-DE");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCustomerId(id));
  }, []);
  return (
    <div className="bg-white px-5 pt-5 h-96 hover:bg-slate-100 rounded-md">
      <Link to={`/apartment/${apartment.id}`} className="w-full">
        <div className="w-full h-48">
          <img
            className="w-full h-full"
            src={apartment.mainImage}
            alt="Description of your image"
          />
        </div>
        <div className="mt-3 ml-5">
          <h6 className="font-bold text-lg">
            {apartment.projectName} - Phòng {apartment.apartmentNumber}
          </h6>
          <p className="text-red-400 text-lg">
            {formattedNumber}Đ - {apartment.area}m2
          </p>
          <p className="text-blue-400 text-base">
            {apartment.cityName} - {apartment.projectName}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default ProjectCard;
