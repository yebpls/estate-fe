import { Card } from "antd";
import React from "react";
import { Link } from "react-router-dom";

export default function ApartmentCard() {
  return (
    <div>
      <Link to="/apartment" className="w-full">
        <Card
          className="hover:bg-blue-200 hover:shadow-md bg-blue-50 m-2"
          cover={
            <img
              className="h-40 p-2"
              alt="building image"
              src="https://www.souciehorner.com/wp-content/uploads/2017/04/Kitchen3-1536.jpg"
            />
          }
        >
          <Card.Meta title="S680" description="500$" />
        </Card>
      </Link>
    </div>
  );
}
