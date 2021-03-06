import React, { useState, useEffect } from "react";
import "./Login.scss";
import { CustomFormContainer } from "../../components/CustomFormContainer";
import { HeaderWithPhotos } from "../../components/HeaderWithPhotos";
import { CustomInput } from "../../components/Common/CustomInput";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { LoadingScreen } from "../../components/LoadingScreen";
import { loadingActions } from "../../store/loading";
import { birdsActions } from "../../store/birds";
import { Spinner } from "react-bootstrap";
import { CustomAlert } from "../../components/Common/CustomAlert";
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

  //Si no tengo aves en redux las traigo, y con ellas defino una random para mostrarla en la vista
  useEffect(() => {
    dispatch(loadingActions.setLoading(true));
    if (birds.length === 0) {
      fetch("https://aves.ninjas.cl/api/birds")
        .then((response) => response.json())
        .then((json) => {
          const orderedBirds = json.sort((a, b) =>
            a.name.spanish.localeCompare(b.name.spanish)
          );
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

  //Validador de formato de correo
  const validateEmail = (e) => {
    let validator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return validator.test(e);
  };

  //Aplico validador de correo
  useEffect(() => {
    if (email !== "") {
      validateEmail(email)
        ? setEmailError("")
        : setEmailError("Ingresa un correo v??lido.");
    } else {
      setEmailError("");
    }
  }, [email]);

  //Habilito bot??n si corresponde
  useEffect(() => {
    if (email !== "" && password !== "" && emailError === "") {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [email, password, emailError]);

  //Funci??n para ejecutar proceso de login, guardar token en localStorage y guardar data de usuario en redux
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
      if (!e.data) {
        setAlertContent("No se pudo establecer conexi??n con el servidor.");
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
            <CustomAlert variant="danger" className="mt-2 mb-0">
              {alertContent}
            </CustomAlert>
          )}
          <HeaderWithPhotos title="Inicia sesi??n" />
          <div className="d-flex flex-wrap my-5 gap-5 justify-content-center">
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
                  <Form.Label>Correo electr??nico</Form.Label>
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
                  <Form.Label>Contrase??a</Form.Label>
                  <CustomInput
                    type="password"
                    placeholder="Ingresa tu contrase??a"
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
