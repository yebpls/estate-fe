import React from "react";

export default function OverallFilter() {
  return (
    <div className="flex">
      <div className="m-5 ml-28">
        <select class="bg-gray-200 p-1 px-3 rounded-md focus:outline-none m-1.5">
          <option selected hidden>
            Căn hộ chung cư
          </option>
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
          <option>Option 4</option>
        </select>
        <select class="bg-gray-200 p-1 px-3 rounded-md focus:outline-none m-1.5">
          <option selected hidden>
            Mức giá
          </option>
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
          <option>Option 4</option>
        </select>
        <select class="bg-gray-200 p-1 px-3 rounded-md focus:outline-none m-1.5">
          <option selected hidden>
            Diện tích
          </option>
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
          <option>Option 4</option>
        </select>
        <select class="bg-gray-200 p-1 px-3 rounded-md focus:outline-none m-1.5">
          <option selected hidden>
            Số phòng ngủ
          </option>
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
          <option>Option 4</option>
        </select>
        <select class="bg-gray-200 p-1 rounded-md focus:outline-none m-1.5">
          <option selected hidden>
            Nội dung tin
          </option>
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
          <option>Option 4</option>
        </select>
      </div>
    </div>
  );
}
