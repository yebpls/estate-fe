import React from "react";
import { Link } from "react-router-dom";

function News() {
  return (
    <div className="ml-24">
      <div className="px-16 pt-5 flex justify-between w-full">
        <div className="flex items-center">
          <div className="font-bold mx-2 text-red-500 hover:text-red-400">
            <Link to="">Tin nổi bật</Link>
          </div>
          <div className="font-bold mx-2 text-red-500 hover:text-red-400">
            <Link to="">Tin tức</Link>
          </div>
          <div className="font-bold mx-2 text-red-500 hover:text-red-400">
            <Link to="">BĐS TP.HCM</Link>
          </div>
          <div className="font-bold mx-2 text-red-500 hover:text-red-400">
            <Link to="">BĐS Hà Nội</Link>
          </div>
        </div>
        <div className="flex items-start font-bold pr-16 mx-2 text-red-500 hover:text-red-400 pl-96 underline">
          <Link to="">Xem thêm</Link>
        </div>
      </div>
      <div className="flex-grow p-4 flex gap-2 ml-10">
        {/* Column 1 */}
        <div className="bg-white p-4 flex-initial w-1/2 hover:bg-slate-100 rounded-lg">
          <Link to="">
            <div className="h-96 text-lg font-bold">
              <img
                className="w-max h-max"
                src={
                  "http://vietcetera.com/wp-content/uploads/2016/09/BDS-.jpg"
                }
                alt="Description of your image"
              />
              <p className="mt-2">
                Nhộn nhịp giao bán bất động sản sau Luật kinh doanh bất động sản
                và Luật Nhà ở mới
              </p>
            </div>
          </Link>
        </div>

        {/* Column 2 */}
        <div className=" flex-initial w-1/4 relative ">
          <Link to="">
            <div className="bg-white pt-4 p-2 h-1/2 w-72 text-xs font-bold hover:bg-slate-100 rounded-lg">
              <img
                className="w-max h-max"
                src={
                  "http://vietcetera.com/wp-content/uploads/2016/09/BDS-.jpg"
                }
                alt="Description of your image"
              />
              <p className="mt-2">
                Những yếu tố tác động tích cưc đến lĩnh vực bất động sản năm
                2024
              </p>
            </div>
          </Link>

          <Link to="">
            <div className="bg-white p-2 pt-4 h-1/2 w-72 text-xs font-bold  hover:bg-slate-100 rounded-lg">
              <img
                className="w-max h-max"
                src={
                  "http://vietcetera.com/wp-content/uploads/2016/09/BDS-.jpg"
                }
                alt="Description of your image"
              />
              <p className="mt-2">
                Những yếu tố tác động tích cưc đến lĩnh vực bất động sản năm
                2024
              </p>
            </div>
          </Link>
        </div>
        <div className="bg-white -ml-10 pt-4 flex-initial w-60  hover:bg-slate-100 rounded-lg">
          <div>
            <Link to="">
              <img
                className="w-max h-max"
                src={
                  "https://tse1.mm.bing.net/th?id=OIP.T5tn3xoL7SDMTLPHblDemAHaLH&pid=Api&P=0"
                }
                alt="Description of your image"
              />
              <p>Ads</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default News;
