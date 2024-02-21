import { Button, Input, Modal, message } from "antd";
import React, { useState } from "react";

export default function ChangePassword() {
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  //Show modal for edit password
  const openModalChangePassword = () => {
    setOpen(true);
  };
  const changePassword = () => {
    if (password === checkPassword && !password === "") {
      successNofi("Cập nhật mật khẩu thành công");
      setTimeout(() => {
        setLoading(false);
        setOpen(false);
      }, 1000);
    } else {
      failNofi("Mật khẩu và mật khẩu xác nhận phải trùng nhau");
    }
  };
  const cancelChangePassword = () => {
    setOpen(false);
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
  const failNofi = (message) => {
    messageApi.open({
      type: "error",
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
      <a
        style={{ marginTop: "3px", fontSize: "16px" }}
        onClick={openModalChangePassword}
      >
        Đổi mật khẩu
      </a>
      <Modal
        open={open}
        title="Đổi mật khẩu"
        onOk={changePassword}
        onCancel={cancelChangePassword}
        footer={[
          <Button key="back" onClick={cancelChangePassword}>
            Hủy
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={changePassword}
            style={{ backgroundColor: "red" }}
          >
            Đổi mật khẩu
          </Button>,
        ]}
      >
        <p className="m-2">Nhập mật khẩu</p>
        <Input.Password
          placeholder="password đã được che"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></Input.Password>
        <p className="m-2">Xác nhận mật khẩu</p>
        <Input.Password
          placeholder="password đã được che"
          onChange={(e) => {
            setCheckPassword(e.target.value);
          }}
        ></Input.Password>
        <p className="m-2">Mật khẩu mới</p>
        <Input.Password
          placeholder="password đã được che"
          onChange={(e) => {
            setNewPassword(e.target.value);
          }}
        ></Input.Password>
      </Modal>
    </div>
  );
}
