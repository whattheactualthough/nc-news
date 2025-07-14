import React, { useState, useEffect } from "react";
import SortArticlesDropDown from "./SortArticlesDropDown";

const SortArticles = ({ sortBy, setSortBy, order, setOrder }) => {
  const handleChange = (e) => {
    setOrder(e.target.checked ? "asc" : "desc");
  };
  return (
    <div className="flex items-center gap-4">
      <SortArticlesDropDown sortBy={sortBy} setSortBy={setSortBy}/>

      <div className="inline-flex items-center gap-2">
        <label
          htmlFor="switch-component-desc"
          className="text-gray-600 text-sm cursor-pointer"
        >
          Asc
        </label>

        <div className="relative inline-block w-11 h-5">
          <input
            id="switch-component-desc"
            type="checkbox"
            className="peer appearance-none w-11 h-5 bg-slate-100 rounded-full checked:bg-slate-800 cursor-pointer transition-colors duration-300"
            checked={order === "asc"}
            onChange={handleChange}
          />
          <label
            htmlFor="switch-component-desc"
            className="absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-slate-800 cursor-pointer"
          ></label>
        </div>

        <label
          htmlFor="switch-component-desc"
          className="text-slate-600 text-sm cursor-pointer"
        >
          Desc
        </label>
      </div>
     
      
    </div>
  );
};

export default SortArticles;

// sort articles by date, comment count, votess
// toggle between asc and desc
