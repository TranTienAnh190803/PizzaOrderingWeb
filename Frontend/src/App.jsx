import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Page/Login/LoginPage";
import RegisterPage from "./Page/Register/RegisterPage";
import HomePage from "./Page/Home/HomePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registration" element={<RegisterPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </>
      </BrowserRouter>
    </>
  );
}

export default App;
