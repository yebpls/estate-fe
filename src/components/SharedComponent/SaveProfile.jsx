import { Button, Modal, message } from "antd";
import React, { useState } from "react";

export default function SaveProfile() {
  const [open, setOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);

  const confirmChangeProfile = () => {
    setOpen(true);
  };
  const cancelChangeProfile = () => {
    setOpen(false);
  };
  const changeProfile = () => {
    successNofi("Lưu thông tin cá nhân thành công");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 1000);
  };
  //nofication for action
  const successNofi = (message) => {
    messageApi.open({
      type: "success",
      content: message,
      style: {
        marginLeft: "80%",
        marginTop: "5%",
      },
    });
  };
  return (
    <div>
      {contextHolder}
      <Button
        style={{ marginTop: "5%", backgroundColor: "#1ac5ff" }}
        type="primary"
        onClick={confirmChangeProfile}
      >
        Lưu lại thông tin
      </Button>
      <Modal
        className="mt-32"
        open={open}
        title="Bạn có muốn sao lưu tất cả thông tin không?"
        onOk={changeProfile}
        onCancel={cancelChangeProfile}
        footer={[
          <Button key="back" onClick={cancelChangeProfile}>
            Hủy
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={changeProfile}
            style={{ backgroundColor: "#1ac5ff" }}
          >
            Lưu
          </Button>,
        ]}
      ></Modal>
    </div>
  );
}
