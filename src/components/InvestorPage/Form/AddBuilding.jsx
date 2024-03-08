import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createBuilding } from "../../../store/slices/buildingSlice";
import { Button, Modal } from "antd";
import LoadingComponent from "../../SharedComponent/LoadingComponent";
import { useNavigate } from "react-router-dom";

export default function AddBuilding({ projectId }) {
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const { city } = useSelector((state) => state.buildingReducer);

  const dispatch = useDispatch();

  const formBuilding = useForm();
  const navigate = useNavigate();
  const { register: registerBuilding, handleSubmit: handleSubmitBuilding } =
    formBuilding;

  const onSubmitBuilding = (data) => {
    console.log(data);
    let formBuilding = {
      projectId: projectId,
      buildingName: data.buildingName,
      address: data.address,
      cityId: data.city,
    };
    dispatch(createBuilding(formBuilding));
    setIsModalAddOpen(false);
    // navigate(`/investor/project/${project.id}`);
  };

  const showModal = () => {
    setIsModalAddOpen(true);
  };

  const handleAddCancel = () => {
    setIsModalAddOpen(false);
  };
  return (
    <div>
      <Button
        style={{ backgroundColor: "#4974a5", color: "white" }}
        onClick={showModal}
      >
        Thêm Toà nhà
      </Button>
      <Modal
        title="Toà nhà mới"
        open={isModalAddOpen}
        footer={null}
        onCancel={handleAddCancel}
        className="text-cyan-700"
      >
        <form>
          <div className="m-2">
            <p className="m-2">Tên toà nhà</p>
            <input
              className="w-full p-1"
              placeholder="Tên toà nhà"
              id="buildingName"
              name="buildingName"
              {...registerBuilding("buildingName", { require: true })}
            ></input>
          </div>
          <div className="m-2">
            <p className="m-2">Địa chỉ</p>
            <textarea
              className="w-full p-1"
              {...registerBuilding("address", { require: true })}
              placeholder="Địa chỉ"
              id="address"
              name="address"
            ></textarea>
          </div>
          <div>
            <p className="ml-2">Tỉnh</p>
            <select
              className="border-2 rounded-md m-2 p-1"
              {...registerBuilding("city", { required: true })}
            >
              {city &&
                city.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.cityName}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <button
              className="py-1 px-4 bg-white hover:bg-sky-400 ml-2"
              onClick={handleSubmitBuilding(onSubmitBuilding)}
            >
              Tạo
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
