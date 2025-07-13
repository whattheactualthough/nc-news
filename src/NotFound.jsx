import React from "react";

const NotFound = ({ statusCode = 404, message = "Page not found." }) => {
  return (
    <div className="error-page">
      <h1>Error {statusCode}</h1>
      <p>{message}</p>
    </div>
  );
};

export default NotFound;