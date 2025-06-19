import { useNavigate, useParams } from "react-router-dom";
import style from "./PizzaEditPage.module.css";
import Navbar from "../../Component/Navbar";
import Footer from "../../Component/Footer";
import { useEffect, useRef, useState } from "react";
import UserService from "../../Service/UserService";
import DishesService from "../../Service/DishesService";

export default function PizzaEditPage() {
  document.title = "Pizza Editing";
  const navigate = useNavigate();
  const { pizzaId } = useParams();
  const [prices, setPrice] = useState([
    { size: "Small", enum: 0, checkBox: false, price: 0 },
    { size: "Medium", enum: 1, checkBox: false, price: 0 },
    { size: "Large", enum: 2, checkBox: false, price: 0 },
    { size: "Extra Large", enum: 3, checkBox: false, price: 0 },
  ]);
  const [selectedPizza, setSelectedPizza] = useState({
    id: 0,
    pizzaName: "",
    pizzaDescription: "",
    discount: 0,
    imageBase64: null,
    imageEdit: null,
  });
  const [image, setImage] = useState(null);
  const imageRef = useRef();

  const fetchSelectedPizza = async () => {
    if (UserService.isAuthenticated()) {
      const token = localStorage.getItem("token");
      const response = await DishesService.getSelectedPizza(token, pizzaId);
      if (response.statusCode === 200) {
        const pizza = response.pizzaDTO;
        setSelectedPizza(pizza);
        setPrice((prevPrice) => {
          return prevPrice.map((value) => {
            const match = pizza.prices.find(
              (element) => element.pizzaSize === value.enum
            );
            if (match) {
              return { ...value, checkBox: true, price: match.price };
            }
            return value;
          });
        });
      }
    }
  };

  useEffect(() => {
    fetchSelectedPizza();
  }, []);

  const handleCheckBox = (e, i) => {
    const checked = e.target.checked;

    setPrice((prevPrice) => {
      return prevPrice.map((value, index) => {
        return index === i ? { ...value, checkBox: checked } : value;
      });
    });
  };

  const handleSizePrice = (e, i) => {
    const value = e.target.value;

    setPrice((prePrice) => {
      return prePrice.map((element, index) => {
        return i === index ? { ...element, price: value } : element;
      });
    });
  };

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setSelectedPizza({ ...selectedPizza, [name]: value });
  };

  const handleUploadImage = async (e) => {
    if (UserService.isAdmin()) {
      const token = localStorage.getItem("token");
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("imageFile", file);

      try {
        const response = await DishesService.uploadImage(token, formData);
        setImage(URL.createObjectURL(response));
        setSelectedPizza({ ...selectedPizza, imageEdit: file });
      } catch (error) {
        alert(error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (UserService.isAdmin()) {
      const token = localStorage.getItem("token");
      const closePrice = prices.filter((value) => value.checkBox);

      const formData = new FormData();
      formData.append("pizzaName", selectedPizza.pizzaName);
      formData.append("pizzaDescription", selectedPizza.pizzaDescription);
      formData.append("discount", selectedPizza.discount);
      closePrice.forEach((value, index) => {
        formData.append(`prices[${index}].pizzaSize`, value.enum);
        formData.append(`prices[${index}].price`, value.price);
      });
      if (image !== null) {
        formData.append("image", selectedPizza.imageEdit);
      }

      const response = await DishesService.editPizza(token, formData, pizzaId);
      if (response.statusCode === 200) {
        alert(response.message);
        navigate("/admin/dishes-management");
      } else {
        alert(response.message);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className={style["wrapper"]}>
        <div className={`${style["pizza-form"]} shadow my-5`}>
          <h1>
            <b>Pizza Information</b>
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
                  value={selectedPizza.pizzaName}
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
                  value={selectedPizza.pizzaDescription}
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
                  value={selectedPizza.discount}
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
                  <div className={style["input-box"]} key={index}>
                    <p>
                      <label>
                        <input
                          type="checkbox"
                          className="form-check-input border-secondary me-1"
                          value={index}
                          checked={value.checkBox}
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
              <b>- Image: </b>{" "}
              <input
                type="file"
                ref={imageRef}
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
                src={image ? image : selectedPizza.imageBase64}
                className="shadow my-3"
                alt=""
              />
            </div>
            <div className="text-end p-4">
              <button className="btn btn-lg btn-warning">Edit Pizza</button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
