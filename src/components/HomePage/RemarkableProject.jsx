import React from "react";
import { Link } from "react-router-dom";

export default function RemarkableProject() {
  return (
    <div>
      <div className="font-bold text-xl mx-2 text-red-500 ml-40">
        <p>Bất động sản nổi bật</p>
      </div>
      <div className="flex flex-wrap mx-40 items-center ">
        <div className="bg-white w-1/4 px-5 pt-5 mb-5 h-96 hover:bg-slate-100 rounded-md">
          <Link to="">
            <div className="w-full h-53">
              <img
                className="w-full h-full"
                src={
                  "https://tse3.mm.bing.net/th?id=OIP.lEs0Vm_tNz3xrYCmT4V0MwHaE6&pid=Api&P=0&h=180"
                }
                alt="Description of your image"
              />
            </div>
            <div className="mt-3 ml-3">
              <h6 className="font-bold text-lg p-1">Project Name</h6>
              <p className="text-red-400 text-lg p-1">Square</p>
              <p className="text-blue-400 text-lg p-1">Thu Duc, Ho Chi Minh</p>
              <p className="bg-green-400 text-gray-100 text-lg max-w-max rounded-md p-1">
                Đang mở bán
              </p>
            </div>
          </Link>
        </div>
        <div className="bg-white w-1/4 px-5 pt-5 mb-5 h-96 hover:bg-slate-100 rounded-md">
          <Link to="">
            <div className="w-full h-53">
              <img
                className="w-full h-full"
                src={
                  "https://tse3.mm.bing.net/th?id=OIP.lEs0Vm_tNz3xrYCmT4V0MwHaE6&pid=Api&P=0&h=180"
                }
                alt="Description of your image"
              />
            </div>
            <div className="mt-3 ml-3">
              <h6 className="font-bold text-lg p-1">Project Name</h6>
              <p className="text-red-400 text-lg p-1">Square</p>
              <p className="text-blue-400 text-lg p-1">Thu Duc, Ho Chi Minh</p>
              <p className="bg-green-400 text-gray-100 text-lg max-w-max rounded-md p-1">
                Đang mở bán
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
