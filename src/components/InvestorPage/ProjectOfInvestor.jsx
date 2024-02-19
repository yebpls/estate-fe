import React from "react";
import ProjectCard from "./ProjectCard";
import { Card, Col, Row } from "antd";

export default function ProjectOfInvestor() {
  function openListBuilding() {}
  return (
    <div className="mx-10 mt-10">
      <Row gutter={16}>
        <Col span={6}>
          <ProjectCard />
        </Col>
        <Col span={6}>
          <ProjectCard />
        </Col>
        <Col span={6}>
          <ProjectCard />
        </Col>
        <Col span={6}>
          <ProjectCard />
        </Col>
        <Col span={6}>
          <ProjectCard />
        </Col>
      </Row>
    </div>
  );
}
