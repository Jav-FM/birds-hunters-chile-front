import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { BsExclamationCircleFill } from "react-icons/bs";

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

      {showError && (
        <div
          className="d-flex align-items-start gap-1"
          style={{
            maxWidth: "220px",
          }}
        >
          <p
            style={{
              color: "#ffffff",
            }}
          >
            <BsExclamationCircleFill />
          </p>
          <p
            style={{
              color: "#ffffff"
            }}
          >
            {errorText}
          </p>
        </div>
      )}
    </div>
  );
};

export { CustomInput };
