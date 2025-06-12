import { useEffect, useRef, useState } from "react";
import Navbar from "../../Component/Navbar";
import Sidebar from "../../Component/Sidebar";
import defaultAvatar from "../../assets/DefaultAvatar.jpg";
import style from "./ProfilePage.module.css";
import UserService from "../../Service/UserService";
import { useNavigate } from "react-router-dom";
import Footer from "../../Component/Footer";

export default function ProfilePage() {
  document.title = "Profile";
  const navigate = useNavigate();
  const fileInputRef = useRef();
  const [avatar, setAvatar] = useState(null);
  const [profile, setProfile] = useState({});

  const fetchUserAvatar = async () => {
    if (UserService.isAuthenticated()) {
      const token = localStorage.getItem("token");
      const response = await UserService.getAvatar(token);
      if (response !== null) {
        setAvatar(URL.createObjectURL(response));
      }
    }
  };

  const fetchProfile = async () => {
    if (UserService.isAuthenticated()) {
      const token = localStorage.getItem("token");
      const response = await UserService.getProfile(token);
      if (response.statusCode === 200) {
        setProfile(response.userDTO);
      } else {
        alert(response.message);
      }
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchUserAvatar();
  }, []);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const parseValue = name === "gender" ? value === "true" : value;
    setProfile({ ...profile, [name]: parseValue });
  };

  const handleAvatarChange = async (e) => {
    if (UserService.isAuthenticated()) {
      const imageFile = e.target.files[0];
      const token = localStorage.getItem("token");
      const response = await UserService.uploadAvatar(token, imageFile);

      alert(response.message);
      if (response.statusCode === 200) {
        fetchUserAvatar();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (UserService.isAuthenticated()) {
      const token = localStorage.getItem("token");
      const response = await UserService.editProfile(token, profile);
      console.log(response);
      if (response.statusCode === 200) {
        alert(response.message);
        window.location.reload();
      } else {
        alert(response.message);
      }
    }
  };

  return (
    <>
      <Navbar newAvatar={avatar} />
      <div className={style["wrapper"]}>
        <Sidebar newAvatar={avatar} />
        <div className={`${style["profile"]} shadow`}>
          <h1>
            <b>Profile</b>
          </h1>
          <hr />
          <form onSubmit={handleSubmit}>
            <div className={style["form-container1"]}>
              <div className={style["image"]}>
                <img
                  src={avatar ? avatar : defaultAvatar}
                  alt=""
                  className="rounded-circle"
                  onClick={handleImageClick}
                />
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleAvatarChange}
                />
              </div>
              <div className={style["user-info"]}>
                <div className={style["info"]}>
                  <label>
                    <b>Username: </b>
                  </label>
                  <input
                    className="form-control border-dark bg-secondary text-light"
                    type="text"
                    name="username"
                    value={profile.username}
                    readOnly
                  />
                </div>
                <div className={style["info"]}>
                  <label>
                    <b>Fullname: </b>
                  </label>
                  <input
                    className="form-control border-secondary"
                    type="text"
                    name="fullname"
                    value={profile.fullname}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={style["info"]}>
                  <label>
                    <b>Email: </b>
                  </label>
                  <input
                    className="form-control border-secondary"
                    type="text"
                    name="email"
                    value={profile.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={style["info"]}>
                  <label>
                    <b>Phone Number: </b>
                  </label>
                  <input
                    className="form-control border-secondary"
                    type="text"
                    name="phoneNumber"
                    value={profile.phoneNumber}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className={style["form-container2"]}>
              <div className={style["gender"]}>
                <p>
                  <b>Gender: </b>
                </p>
                <select
                  className={`${style["combo-box"]} form-select border-secondary`}
                  name="gender"
                  onChange={handleInputChange}
                >
                  <option value="true" selected={profile.gender === true}>
                    Male
                  </option>
                  <option value="false" selected={profile.gender === false}>
                    Female
                  </option>
                </select>
              </div>
              <div className={style["birth"]}>
                <p>
                  <b>Date Of Birth: </b>
                </p>
                <input
                  className="form-control border-secondary"
                  type="date"
                  name="dateOfBirth"
                  value={profile.dateOfBirth}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className={style["form-container3"]}>
              <p>
                <b>Address: </b>
              </p>
              <input
                className="form-control border-secondary"
                type="text"
                name="address"
                value={profile.address}
                onChange={handleInputChange}
              />
            </div>
            <div className={style["btn-box"]}>
              <button
                type="submit"
                className="btn btn-success btn-lg"
                name="update"
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
