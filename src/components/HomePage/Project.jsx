import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllApartment,
  getAllCanBuy,
} from "../../store/slices/apartmentSlice";
import ProjectCard from "./ProjectCard";
import { Col, Row, Spin } from "antd";

export default function Project() {
  const { apartmentsCanBuy, apartments, isLoading } = useSelector(
    (state) => state.apartmentReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCanBuy());
  }, [dispatch]);
  return (
    <div className="">
      <div className="flex flex-col w-full flex-wrap px-40 items-start">
        <div className="pt-5 flex justify-between w-full">
          <div className="flex items-center">
            <div className="font-bold mx-2 text-red-500 text-xl">
              <p>Các căn hộ chung cư dành cho bạn</p>
            </div>
          </div>

          <div className="flex items-start font-bold mx-2 pt-2">
            <div className="font-bold mx-2 text-black hover:text-gray-400 text-sm">
              <Link to="">Tin chung cư bán mới nhất</Link>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap w-full">
          {isLoading && (
            <div className="flex justify-center mx-auto items-center h-[200px]">
              <Spin size="large" />
            </div>
          )}
          <Row gutter={16}>
            {apartmentsCanBuy &&
              apartmentsCanBuy.map((apartment) => (
                <Col className="gutter-row w-full" span={6}>
                  <ProjectCard key={apartment.id} apartment={apartment} />
                </Col>
              ))}
          </Row>
          {/* {apartmentsCanBuy &&
            apartmentsCanBuy.map((apartment) => (
              <ProjectCard key={apartment.id} apartment={apartment} />
            ))} */}
        </div>
        <Link to="/apartments" className="ml-auto mr-auto">
          <button className=" rounded-md border-2 border-black text-l mt-4 p-2 px-9 font-semibold hover:bg-slate-100 ">
            Xem thêm...
          </button>
        </Link>
      </div>
    </div>
  );
}
