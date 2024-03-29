import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React from "react";

export default function LoadingComponent({ loadingDependency, message }) {
  return (
    <div>
      {loadingDependency ? (
        <div className="flex fixed right-0 top-0 mt-24 mr-16 p-1 px-6 rounded-md ">
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
          {message ? (
            <p className="ml-2 mt-2 text-blue-400 text-md font-thin">
              {message}
            </p>
          ) : (
            <p className="ml-2 mt-2 text-blue-400 text-md font-thin">
              Đang lấy dữ liệu
            </p>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
