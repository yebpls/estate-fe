import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchApartmentByProjectName } from "../../store/slices/apartmentSlice";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const dispatch = useDispatch();
  const searchByProjectName = () => {
    console.log("haha");
  };

  const form = useForm();
  const { register, handleSubmit } = form;
  const onSubmit = (data) => {
    dispatch(searchApartmentByProjectName(data.value));
    console.log(data);
  };
  return (
    <div>
      <div className="absolute right-7">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("value")}
            placeholder="Search a project by name"
            className="px-3 p-1 text-sm text-orange-300 w-60 placeholder-gray_3 focus:outline-none focus:border-orange-300  focus:ring-0 ring-gray-400 rounded-e-none"
          />
          <button
            // onClick={searchByProjectName}
            type="submit"
            className="px-3 p-1 text-sm bg-white border-orange-300 hover:bg-orange-300  text-orange-300 hover:text-white hover:border-transparent rounded-s-none"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
}
