import { Card } from "antd";
import React from "react";
import { Link } from "react-router-dom";

export default function BuildingCard() {
  return (
    <div>
      <Link to="/investor_apartment" className="w-full">
        <Card
          className="hover:bg-blue-200 hover:shadow-md bg-blue-100 m-2"
          cover={
            <img
              className="h-40 p-2"
              alt="building image"
              src="https://wtcbinhduong.vn/wp-content/uploads/2022/12/WTC-Tower-3-scaled.jpg"
            />
          }
        >
          <Card.Meta
            title="WTC tower"
            description="23 Mai Thị Lựu Street, Thu Dau Mot City, Binh Duong"
          />
        </Card>
      </Link>
    </div>
  );
}
