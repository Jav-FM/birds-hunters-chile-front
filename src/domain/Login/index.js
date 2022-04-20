import React, { useState, useEffect } from "react";
import "./Login.scss";
import { CustomFormContainer } from "../../components/CustomFormContainer";
import { CustomInput } from "../../components/Common/CustomInput";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { LoadingScreen } from "../../components/LoadingScreen";
import { loadingActions } from "../../store/loading";
import { birdsActions } from "../../store/birds";
import { Spinner, Alert } from "react-bootstrap";
import UserService from "../../request/services/UserService";
import jwt_decode from "jwt-decode";
import { loginActions } from "../../store/login";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadingActions.setLoading(true));
    if (birds.length === 0) {
      fetch("https://aves.ninjas.cl/api/birds")
        .then((response) => response.json())
        .then((json) => {
          const orderedBirds = json.sort((a, b) => a.name.spanish.localeCompare(b.name.spanish));
          dispatch(birdsActions.setBirds(orderedBirds));
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
          const orderedBirds = json.sort((a, b) => a.name.spanish.localeCompare(b.name.spanish));
          dispatch(birdsActions.setBirds(orderedBirds));
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
        : setEmailError("Ingresa un correo válido.");
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

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loadingActions.setLoading(true));
    try {
      const loginData = {
        email: email,
        password: password,
      };
      const response = await UserService.loginUser(loginData);
      const data = await response.data;
      localStorage.setItem("token", data.token);
      const info = jwt_decode(data.token);
      dispatch(loginActions.login(info));
      navigate("/");
    } catch (e) {
      dispatch(loadingActions.setLoading(false));
      if (!e.data.error) {
        setAlertContent("No se pudo establecer conexión con el servidor.");
      } else {
        setAlertContent(e.data.error);
      }

      setTimeout(() => {
        setAlertContent("");
      }, 5000);
    }
  };

  return (
    <React.Fragment>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div id="login" className="d-flex flex-column align-items-center">
          {alertContent !== "" && (
            <Alert variant="danger" className="mt-2 mb-0">
              {alertContent}
            </Alert>
          )}
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
                  onClick={handleLogin}
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
