import {
  Button,
  Col,
  DatePicker,
  Input,
  Modal,
  Row,
  Select,
  Typography,
  message,
} from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import ChangePassword from "../SharedComponent/ChangePassword";
import ChangeAvatar from "../SharedComponent/ChangeAvatar";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

export default function AgencyInfo() {
  const [avatarUrl, setAvatarUrl] = useState(
    "https://tse2.mm.bing.net/th?id=OIP.0HPHOhiMHVdQGlxYc4z86AHaFj&pid=Api&P=0&h=180"
  );
  const [email, setEmail] = useState("thisisemail@gmail.com");
  const [gender, setGender] = useState("Nam");
  const [dob, setDob] = useState("2002-05-01");
  const [address, setAddress] = useState(
    "35 Yersin, Phú Cường, Thủ Dầu Một, Bình Dương"
  );
  const [balance, setBalance] = useState(9325722);
  const [appear, setAppear] = useState(false);

  const { Paragraph, Text, Title } = Typography;

  function changeProfile() {}
  const onChangeDate = (date, dateString) => {
    setDob(dateString);
    console.log(dob);
  };
  const handleChangeGender = (value) => {
    setGender(value);
    console.log("gender: ", gender);
  };
  const hideAndOut = () => {
    if (appear) {
      setAppear(false);
    } else {
      setAppear(true);
    }
  };
  return (
    <div>
      <Title level={3} className="text-center mt-5">
        Thông Tin Của Bạn
      </Title>
      <Row className="ml-12 w-full">
        <Col span={7} className="m-9">
          <ChangeAvatar avatar={avatarUrl} />
        </Col>
        <Col span={9} className="ml-16 mt-16">
          <div className="profile-form">
            <Text type="secondary">Email</Text>
            <Paragraph
              editable={{
                onChange: setEmail,
              }}
              style={{ marginTop: "3px", fontSize: "16px" }}
            >
              {email}
            </Paragraph>
            <Text type="secondary">Địa chỉ</Text>
            <Paragraph
              editable={{
                onChange: setAddress,
              }}
              style={{ marginTop: "3px", fontSize: "16px" }}
            >
              {address}
            </Paragraph>
            <Text type="secondary">Giới tính</Text>
            <br />
            <Select
              value={gender}
              style={{
                width: 100,
                margin: "10px",
                fontSize: "16px",
              }}
              onChange={handleChangeGender}
              options={[
                {
                  value: "Male",
                  label: "Nam",
                },
                {
                  value: "Female",
                  label: "Nữ",
                },
                {
                  value: "Other",
                  label: "Khác",
                },
              ]}
            />
            <br />
            <Text type="secondary">Birthday</Text> <br />
            <DatePicker
              style={{ margin: "10px", fontSize: "16px" }}
              value={dayjs(dob)}
              onChange={onChangeDate}
            />{" "}
            <br />
            <ChangePassword />
            <br />
            <Button
              style={{ marginTop: "5%", backgroundColor: "#1ac5ff" }}
              type="primary"
              onClick={changeProfile}
            >
              Lưu lại thông tin
            </Button>
          </div>
        </Col>
        <Col span={4} className="">
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
                  className="hover:bg-slate-200 rounded-xl h-3 text-xl"
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
                  className="hover:bg-slate-200 rounded-xl h-3 text-xl"
                  onClick={hideAndOut}
                />
              </div>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
}
