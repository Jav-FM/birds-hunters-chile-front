import { CustomFormContainer } from "../../components/CustomFormContainer";
import { Form, Button } from "react-bootstrap";

const Login = () => {
  return (
    <div id="login" className="d-flex flex-column align-items-center">
      <h2 classNames="my-5">Inicia sesión</h2>
      <CustomFormContainer>
        <Form className="d-flex flex-column align-items-center">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Correo electrónico</Form.Label>
            <Form.Control type="email" placeholder="Ingresa tu correo" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" placeholder="Ingresa tu contraseña" />
          </Form.Group>
          <Button variant="secondary mt-4" type="submit">
            Ingresar
          </Button>
        </Form>
      </CustomFormContainer>
    </div>
  );
};

export { Login };
