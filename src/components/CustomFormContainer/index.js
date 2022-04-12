import "./CustomFormContainer.scss";
import React from "react";

const CustomFormContainer = ({children}) => {
  return (
    <div id="custom-form">
      {children}
    </div>
  );
};

export { CustomFormContainer };
