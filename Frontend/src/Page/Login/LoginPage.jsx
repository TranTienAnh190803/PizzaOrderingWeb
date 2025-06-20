import { FaLock, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import style from "./LoginPage.module.css";
import { useEffect, useState } from "react";
import UserService from "../../Service/UserService";

export default function LoginPage() {
  document.title = "Login";
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({});
  const [logingin, setLogingin] = useState(false);

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLogingin(true);

    const response = await UserService.login(loginForm);
    console.log(response);
    if (response.statusCode === 200) {
      localStorage.setItem("token", response.token.token);
      localStorage.setItem("role", response.token.role);
      navigate("/");
      window.location.reload();
    } else {
      alert(response.message);
    }

    setLogingin(false);
  };

  return (
    <>
      <div className={`${style["login"]}`}>
        <div className={style["wrapper"]}>
          <form onSubmit={handleSubmit}>
            <h1>
              <b>Login</b>
            </h1>
            <div className={style["input-box"]}>
              <input
                type="text"
                placeholder="Username"
                name="username"
                value={loginForm.username}
                onChange={handleInputChange}
                required
              />
              <FaUser className={style["icon"]} />
            </div>
            <div className={style["input-box"]}>
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={loginForm.password}
                onChange={handleInputChange}
                required
              />
              <FaLock className={style["icon"]} />
            </div>

            <div className={style["remember-pass"]}>
              <label>
                <input type="checkbox" name="Remember" /> Remember me
              </label>
              <a href="#">Forgot password?</a>
            </div>

            <button type="submit" disabled={logingin}>
              Login
            </button>

            <hr />

            <div className={style["register"]}>
              <p>
                Don't have an account?{" "}
                <Link className={style["to-register"]} to={"/registration"}>
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
