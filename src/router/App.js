import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Home } from "../domain/Home";
import { Login } from "../domain/Login";
import { Register } from "../domain/Register";
import { Avepedia } from "../domain/Avepedia";
import { AvepediaDetail } from "../domain/Avepedia/AvepediaDetail";
import { UserHome } from "../domain/UserHome";
import { MyCaptures } from "../domain/MyCaptures";
import { MyCapturesDetail } from "../domain/MyCaptures/MyCapturesDetail";
import { NewCapture } from "../domain/NewCapture";
import { EditCapture } from "../domain/EditCapture";
import { MyProfile } from "../domain/MyProfile";
import { CustomNavbar } from "../components/CustomNavbar";
import { CustomFooter } from "../components/CustomFooter";
import { CustomSidebar } from "../components/CustomSidebar";
import { isLoginTokenValid } from "../utils/token";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../store/login";
import { userPhotosActions } from "../store/userPhotos";
import { loadingActions } from "../store/loading";

function App() {
  const { loginState } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mainPadding, setMainPadding] = useState("0");

   //Validación continua de token, en caso de estar vencido se elimina de localStorage y se "vacía" redux
  useEffect(() => {
    if (localStorage.getItem("token") && !isLoginTokenValid()) {
      dispatch(loadingActions.setLoading(true));
      dispatch(loginActions.logout());
      dispatch(userPhotosActions.setUserPhotos([]));
      localStorage.removeItem("token");
      navigate("/");
    }
  }, []); // eslint-disable-line 

  //Ajuste en padding del body en caso de que el usuario esté logueado (por sidebar)
  useEffect(() => {
    if (loginState && localStorage.getItem("token")) {
      setMainPadding("200px");
    } else {
      setMainPadding("0");
    }
  }, [loginState]); // eslint-disable-line 

  //Devuelvo las rutas según el estado de login y la validación de token
  return (
    <div className="App">
      <CustomNavbar />
      <div id="main">
        {(loginState && isLoginTokenValid()) && (
          <CustomSidebar id="main-sidebar" style={{ width: "200px" }} />
        )}
        <div
          id="main-routes"
          style={{ paddingTop: "56px", paddingLeft: `${mainPadding}` }}
        >
          <Routes>
            {!loginState || !isLoginTokenValid() ? (
              <React.Fragment>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/avepedia" element={<Avepedia />} />
                <Route path="/avepedia/:id" element={<AvepediaDetail />} />
                <Route path="*" element={<Home />} />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Route path="/" element={<UserHome />} />
                <Route path="/avepedia" element={<Avepedia />} />
                <Route path="/avepedia/:id" element={<AvepediaDetail />} />
                <Route path="/mycaptures" element={<MyCaptures />} />
                <Route
                  path="/mycapturesdetail/:id"
                  element={<MyCapturesDetail />}
                />
                {["/newcapture", "/newcapture/:bird_id"].map((page, i) => (
                  <Route path={page} element={<NewCapture />} key={i} />
                ))}
                <Route
                  path="/editcapture/:bird_id/:capture_id"
                  element={<EditCapture />}
                />
                <Route path="/myprofile" element={<MyProfile />} />
                <Route path="*" element={<UserHome />} />
              </React.Fragment>
            )}
          </Routes>
        </div>
      </div>
      <CustomFooter />
    </div>
  );
}

export default App;
