import React from "react";

export const Loader: React.FC<{ size?: number }> = ({ size = 40 }) => (
  <div
    style={{
      width: size,
      height: size,
      border: "4px solid #ccc",
      borderTop: "4px solid #333",
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
    }}
  />
);
