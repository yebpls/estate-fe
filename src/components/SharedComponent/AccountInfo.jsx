import { Col, Modal, Row, Typography } from "antd";
import React, { useEffect, useState } from "react";
import ChangePassword from "../SharedComponent/ChangePassword";
import AccountBalance from "./AccountBalance";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { createPayment } from "../../store/slices/paymentSlice";
import UpdateAccount from "./UpdateAccount";

export default function AccountInfo() {
  const { currentUser, balance, role } = useSelector(
    (state) => state.accountReducer
  );
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const birthdayDate = new Date(currentUser?.dob).toISOString().split("T")[0];
  const { Paragraph, Text, Title } = Typography;
  const dispatch = useDispatch();

  const form = useForm();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = form;

  const isNumber = (value) => {
    return (!isNaN(value) && !isNaN(parseFloat(value))) || "Phải là số";
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    reset();
    setIsModalOpen(false);
  };

  const onSubmit = (data) => {
    console.log(data.amount);
    const amount = parseFloat(data.amount);
    dispatch(createPayment(amount));
    handleCancel();
  };

  return (
    <div className="w-full">
      <Title level={3} className="text-center mt-5">
        Thông Tin Của Bạn
      </Title>
      <Row className="ml-12 w-full">
        <Col span={7} className="m-9">
          <img src={currentUser?.avatarUrl} style={{ width: "400px" }} />
        </Col>
        <Col span={9} className="ml-16 mt-16">
          <div className="profile-form">
            <Text type="secondary">Email</Text>
            <Paragraph style={{ marginTop: "3px", fontSize: "16px" }}>
              {currentUser?.email}
            </Paragraph>
            <Text type="secondary">Tên</Text>
            <Paragraph style={{ marginTop: "3px", fontSize: "16px" }}>
              {currentUser?.name}
            </Paragraph>
            <Text type="secondary">Giới tính</Text>
            <br />
            <Paragraph style={{ marginTop: "3px", fontSize: "16px" }}>
              {currentUser?.gender === 1
                ? "Nam"
                : currentUser?.gender === 2
                ? "Nữ"
                : "Khác"}
            </Paragraph>
            <Text type="secondary">Ngày Sinh</Text> <br />
            <Paragraph style={{ marginTop: "3px", fontSize: "16px" }}>
              {birthdayDate}
            </Paragraph>
            <br />
            <ChangePassword />
            <br />
            {/* <SaveProfile /> */}
            <UpdateAccount account={currentUser} />
          </div>
        </Col>
        {role === "CUSTOMER" ? (
          ""
        ) : (
          <Col span={4} className="">
            <AccountBalance />
            <button
              className="mx-auto px-2 py-1 text-sky-400 border-sky-400 bg-transparent hover:bg-sky-400 hover:text-white"
              onClick={showModal}
            >
              Nạp tiền
            </button>
            <Modal
              okButtonProps={{ style: { backgroundColor: "red" } }}
              title="Nạp tiền"
              open={isModalOpen}
              onCancel={handleCancel}
              footer={null}
              className="text-cyan-700 mt-40"
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="">Số tiền muốn nạp: </label>
                <input
                  className={` px-2 py-1 w-full ${
                    errors.amount && "border-red-500"
                  }`}
                  placeholder="1.000.000VNĐ"
                  {...register("amount", {
                    required: true,
                    validate: isNumber,
                  })}
                  id="amount"
                  name="amount"
                />

                <button className="mt-3 px-2 py-1" type="submit">
                  Nạp
                </button>
              </form>
            </Modal>
          </Col>
        )}
      </Row>
    </div>
  );
}
