import React, { useState, useEffect } from "react";
import "./CaptureForm.scss";
import { Form, Button } from "react-bootstrap";
import { CustomInput } from "../Common/CustomInput";
import { GiEgyptianBird } from "react-icons/gi";
import { useSelector } from "react-redux";
import moment from 'moment';

const CaptureForm = ({
  buttonText,
  src,
  handleRegister,
  selectedSpecies,
  handleSelectBird,
  date,
  setDate,
  place,
  setPlace,
  file,
  handleSetFile,
  editMode,
}) => {
  const [disabledButton, setDisabledButton] = useState(true);
  const birds = useSelector((state) => state.birds.birds);
  const userPhotos = useSelector((state) => state.userPhotos.userPhotos);

  // habilitar botón
  useEffect(() => {
    if (selectedSpecies !== "" && date !== "" && place !== "" && file !== "") {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [selectedSpecies, date, place, file]);

  return (
    <div
      id="capture-form"
      className="container d-flex gap-5 flex-wrap align-items-center justify-content-evenly my-3"
    >
      {src === "" ? (
        <div id="waiting-picture" className="d-flex align-items-center px-5">
          <h1 id="waiting-picture-icon">
            <GiEgyptianBird />
          </h1>
        </div>
      ) : (
        <div
          id="upload-picture-container"
          className="d-flex align-items-center px-5"
        >
          <img id="upload-picture" src={src} alt="fotoseleccionada" />
        </div>
      )}

      <Form
        id="picture-form"
        className="d-flex flex-column justify-content-center"
        onSubmit={handleRegister}
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>
            Especie {handleSelectBird && "(Sólo figuran las no capturadas)"}
          </Form.Label>
          <Form.Control
            name="bird_id"
            required
            as="select"
            value={selectedSpecies}
            onChange={handleSelectBird ? handleSelectBird : () => {}}
            disabled={handleSelectBird ? false : true}
          >
            <option key={0} value={""}>
              Seleccionar
            </option>

            {editMode
              ? birds.map((b, i) => (
                  <option key={i + 1} value={b.uid}>
                    {b.name.spanish}
                  </option>
                ))
              : birds.map((b, i) => {
                  if (
                    userPhotos.filter((p) => p.bird_id === b.uid).length > 0
                  ) {
                    return null;
                  } else {
                    return (
                      <option key={i + 1} value={b.uid}>
                        {b.name.spanish}
                      </option>
                    );
                  }
                })}
          </Form.Control>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Fecha de captura</Form.Label>
          <CustomInput
            name="date"
            required
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Lugar de avistamiento</Form.Label>
          <CustomInput
            name="place"
            type="text"
            required
            value={place}
            onChange={(e) => setPlace(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            name="photo"
            type="file"
            value={file}
            onChange={handleSetFile}
          />
        </Form.Group>

        <Button variant="primary mt-4" type="submit" disabled={disabledButton}>
          {buttonText}
        </Button>
      </Form>
    </div>
  );
};

export { CaptureForm };
