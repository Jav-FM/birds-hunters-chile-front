import "./Register.scss";
import { CustomFormContainer } from "../../components/CustomFormContainer";
import { Form, Button } from "react-bootstrap";

const Register = () => {
  return (
    <div id="register" className="d-flex flex-column align-items-center">
      <h2 class="my-5">Registrate</h2>
      <CustomFormContainer>
        <Form className="d-flex flex-column align-items-center">
          <div
            id="inputs-container"
            class="d-flex gap-3 flex-wrap justify-content-evenly"
          >
            <Form.Group>
              <Form.Label>Rut</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Nombres</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Primer apellido</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Segundo apellido</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control type="email" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Repite tu contraseña</Form.Label>
              <Form.Control type="password" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Dirección</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Teléfono</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </div>

          <Button variant="secondary mt-4" type="submit">
            Registrarse
          </Button>
        </Form>
      </CustomFormContainer>
    </div>
  );
};

export { Register };
