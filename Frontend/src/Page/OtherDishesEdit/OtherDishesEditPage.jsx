import { useNavigate, useParams } from "react-router-dom";
import style from "./OtherDishesEditPage.module.css";
import { useEffect, useRef, useState } from "react";
import UserService from "../../Service/UserService";
import DishesService from "../../Service/DishesService";
import Navbar from "../../Component/Navbar";
import Footer from "../../Component/Footer";

export default function OtherDishesEditPage() {
  document.title = "Dish Editing";
  const { dishesId } = useParams();
  const navigate = useNavigate();
  const imageRef = useRef();
  const [dishesForm, setDishesForm] = useState({});
  const [imageUpload, setImageUpload] = useState(null);

  const fetchSelectedDish = async () => {
    if (UserService.isAuthenticated()) {
      const response = await DishesService.getSelectedDish(dishesId);

      if (response.statusCode === 200) {
        setDishesForm(response.dishesDTO);
      } else {
        alert(response.message);
      }
    }
  };

  useEffect(() => {
    fetchSelectedDish();
  }, []);

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

      const response = await DishesService.editDish(token, formData, dishesId);
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
            <b>Information</b>
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
                style={{ display: "none" }}
                accept="image/*"
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
                src={imageUpload ? imageUpload : dishesForm.imageBase64}
                className="shadow my-3"
                alt=""
              />
            </div>
            <div className="text-end p-4">
              <button className="btn btn-lg btn-warning">Edit</button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
