import { Col, Row } from "antd";
import React from "react";
import BuildingCard from "./BuildingCard";

export default function BuildingOfInvestor() {
  return (
    <div className="mx-10 mt-10">
      <Row gutter={16}>
        <Col span={6}>
          <BuildingCard />
        </Col>
        <Col span={6}>
          <BuildingCard />
        </Col>
        <Col span={6}>
          <BuildingCard />
        </Col>
        <Col span={6}>
          <BuildingCard />
        </Col>
        <Col span={6}>
          <BuildingCard />
        </Col>
      </Row>
    </div>
  );
}
