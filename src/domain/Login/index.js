import React, { useState, useEffect } from "react";
import "./Login.scss";
import { CustomFormContainer } from "../../components/CustomFormContainer";
import { CustomInput } from "../../components/Common/CustomInput";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { LoadingScreen } from "../../components/LoadingScreen";
import { loadingActions } from "../../store/loading";
import { birdsActions } from "../../store/birds";
import { Spinner } from "react-bootstrap";

const Login = () => {
  const [disabledButton, setDisabledButton] = useState(true);
  const loading = useSelector((state) => state.loading.loading);
  const birds = useSelector((state) => state.birds.birds);
  const [randomBird, setRandomBird] = useState(false);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [alertContent, setAlertContent] = useState("");

  useEffect(() => {
    dispatch(loadingActions.setLoading(true));
    if (birds.length === 0) {
      fetch("https://aves.ninjas.cl/api/birds")
        .then((response) => response.json())
        .then((json) => {
          dispatch(birdsActions.setBirds(json));
          const newRandomBird = json[Math.floor(Math.random() * json.length)];
          setRandomBird(newRandomBird);
          dispatch(loadingActions.setLoading(false));
        });
    } else {
      const newRandomBird = birds[Math.floor(Math.random() * birds.length)];
      setRandomBird(newRandomBird);
      dispatch(loadingActions.setLoading(false));
    }
  }, []);

  useEffect(() => {
    dispatch(loadingActions.setLoading(true));
    if (birds.length === 0) {
      fetch("https://aves.ninjas.cl/api/birds")
        .then((response) => response.json())
        .then((json) => {
          dispatch(birdsActions.setBirds(json));
        });
    }
    const newRandomBird = birds[Math.floor(Math.random() * birds.length)];
    setRandomBird(newRandomBird);
    dispatch(loadingActions.setLoading(false));
  }, []);

  const validateEmail = (e) => {
    let validator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return validator.test(e);
  };

  useEffect(() => {
    if (email !== "") {
      validateEmail(email)
        ? setEmailError("")
        : setEmailError("Ingresa un correo válido. asdasdasdasd asd asd asdasd");
    } else {
      setEmailError("");
    }
  }, [email]);

  useEffect(() => {
    if (email !== "" && password !== "" && emailError === "") {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [email, password, emailError]);

  return (
    <React.Fragment>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div id="login" className="d-flex flex-column align-items-center">
          <h2 className="my-5">Inicia sesión</h2>
          <div className="d-flex flex-wrap mb-5 gap-5 justify-content-center">
            {randomBird ? (
              <img
                id="login-image"
                src={randomBird.images?.full}
                alt="bird_image"
              />
            ) : (
              <div id="spinner-container">
                <Spinner animation="border" id="spinner" />
              </div>
            )}
            <CustomFormContainer>
              <Form className="d-flex flex-column align-items-center">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Correo electrónico</Form.Label>
                  <CustomInput
                    required
                    type="email"
                    placeholder="Ingresa tu correo"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    errorText={emailError}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <CustomInput
                    type="password"
                    placeholder="Ingresa tu contraseña"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Button
                  variant="secondary mt-4"
                  type="submit"
                  disabled={disabledButton}
                >
                  Ingresar
                </Button>
              </Form>
            </CustomFormContainer>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export { Login };
