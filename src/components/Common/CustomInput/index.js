import React, { useState, useEffect } from "react";
import "./CustomInput.scss";
import { Form } from "react-bootstrap";

const CustomInput = ({
  placeholder,
  type,
  required,
  errorText,
  ...restOfProps
}) => {
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (errorText && errorText !== "") {
      setShowError(true);
    } else {
      setShowError(false);
    }
  }, [errorText]);

  return (
    <div id="custom-input">
      <Form.Control
        type={type}
        placeholder={placeholder}
        required={required}
        {...restOfProps}
      />

      {showError && <p id="input-alert">{errorText}</p>}
    </div>
  );
};

export { CustomInput };
