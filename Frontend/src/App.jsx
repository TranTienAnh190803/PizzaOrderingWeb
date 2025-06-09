import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Page/Login/LoginPage";
import RegisterPage from "./Page/Register/RegisterPage";
import HomePage from "./Page/Home/HomePage";
import UserService from "./Service/UserService";
import ProfilePage from "./Page/UserProfile/ProfilePage";

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

            {UserService.isAuthenticated() && (
              <>
                <Route path="/profile" element={<ProfilePage />} />
              </>
            )}
          </Routes>
        </>
      </BrowserRouter>
    </>
  );
}

export default App;
