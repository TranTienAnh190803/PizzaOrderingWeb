import { useState } from "react";
import Navbar from "../../Component/Navbar";
import Sidebar from "../../Component/Sidebar";
import style from "./PasswordChangingPage.module.css";
import UserService from "../../Service/UserService";
import Footer from "../../Component/Footer";

export default function PasswordChangingPage() {
  const [passwordForm, setPasswordForm] = useState({});

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPasswordForm({ ...passwordForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (UserService.isAuthenticated()) {
      const token = localStorage.getItem("token");
      const response = await UserService.changePassword(token, passwordForm);
      alert(response.message);

      if (response.statusCode === 200) {
        window.location.reload();
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className={style["wrapper"]}>
        <Sidebar />
        <div className={`${style["change-password"]} shadow`}>
          <h1>
            <b>Change Password</b>
          </h1>
          <hr />
          <form onSubmit={handleSubmit}>
            <div className={style["form-container"]}>
              <div className={style["password"]}>
                <p>
                  <b>Old Password:</b>
                </p>
                <input
                  type="password"
                  name="oldPassword"
                  className="form-control border border-secondary"
                  value={passwordForm.oldPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className={style["password"]}>
                <p>
                  <b>New Password:</b>
                </p>
                <input
                  type="password"
                  name="newPassword"
                  className="form-control border border-secondary"
                  value={passwordForm.newPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className={style["password"]}>
                <p>
                  <b>Confirm Password:</b>
                </p>
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-control border border-secondary"
                  value={passwordForm.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className={style["btn-box"]}>
              <button className="btn btn-success btn-lg">
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
