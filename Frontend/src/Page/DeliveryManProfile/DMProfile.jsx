import { useParams } from "react-router-dom";
import Footer from "../../Component/Footer";
import Navbar from "../../Component/Navbar";
import style from "./DMProfile.module.css";
import DefaultAvatar from "../../assets/DefaultAvatar.jpg";
import { useEffect, useState } from "react";
import UserService from "../../Service/UserService";

export default function DMProfile() {
  document.title = "Delivery Man Profile";
  const { dmId } = useParams();
  const [dmInfo, setDmInfo] = useState({
    userId: null,
    username: "",
    email: "",
    phoneNumber: null,
    fullname: "",
    gender: null,
    address: "",
    dateOfBirth: null,
    avatarBase64: null,
  });

  const fetchDmInfo = async () => {
    if (UserService.isAdmin()) {
      const token = localStorage.getItem("token");
      const response = await UserService.getSelectedDeliveryMan(token, dmId);
      if (response.statusCode === 200) {
        setDmInfo(response.userDTO);
      } else {
        alert(response.message);
      }
    }
  };

  useEffect(() => {
    fetchDmInfo();
  }, []);

  return (
    <>
      <Navbar />
      <div className={style["wrapper"]}>
        <div className={`${style["dm"]} mx-auto shadow`}>
          <h1>
            <b>Delivery Man Profile</b>
          </h1>
          <hr />
          <div className={`${style["dm-info"]} my-5`}>
            <div style={{ width: "40%" }}>
              <img
                src={dmInfo.avatarBase64 ? dmInfo.avatarBase64 : DefaultAvatar}
                className="rounded-circle border border-dark"
                alt="avatar"
                style={{ width: "100%", aspectRatio: "1/1" }}
              />
            </div>
            <div className={style["input-group"]}>
              <div className="mb-4">
                <p>
                  <b>User Id: </b>
                </p>
                <input
                  type="text"
                  name="userId"
                  className="form-control border-secondary"
                  value={dmInfo.userId}
                  disabled
                  readOnly
                />
              </div>
              <div className="my-4">
                <p>
                  <b>Username: </b>
                </p>
                <input
                  type="text"
                  name="username"
                  className="form-control border-secondary"
                  value={dmInfo.username}
                  disabled
                  readOnly
                />
              </div>
              <div className="my-4">
                <p>
                  <b>Fullname: </b>
                </p>
                <input
                  type="text"
                  name="fullname"
                  className="form-control border-secondary"
                  value={dmInfo.fullname}
                  disabled
                  readOnly
                />
              </div>
              <div className="my-4">
                <p>
                  <b>Email: </b>
                </p>
                <input
                  type="text"
                  name="email"
                  className="form-control border-secondary"
                  value={dmInfo.email}
                  disabled
                  readOnly
                />
              </div>
              <div className="my-4">
                <p>
                  <b>Phone Number: </b>
                </p>
                <input
                  type="text"
                  name="phoneNumber"
                  className="form-control border-secondary"
                  value={dmInfo.phoneNumber}
                  disabled
                  readOnly
                />
              </div>
              <div className="my-4">
                <p>
                  <b>Date Of Birth: </b>
                </p>
                <input
                  type="date"
                  name="dateOfBirth"
                  className="form-control border-secondary"
                  value={dmInfo.dateOfBirth}
                  disabled
                  readOnly
                />
              </div>
              <div className="my-4">
                <p>
                  <b>Gender: </b>
                </p>
                <input
                  type="text"
                  name="gender"
                  className="form-control border-secondary"
                  value={dmInfo.gender ? "Male" : "Female"}
                  disabled
                  readOnly
                />
              </div>
              <div className="mt-4">
                <p>
                  <b>Address: </b>
                </p>
                <input
                  type="text"
                  name="address"
                  className="form-control border-secondary"
                  value={dmInfo.address}
                  disabled
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
