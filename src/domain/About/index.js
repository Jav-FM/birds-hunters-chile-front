import React from "react";
import "./About.scss";
import { HeaderWithPhotos } from "../../components/HeaderWithPhotos";
import { useSelector } from "react-redux";
import { LoadingScreen } from "../../components/LoadingScreen";

const About = () => {
  const loading = useSelector((state) => state.loading.loading);

  return (
    <React.Fragment>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div id="about" className="d-flex flex-column align-items-center">
          <HeaderWithPhotos title="Sobre Birds Hunters" />

          <div className="container my-5">
            <p className="info">
              Birds Hunters Chile nace como una iniciativa que invita a los
              fotógrafos (profesionales o amateurs) a coleccionar fotografías de
              todas las aves nativas que anidan en Chile. La aplicación
              proporciona una "Avepedia" con información relativa a las
              distintas especies que se pueden encontrar en el territorio
              nacional, a la cual es posible acceder sin crear una cuenta. Si el
              usuario decide registrarse en la aplicación, podrá acceder a un
              servicio de guardado de imágenes, las cuales se asociarán a la
              especie correspondiente dentro de la Avepedia. Con este proyecto,
              se espera promover la conservación y el conocimiento acerca del
              gran número de ejemplares que conviven con nosotros en territorio
              chileno.
            </p>
            <p className="info">
              Una vez que el usuario ingrese a su cuenta personal, podrá acceder
              a la sección "Mis capturas" en la cual tendrá una galería con las
              fotografías que ha subido a la aplicación. Si acude a la Avepedia
              desde su cuenta, podrá identificar qué especies tiene entre sus
              capturas, y cuales le faltan por capturar.
            </p>
            <p className="info">
              Se espera a futuro desarrollar nuevas funcionalidades en la
              aplicación, las cuales permitan la interacción entre usuarios,
              pudiendo visitar las galerías de otros fotógrafos y comentar sus
              fotografías. También se incorporará una función para poder
              reportar aquellas fotografías que no pertenezcan a la especie que
              se indica, y un administrador estará a cargo de monitorear las
              imágenes antes de que sean públicas para evitar el mal uso de la
              aplicación.
            </p>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export { About };
