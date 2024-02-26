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
import React, { useEffect, useState } from "react";
import ChangePassword from "../SharedComponent/ChangePassword";
import ChangeAvatar from "../SharedComponent/ChangeAvatar";
import AccountBalance from "./AccountBalance";
import SaveProfile from "./SaveProfile";
import { useSelector } from "react-redux";

export default function AccountInfo() {
  const { currentUser } = useSelector((state) => state.accountReducer);

  const [avatarUrl, setAvatarUrl] = useState(
    "https://tse2.mm.bing.net/th?id=OIP.0HPHOhiMHVdQGlxYc4z86AHaFj&pid=Api&P=0&h=180"
  );
  const [email, setEmail] = useState("thisisemail@gmail.com");
  const [gender, setGender] = useState("Nam");
  const [dob, setDob] = useState("2002-05-01");
  const [address, setAddress] = useState(
    "35 Yersin, Phú Cường, Thủ Dầu Một, Bình Dương"
  );

  const [loading, setLoading] = useState(false);

  const { Paragraph, Text, Title } = Typography;

  const onChangeDate = (date, dateString) => {
    setDob(dateString);
    console.log(dob);
  };
  const handleChangeGender = (value) => {
    setGender(value);
    console.log("gender: ", gender);
  };

  useEffect(() => {
    setAvatarUrl(currentUser?.avatarUrl);
    setEmail(currentUser?.email);
  }, [currentUser]);

  return (
    <div className="w-full">
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
              {currentUser.email}
            </Paragraph>
            <Text type="secondary">Tên</Text>
            <Paragraph
              editable={{
                onChange: setAddress,
              }}
              style={{ marginTop: "3px", fontSize: "16px" }}
            >
              {currentUser.name}
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
            <SaveProfile />
          </div>
        </Col>
        <Col span={4} className="">
          <AccountBalance balance={currentUser.balance} />
        </Col>
      </Row>
    </div>
  );
}
