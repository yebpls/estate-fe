import React from "react";
import { Link } from "react-router-dom";

export default function ViewProject() {
  return (
    <div className="m-5 w-2/3">
      {/* title */}
      <div className="">
        <p>Bán / Căn hộ chung cư trên toàn quốc</p>
      </div>
      {/* content */}
      <div>
        <div className="flex h-60">
          <div className="w-1/2 pl-14 -pb-1 mt-1">
            <img
              className="w-full h-full"
              src={
                "https://tse1.mm.bing.net/th?id=OIP.4XB8NF1awQyApnQDDmBmQwHaEo&pid=Api&P=0&h=180"
              }
              alt="Description of your image"
            />
          </div>
          <div className="w-1/4 flex flex-col">
            <div className="h-1/2 p-1">
              <img
                className="w-full h-full"
                src={
                  "https://tse1.mm.bing.net/th?id=OIP.4XB8NF1awQyApnQDDmBmQwHaEo&pid=Api&P=0&h=180"
                }
                alt="Description of your image"
              />
            </div>
            <div className="h-1/2 p-1">
              <img
                className="w-full h-full"
                src={
                  "https://tse1.mm.bing.net/th?id=OIP.4XB8NF1awQyApnQDDmBmQwHaEo&pid=Api&P=0&h=180"
                }
                alt="Description of your image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
