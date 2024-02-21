import { Button, Input, Modal, message } from "antd";
import React, { useState } from "react";

export default function ChangeAvatar({ avatar }) {
  const [avatarChange, setAvatarChange] = useState();
  const [openEditAvatar, setOpenEditAvatar] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);

  //Show modal for edit avatar
  const showEditAvatarModal = () => {
    setOpenEditAvatar(true);
  };
  const editAvatar = () => {
    successNofi("Chỉnh sửa avatar thành công");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenEditAvatar(false);
    }, 1000);
  };
  const cancelEditAvatar = () => {
    setOpenEditAvatar(false);
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
      <img src={avatar} style={{ width: "400px" }} />
      <Button
        onClick={showEditAvatarModal}
        className="mt-1 relative text-right"
      >
        Sửa avatar
      </Button>
      <Modal
        open={openEditAvatar}
        title="Đổi Avatar"
        onOk={editAvatar}
        onCancel={cancelEditAvatar}
        footer={[
          <Button key="back" onClick={cancelEditAvatar}>
            Hủy
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={editAvatar}
            style={{ backgroundColor: "#1ac5ff" }}
          >
            Đổi
          </Button>,
        ]}
      >
        <p className="m-2">Link hình ảnh mới</p>
        <Input
          placeholder="Dùng link hình ảnh"
          onChange={(e) => {
            setAvatarChange(e.target.value);
          }}
        />
      </Modal>
    </div>
  );
}
