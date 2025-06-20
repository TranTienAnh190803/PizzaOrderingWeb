import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../Component/Navbar";
import style from "./OtherDishesAddingPage.module.css";
import { useRef, useState } from "react";
import defaultImage from "../../assets/DefaultImage.jpg";
import Footer from "../../Component/Footer";
import UserService from "../../Service/UserService";
import DishesService from "../../Service/DishesService";

export default function OtherDishesAddingPage() {
  const { dishesType } = useParams();
  const type = Number(dishesType);
  document.title = type === 0 ? "Drink Adding" : "Appetizer Adding";
  const navigate = useNavigate();
  const imageRef = useRef();
  const [dishesForm, setDishesForm] = useState({
    name: "",
    dishesType: type,
    description: "",
    discount: 0,
    price: 0,
    image: null,
  });
  const [imageUpload, setImageUpload] = useState(null);

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setDishesForm({ ...dishesForm, [name]: value });
  };

  const handleUploadImage = async (e) => {
    if (UserService.isAdmin()) {
      const token = localStorage.getItem("token");
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("imageFile", file);

      const response = await DishesService.uploadImage(token, formData);
      try {
        setImageUpload(URL.createObjectURL(response));
        setDishesForm({ ...dishesForm, image: file });
      } catch (error) {
        alert(error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (UserService.isAdmin()) {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("name", dishesForm.name);
      formData.append("description", dishesForm.description);
      formData.append("dishesType", dishesForm.dishesType);
      formData.append("discount", dishesForm.discount);
      formData.append("price", dishesForm.price);
      formData.append("image", dishesForm.image);

      const response = await DishesService.addDishes(token, formData);
      console.log(response);
      alert(response.message);
      if (response.statusCode === 200) {
        navigate("/admin/dishes-management");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className={style["wrapper"]}>
        <div className={`${style["dish-form"]} shadow my-5`}>
          <h1>
            <b>{type === 0 ? "Add Drink" : "Add Appetizer"}</b>
          </h1>
          <hr />
          <form onSubmit={handleSubmit}>
            <h4 className="mt-4">
              <b>- Basic Information: </b>
            </h4>
            <div className="p-4">
              <div className={`${style["input-container"]}`}>
                <div style={{ flexBasis: "50%" }}>
                  <p>
                    <b>Name: </b>
                  </p>
                  <input
                    type="text"
                    name="name"
                    className="form-control border-secondary"
                    value={dishesForm.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div style={{ flexBasis: "20%" }}>
                  <p>
                    <b>Discount (%): </b>
                  </p>
                  <input
                    type="number"
                    name="discount"
                    min={0}
                    max={100}
                    className="form-control border-secondary"
                    value={dishesForm.discount}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div style={{ flexBasis: "20%" }}>
                  <p>
                    <b>Price (VNĐ): </b>
                  </p>
                  <input
                    type="number"
                    name="price"
                    min={0}
                    className="form-control border-secondary"
                    value={dishesForm.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="my-5">
                <p>
                  <b>Description: </b>
                </p>
                <input
                  type="text"
                  name="description"
                  className="form-control border-secondary"
                  value={dishesForm.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <h4 className="mt-4">
              <b className="me-2">- Image: </b>
              <input
                type="file"
                name="image"
                accept="image/*"
                style={{ display: "none" }}
                ref={imageRef}
                onChange={handleUploadImage}
              />
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={() => {
                  imageRef.current.click();
                }}
              >
                Upload
              </button>
            </h4>
            <div className={`${style["image-box"]} text-center`}>
              <img
                src={imageUpload ? imageUpload : defaultImage}
                className="shadow my-3"
                alt=""
              />
            </div>
            <div className="text-end p-4">
              <button className="btn btn-lg btn-success">
                {type === 0 ? "Add Drink" : "Add Appetizer"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
