import {
  FaAngleDown,
  FaCalendar,
  FaLock,
  FaMailBulk,
  FaMapPin,
  FaPhone,
  FaUser,
} from "react-icons/fa";
import style from "./RegisterPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import UserService from "../../Service/UserService";

export default function RegisterPage() {
  document.title = "Registration";
  const navigate = useNavigate();
  const [registrationForm, setRegistrationForm] = useState({});
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const parseValue = name === "gender" ? value === "true" : value;
    setRegistrationForm({ ...registrationForm, [name]: parseValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (registrationForm.password === confirmPassword) {
      const response = await UserService.register(registrationForm);

      alert(response.message);
      if (response.statusCode === 200) {
        navigate("/login");
      }
    } else {
      alert("Re-entered password does not match");
    }
  };

  return (
    <>
      <div className={style["registration"]}>
        <div className={style["wrapper"]}>
          <form onSubmit={handleSubmit}>
            <b>
              <h1>Registration</h1>
            </b>

            <div className={style["input-container"]}>
              <div className={style["input-box"]}>
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={registrationForm.username}
                  onChange={handleInputChange}
                  required
                />
                <FaUser className={style["icon"]} />
              </div>
              <div className={style["input-box"]}>
                <input
                  type="text"
                  placeholder="Fullname"
                  name="fullname"
                  value={registrationForm.fullname}
                  onChange={handleInputChange}
                  required
                />
                <FaUser className={style["icon"]} />
              </div>
            </div>
            {/*  */}
            <div className={style["input-container"]}>
              <div className={style["input-box"]}>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={registrationForm.email}
                  onChange={handleInputChange}
                  required
                />
                <FaMailBulk className={style["icon"]} />
              </div>
              <div className={style["input-box"]}>
                <input
                  type="text"
                  placeholder="Phone Number"
                  name="phoneNumber"
                  value={registrationForm.phoneNumber}
                  onChange={handleInputChange}
                  required
                />
                <FaPhone className={style["icon"]} />
              </div>
            </div>
            <div className={style["input-container"]}>
              <div className={style["input-box2"]}>
                <input
                  type="text"
                  placeholder="Address"
                  name="address"
                  value={registrationForm.address}
                  onChange={handleInputChange}
                  required
                />
                <FaMapPin className={style["icon"]} />
              </div>
            </div>

            {/*  */}
            <div className={style["input-container"]}>
              <div className={style["input-box"]}>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={registrationForm.dateOfBirth}
                  onChange={handleInputChange}
                  required
                />
                <FaCalendar className={style["icon"]} />
              </div>
              <div className={style["input-box"]}>
                <select
                  name="gender"
                  value={registrationForm.gender}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" hidden disabled selected>
                    Gender
                  </option>
                  <option value={true}>Male</option>
                  <option value={false}>Female</option>
                </select>
                <FaAngleDown
                  className={style["icon"]}
                  style={{ pointerEvents: "none" }}
                />
              </div>
            </div>
            {/*  */}
            <div className={style["input-container"]}>
              <div className={style["input-box"]}>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={registrationForm.password}
                  onChange={handleInputChange}
                  required
                />
                <FaLock className={style["icon"]} />
              </div>
              <div className={style["input-box"]}>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                  name="confirmPassword"
                  required
                />
                <FaLock className={style["icon"]} />
              </div>
            </div>

            <div className="mt-5 mb-3">
              <label>
                <input
                  type="checkbox"
                  className="form-check-input me-2"
                  required
                />{" "}
                I confirm that the information I have provided is correct.
              </label>
            </div>

            <button type="submit">Register</button>

            <hr />

            <div className={style["login"]}>
              <p>
                Already have an account.
                <Link className={style["to-login"]} to={"/login"}>
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
