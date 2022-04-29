import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { BsExclamationCircleFill } from "react-icons/bs";

const CustomInput = ({
  placeholder,
  type,
  required,
  errorText,
  errorStyle,
  errorMaxWidth,
  ...restOfProps
}) => {
  const [showError, setShowError] = useState(false);

  //Manejo de mensaje de error
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
          style={errorMaxWidth ? errorMaxWidth :{
            maxWidth: "220px",
          }}
        >
          <p
            style={
              errorStyle
                ? errorStyle
                : {
                    color: "#ffffff",
                  }
            }
          >
            <BsExclamationCircleFill />
          </p>
          <p
            style={
              errorStyle
                ? errorStyle
                : {
                    color: "#ffffff",
                  }
            }
          >
            {errorText}
          </p>
        </div>
      )}
    </div>
  );
};

export { CustomInput };
