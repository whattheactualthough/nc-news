import React, { useState, useEffect } from 'react';

const SortArticles = ({ sortBy, setSortBy, order, setOrder }) => {
  return (
    <div>
      <label>
        Sort by: 
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="created_at">Date</option>
          <option value="votes">Votes</option>
          <option value="comment_count">Comments</option>
        </select>
      </label>

      <label>
        Order:
        <select value={order} onChange={(e) => setOrder(e.target.value)}>
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </label>
    </div>
  );
};


export default SortArticles;

// sort articles by date, comment count, votess
// toggle between asc and desc

