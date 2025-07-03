import image from "../../../assets/AdminHome.jpg";
import style from "./AdminHome.module.css";

export default function AdminHome() {
  return (
    <>
      <div className={`${style["image-box"]} shadow`}>
        <img src={image} alt="deliveryMan" style={{ width: "100%" }} />
        <div className={style["home-content"]}>
          <h1 className="mb-5 text-center">
            <b>Welcome back, Admin.</b>
          </h1>
        </div>
      </div>
    </>
  );
}
