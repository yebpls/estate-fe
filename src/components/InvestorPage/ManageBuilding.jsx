import React, { useEffect, useState } from "react";
import AddBuilding from "./Form/AddBuilding";
import { Button, Modal, Popconfirm, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteBuilding } from "../../store/slices/buildingSlice";
import { toast } from "react-toastify";
import LoadingComponent from "../SharedComponent/LoadingComponent";
import { LoadingOutlined } from "@ant-design/icons";

export default function ManageBuilding({ buildings, projectId }) {
  const [displayBuilding, setDisplayBuilding] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { city, loadingChange } = useSelector((state) => state.buildingReducer);

  const dispatch = useDispatch();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const cancelDelete = () => {
    toast.error("Xóa dự án thất bại");
  };
  const handleDeleteBuilding = (id) => {
    dispatch(deleteBuilding(id));
  };
  useEffect(() => {
    const buildingShow = buildings?.map((building) => {
      const matchingBuilding = city?.find(
        (city) => city.id === building.cityId
      );
      if (matchingBuilding) {
        return {
          ...building,
          cityName: matchingBuilding?.cityName,
        };
      }
      return building;
    });
    setDisplayBuilding(buildingShow);
    console.log(buildingShow);
  }, [projectId, buildings]);
  return (
    <div>
      <Button onClick={showModal}>Quản lý các tòa nhà</Button>
      <Modal
        title="Danh sách các tòa nhà"
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
        width={888}
        className="text-cyan-700"
      >
        <div className="flex">
          <AddBuilding projectId={projectId} />
          {loadingChange ? (
            <div className="absolute right-7">
              <Spin
                indicator={
                  <LoadingOutlined
                    style={{
                      fontSize: 27,
                    }}
                    spin
                  />
                }
              />
              <p> Đang tải lại</p>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="flex mt-4 mb-2">
          <p className="w-1/5 text-base text-slate-500">Tên tòa nhà</p>
          <p className="w-4/5 text-base text-slate-500">Địa chỉ tòa nhà</p>
          <p className="w-1/4 text-base text-slate-500">Tỉnh/Thành phố</p>
          <p className="w-1/4 text-base text-slate-500">Hành động</p>
        </div>
        {displayBuilding?.map((building) => (
          <div className="flex">
            <p className="w-1/5 pl-4 text-slate-700">{building.buildingName}</p>
            <p className="w-4/5">{building.address}</p>
            <p className="w-1/4">{building.cityName}</p>
            <div className="flex w-1/4">
              <button className="bg-blue-400 mb-1 p-0.5 mx-1 w-12 text-white">
                Sửa
              </button>
              <Popconfirm
                placement="right"
                title="Nhắc nhở"
                description="Bạn có muốn xóa tòa nhà này không?"
                onConfirm={() => handleDeleteBuilding(building.id)}
                okButtonProps={{
                  style: { backgroundColor: "red " },
                }}
                onCancel={cancelDelete}
                cancelButtonProps={{
                  style: {
                    color: "red ",
                  },
                }}
                okText="Xóa"
                cancelText="Không"
              >
                <button className="bg-red-500 mb-1 mx-1 w-12 text-white">
                  Xóa
                </button>
              </Popconfirm>
            </div>
          </div>
        ))}
      </Modal>
    </div>
  );
}
