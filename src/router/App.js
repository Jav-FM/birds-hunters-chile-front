import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "../domain/Home";
import { Login } from "../domain/Login";
import { Register } from "../domain/Register";
import { Avepedia } from "../domain/Avepedia";
import { AvepediaDetail } from "../domain/Avepedia/AvepediaDetail";
import { UserHome } from "../domain/UserHome";
import { CustomNavbar } from "../components/CustomNavbar";
import { CustomFooter } from "../components/CustomFooter";
import { isLoginTokenValid } from "../utils/token";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../store/login";
import { loadingActions } from "../store/loading";
import { useNavigate } from "react-router-dom";

function App() {
  const { loginState } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoginTokenValid()) {
      dispatch(loadingActions.setLoading(true));
      dispatch(loginActions.logout());
      localStorage.removeItem("token");
      navigate("/");
    }
  }, []); // eslint-disable-line

  return (
    <div className="App">
      <CustomNavbar />
      <div id="main">
        <Routes>
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
            </React.Fragment>
          )}
        </Routes>
      </div>
      <CustomFooter />
    </div>
  );
}

export default App;
