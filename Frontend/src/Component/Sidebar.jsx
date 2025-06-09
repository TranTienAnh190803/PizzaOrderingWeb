import { useEffect, useState } from "react";
import defaultAvatar from "../assets/DefaultAvatar.jpg";
import UserService from "../Service/UserService";
import { Link, useNavigate } from "react-router-dom";
import {
  FaLock,
  FaMoneyBillAlt,
  FaPizzaSlice,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";

export default function Sidebar() {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState(null);
  const [profile, setProfile] = useState({});

  const fetchProfile = async () => {
    if (UserService.isAuthenticated()) {
      const token = localStorage.getItem("token");
      const response = await UserService.getProfile(token);
      if (response.statusCode === 200) {
        setProfile(response.userDTO);
      }
    }
  };

  const fetchUserAvatar = async () => {
    if (UserService.isAuthenticated()) {
      const token = localStorage.getItem("token");
      const response = await UserService.getAvatar(token);
      if (response !== null) {
        setAvatar(URL.createObjectURL(response));
      }
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    fetchUserAvatar();
  }, [avatar]);

  const handleLogout = () => {
    UserService.logout();
    navigate("/login");
  };

  return (
    <div
      className="list-group bg-white shadow"
      style={{
        minWidth: "25%",
        height: "fit-content",
        borderRadius: "30px",
        overflow: "hidden",
      }}
    >
      <div className="p-3 d-flex align-items-center gap-3">
        <img
          src={avatar ? avatar : defaultAvatar}
          alt="Avatar"
          className="rounded-circle border border-dark"
          style={{ width: "80px", height: "80px", objectFit: "cover" }}
        />

        <div>
          <h5 className="mb-0 fw-bold">{profile.fullname}</h5>
          <small className="text-muted">{profile.username}</small>
        </div>
      </div>

      <hr className="my-1" />
      <Link
        to="/profile"
        className="list-group-item list-group-item-action border-0"
      >
        <FaUser className="me-3" />
        Profile
      </Link>
      {UserService.isDeliveryMan() ? (
        <Link
          to="/delivery/salary"
          className="list-group-item list-group-item-action border-0"
        >
          <FaMoneyBillAlt className="me-3" />
          Salary
        </Link>
      ) : UserService.isUser() ? (
        <Link
          to="/user/order"
          className="list-group-item list-group-item-action border-0"
        >
          <FaPizzaSlice className="me-3" />
          Order
        </Link>
      ) : (
        ""
      )}
      <Link
        to="/change-password"
        className="list-group-item list-group-item-action border-0"
      >
        <FaLock className="me-3" />
        Change Password
      </Link>

      <hr className="my-1" />
      <button
        className="list-group-item list-group-item-action border-0 text-danger"
        onClick={handleLogout}
      >
        <FaSignOutAlt className="me-3" />
        Logout
      </button>
    </div>
  );
}
