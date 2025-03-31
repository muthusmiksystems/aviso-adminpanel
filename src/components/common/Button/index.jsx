import React from "react";

const CustomButton = ({ className = "", children }) => {
  let baseStyles = " py-2 font-bold  rounded-full  cursor-pointer ";

  return <button className={`${baseStyles} ${className}`}>{children}</button>;
};

export default CustomButton;
