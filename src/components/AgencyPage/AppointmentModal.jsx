import { Button, Modal } from "antd";
import React, { useEffect, useState } from "react";

export default function AppointmentModal({
  openModal,
  handleCancel,
  getAppointment,
  isModalOpen,
  children,
}) {
  return (
    <div>
      <div onClick={openModal}>{children}</div>
      <Modal
        title="Danh sách các cuộc hẹn"
        open={isModalOpen}
        onOk={getAppointment}
        onCancel={handleCancel}
        footer={null}
      >
        <div></div>
      </Modal>
    </div>
  );
}
