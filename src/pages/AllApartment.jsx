import { Button, Col, Pagination, Row, Space, Spin } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProjectCard from "../components/HomePage/ProjectCard";
import {
  getAllApartment,
  getViewApartment,
} from "../store/slices/apartmentSlice";
import LoadingComponent from "../components/SharedComponent/LoadingComponent";
import { LoadingOutlined } from "@ant-design/icons";
import FilterApartments from "../components/SharedComponent/Filter/FilterApartments";
import SearchBar from "../components/SharedComponent/SearchBar";

export default function AllApartment() {
  const [currentPage, setCurrentPage] = useState(1);

  const { viewApartment, isLoading } = useSelector(
    (state) => state.apartmentReducer
  );

  const dispatch = useDispatch();
  // MAKE A PAGING
  // Calculate the start and end index for the current page
  // debugger;
  const startIndex = (currentPage - 1) * 12;
  const endIndex = startIndex + 12;
  // Slice the data array to show only the items for the current page
  const currentApartments = viewApartment?.slice(startIndex, endIndex);
  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" }); //Make page scroll to the top
  };
  useEffect(() => {
    dispatch(getAllApartment());
    dispatch(getViewApartment());
    window.scrollTo(0, 0); //Make page scroll to the top
  }, [dispatch]);
  return (
    <div className="min-h-screen px-5">
      <p className="w-full text-center my-7 font-semibold text-blue-400 text-2xl">
        Các dự án đang mở bán
      </p>
      <SearchBar />
      <Row gutter={16} className="mt-20 ">
        <Col className="gutter-row" span={4}>
          <FilterApartments />
        </Col>
        <Col className="gutter-row" span={19}>
          <Row gutter={16}>
            {isLoading ? (
              <div className="m-44 ml-96 flex">
                <Spin
                  indicator={
                    <LoadingOutlined
                      style={{
                        fontSize: 39,
                      }}
                      spin
                    />
                  }
                />
                <p className="m-4 font-semibold text-xl text-blue-300">
                  Đang lấy danh sách căn hộ
                </p>
              </div>
            ) : (
              currentApartments &&
              currentApartments.map((apartment) => (
                <Col className="gutter-row w-full" span={6}>
                  <ProjectCard key={apartment.id} apartment={apartment} />
                </Col>
              ))
            )}
          </Row>
          <Pagination
            className="mt-12 mb-7 ml-96"
            current={currentPage}
            total={viewApartment?.length}
            pageSize={12}
            onChange={handlePageChange}
          />
        </Col>
      </Row>
    </div>
  );
}
