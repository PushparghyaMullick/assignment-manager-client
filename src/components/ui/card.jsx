import React from "react";

const Card = ({ children }) => {
  return <div className="rounded-2xl shadow-md bg-white p-4">{children}</div>;
};

const CardContent = ({ children }) => {
  return <div className="mt-2">{children}</div>;
};

export { Card, CardContent };