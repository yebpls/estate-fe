import React from "react";

export default function SearchBar() {
    return (
        <div>
            <div className="absolute right-7">
                <input
                    placeholder="Search a project by name"
                    className="px-3 p-1.5 text-sm text-orange-300 w-60 placeholder-gray_3 focus:outline-none focus:border-orange-300  focus:ring-0 ring-gray-400 rounded-e-none"
                />
                <button className="px-3 p-1 hover:bg-orange-300 bg-orange-400 text-white border-none rounded-s-none">
                    Search
                </button>
            </div>
        </div>
    );
}
