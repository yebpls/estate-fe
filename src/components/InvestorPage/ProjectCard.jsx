import { Card, Col, Row } from "antd";
import React from "react";
import { Link } from "react-router-dom";

export default function ProjectCard() {
  return (
    <div>
      <Link to="/investor_building" className="w-full">
        <Card
          title="Project Name"
          className="hover:bg-blue-200 bg-blue-100 m-2"
        >
          <p>From 19/02/2024</p>
          <p>To 24/02/2024</p>
        </Card>
      </Link>
    </div>
  );
}
