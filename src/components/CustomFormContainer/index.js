import "./CustomFormContainer.scss";
import React from "react";

const CustomFormContainer = ({children, ...restOfProps}) => {
  return (
    <div id="custom-form" {...restOfProps}>
      {children}
    </div>
  );
};

export { CustomFormContainer };
