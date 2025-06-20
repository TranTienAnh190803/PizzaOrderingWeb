import { useRef, useState } from "react";
import Navbar from "../../Component/Navbar";
import style from "./PizzaAddingPage.module.css";
import defaultImage from "../../assets/DefaultImage.jpg";
import Footer from "../../Component/Footer";
import UserService from "../../Service/UserService";
import DishesService from "../../Service/DishesService";
import { useNavigate } from "react-router-dom";

export default function PizzaAddingPage() {
  document.title = "Pizza Adding";
  const navigate = useNavigate();
  const imageRef = useRef();
  const [prices, setPrice] = useState([
    { size: "Small", enum: 0, checkBox: false, price: 0 },
    { size: "Medium", enum: 1, checkBox: false, price: 0 },
    { size: "Large", enum: 2, checkBox: false, price: 0 },
    { size: "Extra Large", enum: 3, checkBox: false, price: 0 },
  ]);
  const [pizzaForm, setPizzaForm] = useState({
    pizzaName: "",
    pizzaDescription: "",
    discount: 0,
    image: null,
  });
  const [image, setImage] = useState(null);

  const handleCheckBox = (e, i) => {
    const check = e.target.checked;

    setPrice((prevPrices) => {
      return prevPrices.map((value, index) => {
        return index === i ? { ...value, checkBox: check } : value;
      });
    });
  };

  const handleSizePrice = (e, i) => {
    const inputValue = e.target.value;

    setPrice((prevPrices) => {
      return prevPrices.map((value, index) => {
        return index === i ? { ...value, price: inputValue } : value;
      });
    });
  };

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPizzaForm({ ...pizzaForm, [name]: value });
  };

  const handleUploadImage = async (e) => {
    if (UserService.isAdmin()) {
      const token = localStorage.getItem("token");
      const imageFile = e.target.files[0];
      const formData = new FormData();
      formData.append("imageFile", imageFile);
      const response = await DishesService.uploadImage(token, formData);

      try {
        setImage(URL.createObjectURL(response));
        setPizzaForm({ ...pizzaForm, image: imageFile });
      } catch (error) {
        alert(error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (UserService.isAdmin()) {
      if (image !== null && pizzaForm.image !== null) {
        const token = localStorage.getItem("token");
        const closePrice = prices.filter((value) => value.checkBox);

        const formData = new FormData();
        formData.append("pizzaName", pizzaForm.pizzaName);
        formData.append("pizzaDescription", pizzaForm.pizzaDescription);
        formData.append("discount", pizzaForm.discount);
        closePrice.forEach((value, index) => {
          formData.append(`prices[${index}].pizzaSize`, value.enum);
          formData.append(`prices[${index}].price`, value.price);
        });
        formData.append("image", pizzaForm.image);

        const response = await DishesService.addPizza(token, formData);
        if (response.statusCode === 200) {
          alert(response.message);
          navigate("/admin/dishes-management");
        } else {
          alert(response.message);
        }
      } else {
        alert("Please Upload Image To Complete");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className={style["wrapper"]}>
        <div className={`${style["pizza-form"]} shadow my-5`}>
          <h1>
            <b>Add Pizza</b>
          </h1>
          <hr />
          <form onSubmit={handleSubmit}>
            <h4 className="mt-4">
              <b>- Basic Information: </b>
            </h4>
            <div className={`${style["input-container"]} p-4`}>
              <div className={style["input-box"]} style={{ flexBasis: "30%" }}>
                <p>
                  <b>Name: </b>
                </p>
                <input
                  type="text"
                  name="pizzaName"
                  className="form-control border-secondary"
                  value={pizzaForm.pizzaName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className={style["input-box"]} style={{ flexBasis: "50%" }}>
                <p>
                  <b>Description: </b>
                </p>
                <input
                  type="text"
                  name="pizzaDescription"
                  className="form-control border-secondary"
                  value={pizzaForm.pizzaDescription}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className={style["input-box"]}>
                <p>
                  <b>Discount (%): </b>
                </p>
                <input
                  type="number"
                  name="discount"
                  min={0}
                  max={100}
                  className="form-control border-secondary"
                  value={pizzaForm.discount}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <h4 className="mt-5">
              <b>- Size and Price: </b>
            </h4>
            <div className={`${style["input-container"]} p-4`}>
              {prices.map((value, index) => {
                return (
                  <div className={style["input-box"]}>
                    <p>
                      <label>
                        <input
                          type="checkbox"
                          className="form-check-input border-secondary me-1"
                          value={index}
                          onChange={(e) => {
                            handleCheckBox(e, index);
                          }}
                        />{" "}
                        <b>{value.size}</b>
                      </label>
                    </p>
                    <input
                      type="number"
                      name="price"
                      className="form-control border-secondary"
                      value={value.price}
                      onChange={(e) => {
                        handleSizePrice(e, index);
                      }}
                      disabled={!value.checkBox}
                      required={value.checkBox}
                    />
                  </div>
                );
              })}
            </div>
            <h4 className="mt-5">
              <b className="me-2">- Image: </b>{" "}
              <input
                type="file"
                ref={imageRef}
                accept="image/*"
                name="image"
                style={{ display: "none" }}
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
                src={image ? image : defaultImage}
                className="shadow my-3"
                alt=""
              />
            </div>
            <div className="text-end p-4">
              <button className="btn btn-lg btn-success">Add Pizza</button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
