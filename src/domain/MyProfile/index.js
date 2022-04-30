import React, { useState, useEffect } from "react";
import "./MyProfile.scss";
import { HeaderWithPhotos } from "../../components/HeaderWithPhotos";
import { CustomFormContainer } from "../../components/CustomFormContainer";
import { CustomAlert } from "../../components/Common/CustomAlert";
import { CustomInput } from "../../components/Common/CustomInput";
import { LoadingScreen } from "../../components/LoadingScreen";
import { Form, Button, Modal } from "react-bootstrap";
import { loadingActions } from "../../store/loading";
import { loginActions } from "../../store/login";
import { userPhotosActions } from "../../store/userPhotos";
import { useDispatch, useSelector } from "react-redux";
import { validate, format } from "rut.js";
import UserService from "../../request/services/UserService";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.loading.loading);
  const { userData } = useSelector((state) => state.login);
  const [disabledSaveButton, setDisabledSaveButton] = useState(true);
  const [thisUser, setThisUser] = useState({});
  const [rut, setRut] = useState("");
  const [rutError, setRutError] = useState("");
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
  const [showEditConfirmationModal, setShowEditConfirmationModal] =
    useState(false);
  const handleCloseEditConfirmationModal = () =>
    setShowEditConfirmationModal(false);
  const handleShowEditConfirmationModal = () =>
    setShowEditConfirmationModal(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);

  useEffect(() => {
    dispatch(loadingActions.setLoading(true));
    getUserInfo().then(() => dispatch(loadingActions.setLoading(false)));
  }, []);

  //Traigo y pongo en inputs la información editable del usuario
  const getUserInfo = async () => {
    try {
      const response = await UserService.getUserById(userData.id);
      const { data } = await response.data;
      setThisUser(data);
      setRut(data.rut);
      setFirstNames(data.names);
      setFirstLastName(data.first_lastname);
      setSecondLastName(data.second_lastname);
      setEmail(data.email);
      setCellphone(data.phone_number);
      setAddress(data.adress);
      dispatch(loadingActions.setLoading(false));
    } catch (e) {
      dispatch(loadingActions.setLoading(false));
      if (!e.data) {
        setAlertContent("No se pudo establecer conexión con el servidor.");
      } else {
        setAlertContent(e.data.error);
      }
      setTimeout(() => {
        setAlertContent("");
      }, 5000);
    }
  };
  useEffect(() => {
    dispatch(loadingActions.setLoading(true));
    getUserInfo();
  }, []);

  //Validador de formato en base al campo
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
    } else {
      return null;
    }
    return validator.test(e);
  };

  //Ejecuto la validación de campos
  useEffect(() => {
    if (rut !== "") {
      rut.length < 8
        ? setRutError("El rut no es válido, intenta nuevamente.")
        : validate(rut)
        ? setRutError("")
        : setRutError("El rut no es válido, intenta nuevamente.");
    } else {
      setRutError("");
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
  }, [rut, firstNames, firstLastName, secondLastName, cellphone, email]);

  //Habilito el botón si corresponde
  useEffect(() => {
    let thereIsChanges = false;
    if (
      format(rut, { dots: false }) !== format(thisUser.rut, { dots: false }) ||
      firstNames !== thisUser.names ||
      firstLastName !== thisUser.first_lastname ||
      secondLastName !== thisUser.second_lastname ||
      cellphone !== thisUser.phone_number ||
      email !== thisUser.email ||
      address !== thisUser.adress
    ) {
      thereIsChanges = true;
    }
    if (
      thereIsChanges &&
      rut !== "" &&
      rutError === "" &&
      firstNames !== "" &&
      firstNamesError === "" &&
      firstLastName !== "" &&
      firstLastNameError === "" &&
      secondLastNameError === "" &&
      cellphone !== "" &&
      cellphoneError === "" &&
      email !== "" &&
      emailError === "" &&
      address !== ""
    ) {
      setDisabledSaveButton(false);
    } else {
      setDisabledSaveButton(true);
    }
  }, [
    rut,
    rutError,
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
  ]);

  //Función que ejecuta la edición a través del servidor
  const handleEdit = async (e) => {
    e.preventDefault();
    dispatch(loadingActions.setLoading(true));
    try {
      const editData = {
        userTypeId: thisUser.user_type_id,
        names: firstNames,
        firstLastName,
        secondLastName,
        rut: format(rut, { dots: false }),
        adress: address,
        phoneNumber: cellphone,
        email,
      };
      const response = await UserService.editUser(userData.id, editData);
      if (response.data.ok) {
        getUserInfo();
        handleShowEditConfirmationModal();
      }
    } catch (e) {
      dispatch(loadingActions.setLoading(false));
      if (!e.data) {
        setAlertContent("No se pudo establecer conexión con el servidor.");
      } else {
        setAlertContent(e.data.error);
      }
      setTimeout(() => {
        setAlertContent("");
      }, 5000);
    }
  };

  //Función que se ejecuta al aceptar el mensaje de éxito de edición
  const handleSuccessOnEdit = () => {
    handleCloseEditConfirmationModal();
    getUserInfo();
  };

  //Función que ejecuta la eliminación del usuario a través del servidor
  const handleDelete = async () => {
    handleCloseDeleteModal();
    dispatch(loadingActions.setLoading(true));
    try {
      const deleteUserResponse = await UserService.deleteUser(userData.id);
      if (deleteUserResponse.data.ok) {
        dispatch(loginActions.logout());
        dispatch(userPhotosActions.setUserPhotos([]));
        localStorage.removeItem("token");
        navigate("/");
      }
    } catch (e) {
      dispatch(loadingActions.setLoading(false));
      if (!e.data) {
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
        <div id="myprofile" className="d-flex flex-column align-items-center">
          {alertContent !== "" && (
            <CustomAlert variant="danger" className="mt-2 mb-0">
              {alertContent}
            </CustomAlert>
          )}
          <HeaderWithPhotos title="Mi perfil" />
          <Modal
            show={showEditConfirmationModal}
            onHide={handleCloseEditConfirmationModal}
          >
            <Modal.Body>Datos modificados con éxito</Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleSuccessOnEdit}>
                Aceptar
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
            <Modal.Header closeButton>
              <Modal.Title>Confirmación</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              ¿Estás seguro/a de que quieres eliminar esta cuenta? Se borrarán
              de nuestros registros todos tus datos y capturas.
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleDelete}>
                Sí, eliminar
              </Button>
              <Button variant="danger" onClick={handleCloseDeleteModal}>
                Cancelar
              </Button>
            </Modal.Footer>
          </Modal>
          <CustomFormContainer className="my-5">
            <Form className="d-flex flex-column align-items-center">
              <h3>Datos personales</h3>
              <div className="inputs-container d-flex gap-3 flex-wrap justify-content-between">
                <Form.Group>
                  <Form.Label>Rut</Form.Label>
                  <CustomInput
                    type="text"
                    value={rut}
                    onChange={(e) => setRut(e.target.value)}
                    errorText={rutError}
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
              <div className="d-flex align-items-center gap-5">
                <Button
                  variant="secondary mt-4"
                  type="submit"
                  disabled={disabledSaveButton}
                  onClick={handleEdit}
                >
                  Guardar cambios
                </Button>
                <Button
                  variant="secondary mt-4"
                  onClick={handleShowDeleteModal}
                >
                  Eliminar cuenta
                </Button>
              </div>
            </Form>
          </CustomFormContainer>
        </div>
      )}
    </React.Fragment>
  );
};

export { MyProfile };
