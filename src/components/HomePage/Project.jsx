import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllApartment } from "../../store/slices/apartmentSlice";

export default function Project() {
  const { apartments } = useSelector((state) => state.apartmentReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllApartment());
  }, [dispatch]);
  return (
    <div className="">
      <div className="flex flex-col w-full flex-wrap px-40 items-start">
        <div className="pt-5 flex justify-between w-full">
          <div className="flex items-center">
            <div className="font-bold mx-2 text-red-500 text-xl">
              <p>Các dự căn hộ chung cư dành cho bạn</p>
            </div>
          </div>

          <div className="flex items-start font-bold mx-2 pt-2">
            <div className="font-bold mx-2 text-black hover:text-gray-400 text-sm">
              <Link to="">Tin chung cư bán mới nhất</Link>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap w-full">
          {apartments &&
            apartments.map((apartment) => (
              <div className="bg-white w-1/4 px-5 pt-5 mb-5 h-80 hover:bg-slate-100 rounded-md">
                <Link to="" className="w-full">
                  <div className="w-full h-48">
                    <img
                      className="w-full h-full"
                      src={apartment.mainImage}
                      alt="Description of your image"
                    />
                  </div>
                  <div className="mt-3 ml-5">
                    <h6 className="font-bold text-lg">
                      {apartment.apartmentNumber}
                    </h6>
                    <p className="text-red-400 text-lg">
                      {apartment.price}Đ - {apartment.area}m2
                    </p>
                    <p className="text-blue-400 text-lg">
                      Thu Duc, Ho Chi Minh
                    </p>
                  </div>
                </Link>
              </div>
            ))}
        </div>

        {/* <div className="bg-white w-1/4 px-5 pt-5 mb-5 h-80 hover:bg-slate-100 rounded-md">
          <Link to="">
            <div className="w-full h-53">
              <img
                className="w-full h-full"
                src={
                  "https://tse1.mm.bing.net/th?id=OIP.4XB8NF1awQyApnQDDmBmQwHaEo&pid=Api&P=0&h=180"
                }
                alt="Description of your image"
                maxWidth
                maxHeight
              />
            </div>
            <div className="mt-3 ml-5">
              <h6 className="font-bold text-lg">Project Name</h6>
              <p className="text-red-400 text-lg">30.000.000vnd -30m2</p>
              <p className="text-blue-400 text-lg">Thu Duc, Ho Chi Minh</p>
            </div>
          </Link>
        </div>
        <div className="bg-white w-1/4 px-5 pt-5 mb-5 h-80 hover:bg-slate-100 rounded-md">
          <Link to="">
            <div className="w-full h-53">
              <img
                className="w-full h-full"
                src={
                  "https://tse1.mm.bing.net/th?id=OIP.4XB8NF1awQyApnQDDmBmQwHaEo&pid=Api&P=0&h=180"
                }
                alt="Description of your image"
                maxWidth
                maxHeight
              />
            </div>
            <div className="mt-3 ml-5">
              <h6 className="font-bold text-lg">Project Name</h6>
              <p className="text-red-400 text-lg">30.000.000vnd -30m2</p>
              <p className="text-blue-400 text-lg">Thu Duc, Ho Chi Minh</p>
            </div>
          </Link>
        </div>
        <div className="bg-white w-1/4 px-5 pt-5 mb-5 h-80 hover:bg-slate-100 rounded-md">
          <Link to="">
            <div className="w-full h-53">
              <img
                className="w-full h-full"
                src={
                  "https://tse1.mm.bing.net/th?id=OIP.4XB8NF1awQyApnQDDmBmQwHaEo&pid=Api&P=0&h=180"
                }
                alt="Description of your image"
                maxWidth
                maxHeight
              />
            </div>
            <div className="mt-3 ml-5">
              <h6 className="font-bold text-lg">Project Name</h6>
              <p className="text-red-400 text-lg">30.000.000vnd -30m2</p>
              <p className="text-blue-400 text-lg">Thu Duc, Ho Chi Minh</p>
            </div>
          </Link>
        </div>
        <div className="bg-white w-1/4 px-5 pt-5 mb-5 h-80 hover:bg-slate-100 rounded-md">
          <Link to="">
            <div className="w-full h-53">
              <img
                className="w-full h-full"
                src={
                  "https://tse1.mm.bing.net/th?id=OIP.4XB8NF1awQyApnQDDmBmQwHaEo&pid=Api&P=0&h=180"
                }
                alt="Description of your image"
                maxWidth
                maxHeight
              />
            </div>
            <div className="mt-3 ml-5">
              <h6 className="font-bold text-lg">Project Name</h6>
              <p className="text-red-400 text-lg">30.000.000vnd -30m2</p>
              <p className="text-blue-400 text-lg">Thu Duc, Ho Chi Minh</p>
            </div>
          </Link>
        </div>
        <div className="bg-white w-1/4 px-5 pt-5 mb-5 h-80 hover:bg-slate-100 rounded-md">
          <Link to="">
            <div className="w-full h-53">
              <img
                className="w-full h-full"
                src={
                  "https://tse1.mm.bing.net/th?id=OIP.4XB8NF1awQyApnQDDmBmQwHaEo&pid=Api&P=0&h=180"
                }
                alt="Description of your image"
                maxWidth
                maxHeight
              />
            </div>
            <div className="mt-3 ml-5">
              <h6 className="font-bold text-lg">Project Name</h6>
              <p className="text-red-400 text-lg">30.000.000vnd -30m2</p>
              <p className="text-blue-400 text-lg">Thu Duc, Ho Chi Minh</p>
            </div>
          </Link>
        </div>
        <div className="bg-white w-1/4 px-5 pt-5 mb-5 h-80 hover:bg-slate-100 rounded-md">
          <Link to="">
            <div className="w-full h-53">
              <img
                className="w-full h-full"
                src={
                  "https://tse1.mm.bing.net/th?id=OIP.4XB8NF1awQyApnQDDmBmQwHaEo&pid=Api&P=0&h=180"
                }
                alt="Description of your image"
                maxWidth
                maxHeight
              />
            </div>
            <div className="mt-3 ml-5">
              <h6 className="font-bold text-lg">Project Name</h6>
              <p className="text-red-400 text-lg">30.000.000vnd -30m2</p>
              <p className="text-blue-400 text-lg">Thu Duc, Ho Chi Minh</p>
            </div>
          </Link>
        </div>
        <div className="bg-white w-1/4 px-5 pt-5 mb-5 h-80 hover:bg-slate-100 rounded-md">
          <Link to="">
            <div className="w-full h-53">
              <img
                className="w-full h-full"
                src={
                  "https://tse1.mm.bing.net/th?id=OIP.4XB8NF1awQyApnQDDmBmQwHaEo&pid=Api&P=0&h=180"
                }
                alt="Description of your image"
                maxWidth
                maxHeight
              />
            </div>
            <div className="mt-3 ml-5">
              <h6 className="font-bold text-lg">Project Name</h6>
              <p className="text-red-400 text-lg">30.000.000vnd -30m2</p>
              <p className="text-blue-400 text-lg">Thu Duc, Ho Chi Minh</p>
            </div>
          </Link>
        </div> */}
        <button className=" rounded-md border-2 border-black text-lg p-2 px-9 font-semibold ml-auto mr-auto hover:bg-slate-100 ">
          Xem thêm...
        </button>
      </div>
    </div>
  );
}
