import { Alert } from "react-bootstrap";

const CustomAlert = ({ text, variant, ...restOfProps }) => {
  return (
    <Alert variant={variant} {...restOfProps}>
      {text}
    </Alert>
  );
};

export { CustomAlert };
