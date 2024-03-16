import React, { useEffect } from "react";
import storageService from "../config/storageService";
import News from "../components/HomePage/News";
import Project from "../components/HomePage/Project";
import RemarkableProject from "../components/HomePage/RemarkableProject";
import ProjectByLocation from "../components/HomePage/ProjectByLocation";
import { useDispatch, useSelector } from "react-redux";
import { getAllCity } from "../store/slices/buildingSlice";
import { getCustomerId } from "../store/slices/accountSlice";

function HomePage() {
  const { role, id } = useSelector((state) => state.accountReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCity());
  }, []);
  useEffect(() => {
    if (role === "CUSTOMER") dispatch(getCustomerId(id));
  }, [id]);
  return (
    <div className="mt-30">
      {/* <News /> */}
      <Project />
      {/* <ProjectByLocation /> */}
    </div>
  );
}

export default HomePage;
