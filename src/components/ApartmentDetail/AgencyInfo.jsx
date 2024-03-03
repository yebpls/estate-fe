import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function AgencyInfo({ agency }) {
    const { city } = useSelector((state) => state.buildingReducer);

    const cityName = city.find((city) => city.id === agency?.cityId);
    console.log(cityName);
    return (
        <div className="w-60 h-80 m-5 grid text-center bg-gray-100 rounded-md">
            <div className="p-3 w-28 h-28 mx-auto">
                <img
                    className="mx-auto w-full h-full rounded-full"
                    src={agency?.avatarUrl}
                    alt="Description of your image"
                />
            </div>
            <p className="font-semibold text-sm p-1">Được đăng bởi</p>
            <p className="text-lg text-red-500 font-medium">{agency?.name}</p>
            <p className="text-gray-500">Đến từ: {cityName?.cityName}</p>
            <Link to="" className=" px-2 text-gray-500">
                {agency?.email}
            </Link>

            <button className="w-2/3 mx-auto m-2 bg-orange-500 text-white text-sm font-semibold border-none hover:bg-orange-200 hover:text-orange-400">
                Tạo cuộc hẹn xem nhà
            </button>
        </div>
    );
}
