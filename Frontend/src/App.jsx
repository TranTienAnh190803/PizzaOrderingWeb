import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
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
import DMManagement from "./Page/DeliveryManManagement/DMManagement";
import DMRegistration from "./Page/DeliveryManRegistration/DMRegistration";
import DMProfile from "./Page/DeliveryManProfile/DMProfile";
import CartPage from "./Page/Cart/CartPage";
import ScrollToTop from "./Component/ScrollToTop";
import UserOrdersPage from "./Page/UserOrders/UserOrdersPage";
import OrdersMangementPage from "./Page/OrdersManagement/OrdersManagementPage";

function App() {
  const handleExpiredToken = () => {
    if (UserService.isAuthenticated()) {
      const token = localStorage.getItem("token");

      if (UserService.isTokenExpired(token)) {
        UserService.logout();
        alert("Login Session Expired");
        window.location.href = "/login";
      }
    }
  };

  useEffect(() => {
    handleExpiredToken();
  }, []);

  return (
    <>
      <BrowserRouter>
        <>
          <ScrollToTop />
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
                <Route
                  path="/admin/dm-registration"
                  element={<DMRegistration />}
                />
                <Route
                  path="/admin/orders-management"
                  element={<OrdersMangementPage />}
                />
                <Route path="/admin/dm-info/:dmId" element={<DMProfile />} />
                <Route path="/admin/dm-mangement" element={<DMManagement />} />
              </>
            )}

            {UserService.isUser() && (
              <>
                <Route path="/user/cart" element={<CartPage />} />
                <Route path="/user/orders" element={<UserOrdersPage />} />
              </>
            )}

            <Route path="*" element={<Navigate to={"/"} />} />
          </Routes>
        </>
      </BrowserRouter>
    </>
  );
}

export default App;
