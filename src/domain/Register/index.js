import React, { useState, useEffect } from "react";
import "./Register.scss";
import { CustomFormContainer } from "../../components/CustomFormContainer";
import { HeaderWithPhotos } from "../../components/HeaderWithPhotos";
import { CustomInput } from "../../components/Common/CustomInput";
import { CustomAlert } from "../../components/Common/CustomAlert";
import { Form, Button } from "react-bootstrap";
import { loadingActions } from "../../store/loading";
import { birdsActions } from "../../store/birds";
import { useSelector, useDispatch } from "react-redux";
import { validate, format } from "rut.js";
import UserService from "../../request/services/UserService";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const [disabledButton, setDisabledButton] = useState(true);
  const birds = useSelector((state) => state.birds.birds);
  const [id, setId] = useState("");
  const [idError, setIdError] = useState("");
  const [firstNames, setFirstNames] = useState("");
  const [firstNamesError, setFirstNamesError] = useState("");
  const [firstLastName, setFirstLastName] = useState("");
  const [firstLastNameError, setFirstLastNameError] = useState("");
  const [secondLastName, setSecondLastName] = useState("");
  const [secondLastNameError, setSecondLastNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [cellphoneError, setCellphoneError] = useState("");
  const [address, setAddress] = useState("");
  const [alertContent, setAlertContent] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordReenter, setPasswordReenter] = useState("");
  const [passwordReenterError, setPasswordReenterError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadingActions.setLoading(false));
  }, []); // eslint-disable-line

  //Validadores de formato en función del campo
  const validateCamps = (e) => {
    let validator;
    if (e === firstNames || e === firstLastName || e === secondLastName) {
      //Mayusculas, minusculas, acentos, espacio, apostrofe, guiones
      validator = /^([-A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]){2,100}$/;
    } else if (e === email) {
      validator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    } else if (e === cellphone) {
      //Sólo 9 numeros
      validator = /^[0-9]{9}$/;
    } else if (e === password) {
      //Entre 6 y 8 caracteres, combinar números, letras y carácteres especiales (.!$#@%).
      validator =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!.%#]{6,8}$/;
    } else {
      return null;
    }
    return validator.test(e);
  };

  //Validador para reingreso de contraseña
  const validatePasswordReenter = (e) => {
    if (e === password) {
      return true;
    } else {
      return false;
    }
  };

  //Ejecución de validadores
  useEffect(() => {
    if (id !== "") {
      id.length < 8
        ? setIdError("El rut no es válido, intenta nuevamente.")
        : validate(id)
        ? setIdError("")
        : setIdError("El rut no es válido, intenta nuevamente.");
    } else {
      setIdError("");
    }
    if (firstNames !== "") {
      validateCamps(firstNames)
        ? setFirstNamesError("")
        : setFirstNamesError(
            "Usa sólo letras, espacios, apostrofe y/o guines."
          );
    } else {
      setFirstNamesError("");
    }
    if (firstLastName !== "") {
      validateCamps(firstLastName)
        ? setFirstLastNameError("")
        : setFirstLastNameError(
            "Usa sólo letras, espacios, apostrofe y/o guines."
          );
    } else {
      setFirstLastNameError("");
    }
    if (secondLastName !== "") {
      validateCamps(secondLastName)
        ? setSecondLastNameError("")
        : setSecondLastNameError(
            "Usa sólo letras, espacios, apostrofe y/o guines."
          );
    } else {
      setSecondLastNameError("");
    }
    if (email !== "") {
      validateCamps(email)
        ? setEmailError("")
        : setEmailError("Ingresa un correo válido.");
    } else {
      setEmailError("");
    }
    if (cellphone !== "") {
      validateCamps(cellphone)
        ? setCellphoneError("")
        : setCellphoneError("Ingresa sólo 9 números (sin +56).");
    } else {
      setCellphoneError("");
    }
    if (password !== "") {
      validateCamps(password)
        ? setPasswordError("")
        : setPasswordError("El formato no es valido, intenta nuevamente.");
    } else {
      setPasswordError("");
    }
    if (passwordReenter !== "") {
      validatePasswordReenter(passwordReenter)
        ? setPasswordReenterError("")
        : setPasswordReenterError("Debes poner la misma contraseña.");
    } else {
      setPasswordReenterError("");
    }
  }, [
    id,
    firstNames,
    firstLastName,
    secondLastName,
    cellphone,
    email,
    password,
    passwordReenter,
  ]); // eslint-disable-line

  //Si corresponde, habilito botón
  useEffect(() => {
    if (
      id !== "" &&
      idError === "" &&
      firstNames !== "" &&
      firstNamesError === "" &&
      firstLastName !== "" &&
      firstLastNameError === "" &&
      secondLastNameError === "" &&
      cellphone !== "" &&
      cellphoneError === "" &&
      email !== "" &&
      emailError === "" &&
      address !== "" &&
      password !== "" &&
      passwordError === "" &&
      passwordReenter !== "" &&
      passwordReenterError === ""
    ) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [
    id,
    idError,
    firstNames,
    firstNamesError,
    firstLastName,
    firstLastNameError,
    secondLastNameError,
    cellphone,
    cellphoneError,
    email,
    emailError,
    address,
    password,
    passwordError,
    passwordReenter,
    passwordReenterError,
  ]); // eslint-disable-line

  //Función que ejecuta el registro de usuario y lleva a vista de login
  const handleRegister = async (e) => {
    e.preventDefault();
    dispatch(loadingActions.setLoading(true));
    try {
      const registerData = {
        userTypeId: 2,
        names: firstNames,
        firstLastName,
        secondLastName,
        rut: format(id, { dots: false }),
        adress: address,
        phoneNumber: cellphone,
        email,
        password,
      };
      const response = await UserService.createUser(registerData);
      if (response.data.ok) navigate("/login");
    } catch (e) {
      if (!e.data) {
        setAlertContent("No se pudo establecer conexión con el servidor.");
      } else if (
        e.data.error ==
        'error: duplicate key value violates unique constraint "users_rut_key"'
      ) {
        setAlertContent("El rut ingresado ya existe en nuestra base de datos.");
      } else if (
        e.data.error ==
        'error: duplicate key value violates unique constraint "users_email_key"'
      ) {
        setAlertContent(
          "El correo ingresado ya existe en nuestra base de datos."
        );
      } else {
        setAlertContent(e.data.error);
      }
      dispatch(loadingActions.setLoading(false));
      setTimeout(() => {
        setAlertContent("");
      }, 5000);
    }
  };

  return (
    <div id="register" className="d-flex flex-column align-items-center">
      {alertContent !== "" && (
        <CustomAlert variant="danger" className="mt-2 mb-0">
          {alertContent}
        </CustomAlert>
      )}
      <HeaderWithPhotos title="Regístrate" />
      <CustomFormContainer className="my-5">
        <Form className="d-flex flex-column align-items-center">
          <h3>Datos personales</h3>
          <div className="inputs-container d-flex gap-3 flex-wrap justify-content-between">
            <Form.Group>
              <Form.Label>Rut</Form.Label>
              <CustomInput
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                errorText={idError}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Nombre(s)</Form.Label>
              <CustomInput
                type="text"
                value={firstNames}
                onChange={(e) => setFirstNames(e.target.value)}
                errorText={firstNamesError}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Primer apellido</Form.Label>
              <CustomInput
                type="text"
                value={firstLastName}
                onChange={(e) => setFirstLastName(e.target.value)}
                errorText={firstLastNameError}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Segundo apellido</Form.Label>
              <CustomInput
                type="text"
                value={secondLastName}
                onChange={(e) => setSecondLastName(e.target.value)}
                errorText={secondLastNameError}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Correo electrónico</Form.Label>
              <CustomInput
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                errorText={emailError}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Dirección</Form.Label>
              <CustomInput
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Teléfono celular</Form.Label>
              <CustomInput
                type="text"
                value={cellphone}
                onChange={(e) => setCellphone(e.target.value)}
                errorText={cellphoneError}
              />
            </Form.Group>
          </div>
          <h3>Contraseña</h3>
          <p id="password-indications">
            {" "}
            Tucontraseña debe tener entre 6 y 8 caracteres e incluir una
            combinación de números, letras y caracteres especiales (.!$#@%).
          </p>
          <div className="inputs-container d-flex gap-3 flex-wrap justify-content-between">
            <Form.Group>
              <Form.Label>Contraseña</Form.Label>
              <CustomInput
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                errorText={passwordError}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Repite tu contraseña</Form.Label>
              <CustomInput
                type="password"
                value={passwordReenter}
                onChange={(e) => setPasswordReenter(e.target.value)}
                errorText={passwordReenterError}
              />
            </Form.Group>
          </div>

          <Button
            variant="secondary mt-4"
            type="submit"
            disabled={disabledButton}
            onClick={handleRegister}
          >
            Registrarse
          </Button>
        </Form>
      </CustomFormContainer>
    </div>
  );
};

export { Register };
