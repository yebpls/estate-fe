import { Select } from "antd";
import React from "react";

export default function OverallFilter() {
  return (
    <div className="flex">
      <div className="m-5 ml-28">
        <Select
          className="m-1.5"
          placeholder="Căn hộ chung cư"
          options={[
            {
              value: "Option 1",
            },
            {
              value: "Option 2",
            },
            {
              value: "Option 3",
            },
            {
              value: "Option 4",
            },
          ]}
        />
        <Select
          className="m-1.5"
          placeholder="Mức giá"
          options={[
            {
              value: "Option 1",
            },
            {
              value: "Option 2",
            },
            {
              value: "Option 3",
            },
            {
              value: "Option 4",
            },
          ]}
        />
        <Select
          className="m-1.5"
          placeholder="Diện tích"
          options={[
            {
              value: "Option 1",
            },
            {
              value: "Option 2",
            },
            {
              value: "Option 3",
            },
            {
              value: "Option 4",
            },
          ]}
        />
        <Select
          className="m-1.5"
          placeholder="Số phòng ngủ"
          options={[
            {
              value: "Option 1",
            },
            {
              value: "Option 2",
            },
            {
              value: "Option 3",
            },
            {
              value: "Option 4",
            },
          ]}
        />
        <Select
          className="m-1.5"
          placeholder="Nội dung tin"
          options={[
            {
              value: "Option 1",
            },
            {
              value: "Option 2",
            },
            {
              value: "Option 3",
            },
            {
              value: "Option 4",
            },
          ]}
        />
      </div>
    </div>
  );
}
