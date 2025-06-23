import { useState } from "react";
import Footer from "../../Component/Footer";
import Navbar from "../../Component/Navbar";
import style from "./DMRegistration.module.css";
import UserService from "../../Service/UserService";
import { useNavigate } from "react-router-dom";

export default function DMRegistration() {
  document.title = "Delivery Man Registration";
  const navigate = useNavigate();
  const [registrationForm, setRegistrationForm] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    fullname: "",
    gender: true,
    address: "",
    dateOfBirth: null,
    password: "",
  });
  const [reEnterPassword, setReEnterPassowrd] = useState("");

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const parseValue = name === "gender" ? value === "true" : value;
    setRegistrationForm({ ...registrationForm, [name]: parseValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (UserService.isAdmin()) {
      if (registrationForm.password === reEnterPassword) {
        const token = localStorage.getItem("token");
        const response = await UserService.registerDeliveryMan(
          token,
          registrationForm
        );

        alert(response.message);
        if (response.statusCode === 200) {
          navigate("/admin/dm-mangement");
        }
      } else {
        alert("Re-entered Password Does Not Match");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className={style["wrapper"]}>
        <div className={`${style["dm-registration"]} mx-auto`}>
          <h1>
            <b>Delivery Man Registration</b>
          </h1>
          <hr />
          <form className="p-4" onSubmit={handleSubmit}>
            <div className={style["input-container"]}>
              <div className={style["input-box"]}>
                <div className={style["input-group"]}>
                  <p>
                    <b>Fullname: </b>
                  </p>
                  <input
                    type="text"
                    name="fullname"
                    className="form-control border border-secondary"
                    value={registrationForm.fullname}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className={style["input-group"]}>
                  <p>
                    <b>Username: </b>
                  </p>
                  <input
                    type="text"
                    name="username"
                    className="form-control border border-secondary"
                    value={registrationForm.username}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className={style["input-box"]}>
                <div className={style["input-group"]}>
                  <p>
                    <b>Email: </b>
                  </p>
                  <input
                    type="text"
                    name="email"
                    className="form-control border border-secondary"
                    value={registrationForm.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className={style["input-group"]}>
                  <p>
                    <b>Phone Number: </b>
                  </p>
                  <input
                    type="text"
                    name="phoneNumber"
                    className="form-control border border-secondary"
                    value={registrationForm.phoneNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className={style["input-box"]}>
                <div className={style["input-group"]}>
                  <p>
                    <b>Date Of Birth: </b>
                  </p>
                  <input
                    type="date"
                    name="dateOfBirth"
                    className="form-control border border-secondary"
                    value={registrationForm.dateOfBirth}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className={style["input-group"]}>
                  <p>
                    <b>Gender: </b>
                  </p>
                  <select
                    className="form-select border border-secondary"
                    name="gender"
                    value={registrationForm.gender}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="true">Male</option>
                    <option value="false">Female</option>
                  </select>
                </div>
                <div className={style["input-group"]}>
                  <p>
                    <b>Address: </b>
                  </p>
                  <input
                    type="text"
                    name="address"
                    className="form-control border border-secondary"
                    value={registrationForm.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className={style["input-box"]}>
                <div className={style["input-group"]}>
                  <p>
                    <b>Password: </b>
                  </p>
                  <input
                    type="password"
                    name="password"
                    className="form-control border border-secondary"
                    value={registrationForm.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className={style["input-box"]}>
                <div className={style["input-group"]}>
                  <p>
                    <b>Re-enter Password: </b>
                  </p>
                  <input
                    type="password"
                    name="passwordRepeat"
                    className="form-control border border-secondary"
                    value={reEnterPassword}
                    onChange={(e) => {
                      setReEnterPassowrd(e.target.value);
                    }}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="text-end">
              <button className="btn btn-success btn-lg">Register</button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
