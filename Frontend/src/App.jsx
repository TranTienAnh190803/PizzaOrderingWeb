import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Page/Login/LoginPage";
import RegisterPage from "./Page/Register/RegisterPage";
import HomePage from "./Page/Home/HomePage";
import UserService from "./Service/UserService";
import ProfilePage from "./Page/UserProfile/ProfilePage";
import PasswordChangingPage from "./Page/PasswordChanging/PasswordChangingPage";
import DishesManagement from "./Page/DishesManagement/DishesManagement";
import PizzaAddingPage from "./Page/PizzaAdding/PizzaAddingPage";
import PizzaEditPage from "./Page/PizzaEdit/PizzaEditPage";
import OtherDishesAddingPage from "./Page/OtherDishesAdding/OtherDishesAddingPage";
import OtherDishesEditPage from "./Page/OtherDishesEdit/OtherDishesEditPage";

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
                <Route
                  path="/admin/pizza-adding"
                  element={<PizzaAddingPage />}
                />
                <Route
                  path="/admin/pizza-edit/:pizzaId"
                  element={<PizzaEditPage />}
                />
                <Route
                  path="/admin/dishes-adding/:dishesType"
                  element={<OtherDishesAddingPage />}
                />
                <Route
                  path="/admin/dishes-edit/:dishesId"
                  element={<OtherDishesEditPage />}
                />
              </>
            )}
          </Routes>
        </>
      </BrowserRouter>
    </>
  );
}

export default App;
