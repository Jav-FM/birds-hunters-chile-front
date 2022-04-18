import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "../domain/Home";
import { Login } from "../domain/Login";
import { Register } from "../domain/Register";
import { Avepedia } from "../domain/Avepedia";
import { AvepediaDetail } from "../domain/Avepedia/AvepediaDetail";
import { UserHome } from "../domain/UserHome";
import { MyCaptures } from "../domain/MyCaptures";
import { NewCapture } from "../domain/NewCapture";
import { CustomNavbar } from "../components/CustomNavbar";
import { CustomFooter } from "../components/CustomFooter";
import {CustomSidebar } from "../components/CustomSidebar"
import { isLoginTokenValid } from "../utils/token";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../store/login";
import { userPhotosActions } from "../store/userPhotos";
import { loadingActions } from "../store/loading";
import { useNavigate } from "react-router-dom";

function App() {
  const { loginState } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mainPadding, setMainPadding] = useState("0")

  useEffect(() => {
    if (!isLoginTokenValid()) {
      dispatch(loadingActions.setLoading(true));
      dispatch(loginActions.logout());
      dispatch(userPhotosActions.setUserPhotos([]))
      localStorage.removeItem("token");
      navigate("/");
    }
  }, []); // eslint-disable-line

  useEffect(() => {
    if(loginState){ setMainPadding("200px") } else {setMainPadding("0")}
  }, [loginState])

  return (
    <div className="App">
      <CustomNavbar/>
      <div id="main">
        {loginState &&
          <CustomSidebar id="main-sidebar" style={{width: '200px'}}/>
        }
        <div id="main-routes"  style={{paddingTop: '56px', paddingLeft: `${mainPadding}`}}>
        <Routes >
          {!loginState || !isLoginTokenValid() ? (
            <React.Fragment>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/avepedia" element={<Avepedia />} />
              <Route path="/avepedia/:id" element={<AvepediaDetail />} />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Route path="/" element={<UserHome />} />
              <Route path="/avepedia" element={<Avepedia />} />
              <Route path="/avepedia/:id" element={<AvepediaDetail />} />
              <Route path="/mycaptures" element={<MyCaptures />} />
              <Route path="/newcapture" element={<NewCapture />} />
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
