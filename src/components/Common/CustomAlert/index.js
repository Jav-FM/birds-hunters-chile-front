import { Alert } from "react-bootstrap";

const CustomAlert = ({ text, children, variant, ...restOfProps }) => {
  return (
    <div style={{ position: "fixed", top: '6vh' }}>
      <Alert variant={variant} {...restOfProps}>
       {children ? children : text} 
      </Alert>
    </div>
  );
};

export { CustomAlert };
