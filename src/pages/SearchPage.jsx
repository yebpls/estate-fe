import React from "react";
import SearchBar from "../components/SearchPage/SearchBar";
import OverallFilter from "../components/SearchPage/OverallFilter";
import ViewProject from "../components/SearchPage/ViewProject";

export default function SearchPage() {
  return (
    <div>
      <SearchBar />
      <OverallFilter />
      <ViewProject />
    </div>
  );
}
