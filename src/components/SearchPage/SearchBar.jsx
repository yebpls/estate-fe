import React from "react";

export default function SearchBar() {
  return (
    <div class="mx-auto mt-5 w-4/5">
      <div class="block relative text-gray-500 shadow-md shadow-gray-400 rounded-md border-none">
        <div class="">
          <input
            type="text"
            class="p-3 pl-10 w-full border-gray-200 focus:outline-none  border-none"
            placeholder="Tìm kiếm căn hộ, chung cư trên toàn quốc mà bạn yêu thích"
          />
          <svg
            className="w-7 h-7 text-blue-400 absolute left-1.5 top-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <button class="p-1 px-3 bg-sky-400 hover:bg-sky-500 text-white border-none font-bold absolute right-2 top-2 text-sm  shadow-sm shadow-gray-400">
            Tìm Kiếm
          </button>
        </div>
      </div>
    </div>
  );
}
