import React, { useState, useEffect } from "react";
import "./NewCapture.scss";
import { LoadingScreen } from "../../components/LoadingScreen";
import { CustomInput } from "../../components/Common/CustomInput";
import { BirdsGallery } from "../../components/BirdsGallery";
import { useSelector, useDispatch } from "react-redux";
import { loadingActions } from "../../store/loading";
import { birdsActions } from "../../store/birds";
import { GiEgyptianBird } from "react-icons/gi";
import { Form, Button } from "react-bootstrap";

const NewCapture = () => {
  const [disabledButton, setDisabledButton] = useState(true);
  const birds = useSelector((state) => state.birds.birds);
  const loading = useSelector((state) => state.loading.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (birds.length === 0) {
      dispatch(loadingActions.setLoading(true));
      fetch("https://aves.ninjas.cl/api/birds")
        .then((response) => response.json())
        .then((json) => {
          dispatch(birdsActions.setBirds(json));
          dispatch(loadingActions.setLoading(false));
        });
    }
  }, []);

  return (
    <React.Fragment>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div id="newcapture" className="d-flex flex-column align-items-center">
          <h1 className="my-5">Nueva captura</h1>

          <div className="container d-flex gap-5 flex-wrap align-items-center justify-content-evenly my-3">
            <div
              id="waiting-picture"
              className="d-flex align-items-center px-5"
            >
              <h1 id="waiting-picture-icon">
                <GiEgyptianBird />
              </h1>
            </div>

            <Form
              id="picture-form"
              className="d-flex flex-column justify-content-center"
            >
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Especie</Form.Label>
                <Form.Select variant="danger">
                <option>Todas</option>
                {birds.map((u, i) => (
                  <option key={i} value={birds.uid}>{u.name.spanish}</option>
                ))}
              </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Fecha de captura</Form.Label>
                <CustomInput
                  required
                  type="date"

                  // value={date}
                  // onChange={(e) => setDate(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Lugar de avistamiento</Form.Label>
                <CustomInput
                  type="text"
                  required
                  // value={place}
                  // onChange={(e) => setPlace(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type="file" />
              </Form.Group>

              <Button
                variant="primary mt-4"
                type="submit"
                disabled={disabledButton}
                onClick={() => {}}
              >
                Registrar
              </Button>
            </Form>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export { NewCapture };
