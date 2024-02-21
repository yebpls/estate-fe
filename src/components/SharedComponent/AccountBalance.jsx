import React, { useState } from "react";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Typography } from "antd";

export default function AccountBalance() {
  const [balance, setBalance] = useState(9325722);
  const [appear, setAppear] = useState(false);
  const { Paragraph, Text } = Typography;
  const hideAndOut = () => {
    if (appear) {
      setAppear(false);
    } else {
      setAppear(true);
    }
  };
  return (
    <div>
      {" "}
      <Text type="secondary" className="text-xl">
        Số dư
      </Text>
      {appear ? (
        <div className="flex">
          <Paragraph className="text-xl text-red-500 font-semibold">
            {balance} đ
          </Paragraph>
          <div className="pl-2 pt-2">
            <EyeOutlined
              className="hover:bg-slate-100 rounded-xl h-3 text-xl"
              onClick={hideAndOut}
            />
          </div>
        </div>
      ) : (
        <div className="flex">
          <Paragraph className="text-xl text-red-500 font-semibold">
            ***********
          </Paragraph>
          <div className="pl-2 pt-2">
            <EyeInvisibleOutlined
              className="hover:bg-slate-100 rounded-xl h-3 text-xl"
              onClick={hideAndOut}
            />
          </div>
        </div>
      )}
    </div>
  );
}
