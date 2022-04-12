import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "../domain/Home";
import { Login } from "../domain/Login";
import { Register } from "../domain/Register";
import { Avepedia } from "../domain/Avepedia";
import { CustomNavbar } from "../components/CustomNavbar";
import { CustomFooter } from "../components/CustomFooter";

function App() {
  return (
    <div className="App">
      <CustomNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/avepedia" element={<Avepedia />} />
      </Routes>
      <CustomFooter />
    </div>
  );
}

export default App;
