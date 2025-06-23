import { Link, useNavigate } from "react-router-dom";
import UserService from "../Service/UserService";
import {
  FaLock,
  FaMoneyBillAlt,
  FaNewspaper,
  FaPizzaSlice,
  FaShoppingCart,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import defaultAvatar from "../assets/DefaultAvatar.jpg";

export default function Navbar({ newAvatar }) {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [userAvatar, setUserAvatar] = useState(null);

  const handleLogout = () => {
    UserService.logout();
    navigate("/login");
  };

  const fetchUserInfo = async () => {
    if (UserService.isAuthenticated()) {
      const token = localStorage.getItem("token");
      const response = await UserService.getProfile(token);

      if (response.statusCode === 200) {
        setUserInfo(response.userDTO);
      }
    }
  };

  const fetchAvatar = async () => {
    if (UserService.isAuthenticated()) {
      const token = localStorage.getItem("token");
      const response = await UserService.getAvatar(token);

      if (response !== null) {
        setUserAvatar(URL.createObjectURL(response));
      }
    }
  };

  useEffect(() => {
    fetchUserInfo();
    fetchAvatar();
  }, []);

  useEffect(() => {
    fetchAvatar();
  }, [newAvatar]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top py-3 fs-6">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Logo */}
        <Link className="navbar-brand ms-5 fs-3 fw-bold" to="/">
          {UserService.isAdmin() ? "Admin" : "TTAPizza"}
        </Link>

        {/* Navigation links */}
        <div
          className="collapse navbar-collapse justify-content-center fs-5"
          id="navbarSupportedContent"
        >
          {UserService.isAdmin() ? (
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item mx-2">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link className="nav-link" to="/admin/dishes-management">
                  Menu
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link className="nav-link" to="/">
                  Orders
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link className="nav-link" to="/admin/dm-mangement">
                  Delivery Man
                </Link>
              </li>
            </ul>
          ) : (
            ""
          )}
        </div>

        {/* Authenticated User: Profile & Cart */}
        {UserService.isAuthenticated() ? (
          <div className="d-flex align-items-center gap-2 me-5">
            {/* Profile Dropdown */}
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-outline-primary btn-lg dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FaUser />
              </button>
              <ul
                className="dropdown-menu dropdown-menu-end p-0 shadow rounded mt-3"
                style={{ minWidth: "350px" }}
              >
                <li
                  className="bg-light px-3 py-3 border-bottom d-flex"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="me-3" style={{ width: "30%" }}>
                    <img
                      src={userAvatar ? userAvatar : defaultAvatar}
                      alt=""
                      className="rounded-circle border border-dark"
                      style={{ width: "100%", aspectRatio: "1/1" }}
                    />
                  </div>
                  <div>
                    <strong className="fs-4 d-block">
                      {userInfo.fullname}
                    </strong>
                    <span className="text-muted small">
                      {userInfo.username}
                    </span>
                  </div>
                </li>
                <li>
                  <Link
                    className="dropdown-item d-flex align-items-center gap-3 px-3 py-2"
                    to="/profile"
                  >
                    <FaUser />
                    Profile
                  </Link>
                </li>
                {UserService.isUser() && (
                  <li>
                    <Link
                      className="dropdown-item d-flex align-items-center gap-3 px-3 py-2"
                      to="/"
                    >
                      <FaPizzaSlice />
                      Order
                    </Link>
                  </li>
                )}
                {UserService.isDeliveryMan() && (
                  <li>
                    <Link
                      className="dropdown-item d-flex align-items-center gap-3 px-3 py-2"
                      to="/"
                    >
                      <FaMoneyBillAlt />
                      Salary
                    </Link>
                  </li>
                )}
                <li>
                  <Link
                    className="dropdown-item d-flex align-items-center gap-3 px-3 py-2"
                    to="/password-changing"
                  >
                    <FaLock />
                    Change Password
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider my-1" />
                </li>
                <li>
                  <button
                    className="dropdown-item text-danger d-flex align-items-center gap-3 px-3 py-2"
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt />
                    Logout
                  </button>
                </li>
              </ul>
            </div>

            {UserService.isUser() && (
              <Link className="btn btn-lg btn-outline-danger" to="/cart">
                <FaShoppingCart />
              </Link>
            )}
          </div>
        ) : (
          // Guest User: Login & Cart (redirects to login)
          <div className="d-flex align-items-center gap-2 me-5">
            <Link className="btn btn-lg btn-outline-primary" to="/login">
              <FaUser />
            </Link>
            <Link className="btn btn-lg btn-outline-danger" to="/login">
              <FaShoppingCart />
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
