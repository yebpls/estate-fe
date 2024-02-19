import React from "react";
import ApartmentCard from "./ApartmentCard";
import { Col, Row } from "antd";

export default function ApartmentOfInvestor() {
  return (
    <div className="mx-10 mt-10">
      <Row gutter={16}>
        <Col span={6}>
          <ApartmentCard />
        </Col>
        <Col span={6}>
          <ApartmentCard />
        </Col>
        <Col span={6}>
          <ApartmentCard />
        </Col>
        <Col span={6}>
          <ApartmentCard />
        </Col>
        <Col span={6}>
          <ApartmentCard />
        </Col>
      </Row>
    </div>
  );
}
