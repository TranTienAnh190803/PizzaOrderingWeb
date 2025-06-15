import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Page/Login/LoginPage";
import RegisterPage from "./Page/Register/RegisterPage";
import HomePage from "./Page/Home/HomePage";
import UserService from "./Service/UserService";
import ProfilePage from "./Page/UserProfile/ProfilePage";
import PasswordChangingPage from "./Page/PasswordChanging/PasswordChangingPage";
import DishesManagement from "./Page/DishesManagement/DishesManagement";
import PizzaAdding from "./Page/PizzaAdding/PizzaAdding";

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
                <Route
                  path="/password-changing"
                  element={<PasswordChangingPage />}
                />
              </>
            )}

            {UserService.isAdmin() && (
              <>
                <Route
                  path="/admin/dishes-management"
                  element={<DishesManagement />}
                />
                <Route path="/admin/pizza-adding" element={<PizzaAdding />} />
              </>
            )}
          </Routes>
        </>
      </BrowserRouter>
    </>
  );
}

export default App;
