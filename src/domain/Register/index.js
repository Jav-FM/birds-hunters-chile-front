import React, { useEffect } from "react";
import "./Register.scss";
import { CustomFormContainer } from "../../components/CustomFormContainer";
import { Form, Button } from "react-bootstrap";
import { loadingActions } from "../../store/loading";
import { useDispatch } from "react-redux";

const Register = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadingActions.setLoading(false));
  }, []);

  return (
    <div id="register" className="d-flex flex-column align-items-center">
      <h2 className="my-5">Registrate</h2>
      <CustomFormContainer className="mb-5">
        <Form className="d-flex flex-column align-items-center">
          <h3>Datos personales</h3>
          <div className="inputs-container d-flex gap-3 flex-wrap justify-content-between">
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
              <Form.Label>Dirección</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Teléfono</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </div>
          <h3>Contraseña</h3>
          <div className="inputs-container d-flex gap-3 flex-wrap justify-content-between">
            <Form.Group>
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Repite tu contraseña</Form.Label>
              <Form.Control type="password" />
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
