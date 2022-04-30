import { Alert } from "react-bootstrap";

const CustomAlert = ({ text, children, variant, ...restOfProps }) => {
  return (
    <div style={{ position: "absolute", top: 60 }}>
      <Alert variant={variant} {...restOfProps}>
       {children ? children : text} 
      </Alert>
    </div>
  );
};

export { CustomAlert };
