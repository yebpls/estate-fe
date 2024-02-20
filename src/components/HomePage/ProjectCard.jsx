import React from "react";
import { Link } from "react-router-dom";

function ProjectCard({ apartment }) {
  const formattedNumber = apartment.price.toLocaleString("de-DE");
  console.log(formattedNumber);

  return (
    <div className="bg-white w-1/4 px-5 pt-5 mb-5 h-80 hover:bg-slate-100 rounded-md">
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
            {apartment.projectName} - {apartment.apartmentNumber}
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
