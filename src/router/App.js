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
import {MyProfile} from "../domain/MyProfile"
import { CustomNavbar } from "../components/CustomNavbar";
import { CustomFooter } from "../components/CustomFooter";
import { CustomSidebar } from "../components/CustomSidebar";
import { isLoginTokenValid } from "../utils/token";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../store/login";
import { userPhotosActions } from "../store/userPhotos";
import { loadingActions } from "../store/loading";
import { initializeApp } from "firebase/app";

function App() {
  const { loginState } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mainPadding, setMainPadding] = useState("0");

  initializeApp({
    apiKey: "AIzaSyAvEvlr_1VViXYfmSus3DZp9bOHVcUtF4M",
    authDomain: "birdshunters-chile.firebaseapp.com",
    projectId: "birdshunters-chile",
    storageBucket: "birdshunters-chile.appspot.com",
    messagingSenderId: "847126193909",
    appId: "1:847126193909:web:5c1974dad17d765b8e87bc"
  });

  useEffect(() => {
    if (!isLoginTokenValid()) {
      dispatch(loadingActions.setLoading(true));
      dispatch(loginActions.logout());
      dispatch(userPhotosActions.setUserPhotos([]));
      localStorage.removeItem("token");
      navigate("/");
    }
  }, []); // eslint-disable-line

  useEffect(() => {
    if (loginState) {
      setMainPadding("200px");
    } else {
      setMainPadding("0");
    }
  }, [loginState]);

  return (
    <div className="App">
      <CustomNavbar />
      <div id="main">
        {loginState && (
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
                <Route path="/mycapturesdetail/:id" element={<MyCapturesDetail />} />
                {["/newcapture", "/newcapture/:bird_id"].map((page) => (
                  <Route path={page} element={<NewCapture />} />
                ))}
                <Route path="/editcapture/:bird_id/:capture_id" element={<EditCapture />} />
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
