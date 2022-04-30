import React from "react";

const HeaderWithoutPhotos = ({ title }) => {
  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{
        height: "80px",
        overflow: "hidden",
        backgroundColor: "#8BC34A66",
      }}
    >
      <h2>{title}</h2>
    </div>
  );
};

export { HeaderWithoutPhotos };
