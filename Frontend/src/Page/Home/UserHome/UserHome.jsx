import { GiFullPizza } from "react-icons/gi";
import slider1 from "../../../assets/UserSlider1.jpg";
import slider2 from "../../../assets/UserSlider2.jpg";
import slider3 from "../../../assets/UserSlider3.jpg";
import style from "./UserHome.module.css";
import { LuCupSoda } from "react-icons/lu";
import { FaBowlFood } from "react-icons/fa6";
import { useEffect, useState } from "react";
import DishesService from "../../../Service/DishesService";
import Converter from "../../../Service/Converter";
import { IoClose } from "react-icons/io5";
import UserService from "../../../Service/UserService";
import OrderService from "../../../Service/OrderService";

export default function UserHome() {
  const [selection, setSelection] = useState({
    pizza: true,
    drink: false,
    appetizer: false,
  });
  const [pizzaList, setPizzaList] = useState([]);
  const [noPizza, setNoPizza] = useState({
    pizza: false,
    message: "",
  });
  const [otherDishes, setOtherDishes] = useState([]);
  const [noDishes, setNoDishes] = useState({
    drink: false,
    appetizer: false,
    message: "",
  });

  // Popup Hook
  const [popup, setPopup] = useState({
    show: false,
    pizza: false,
    otherDishes: false,
  });
  const [selectedDish, setSelectedDish] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartItem, setCartItem] = useState({
    quantity: 1,
  });
  const [allowAdd, setAllowAdd] = useState(false);

  const fetchPizzaList = async () => {
    const response = await DishesService.getPizza();
    if (response.statusCode === 200 && response.pizzas !== null) {
      setPizzaList(response.pizzas);
    } else if (response.pizzas === null) {
      setNoPizza({ pizza: true, message: response.message });
    } else {
      alert(response.message);
    }
  };

  const fetchOtherDishes = async () => {
    const response = await DishesService.getAllDishes();
    if (response.statusCode === 200) {
      setNoDishes({
        drink: response.noDrink,
        appetizer: response.noAppetizer,
        message: response.message ? response.message : "",
      });
      setOtherDishes(response.otherDishes);
    } else {
      alert(response.message);
    }
  };

  useEffect(() => {
    fetchPizzaList();
    fetchOtherDishes();
  }, []);

  const handleSelection = (e) => {
    const id = e.currentTarget.id;
    setSelection({ [id]: true });
  };

  const handleCardClick = async (e, id) => {
    const name = e.currentTarget.getAttribute("name");
    setPopup({ show: true, [name]: true });

    if (name === "pizza") {
      const response = await DishesService.getSelectedPizza(id);
      if (response.statusCode === 200) {
        setSelectedDish(response.pizzaDTO);
        setCartItem({ ...cartItem, pizzaId: response.pizzaDTO.id });
      } else {
        alert(response.message);
      }
    } else if (name === "otherDishes") {
      const response = await DishesService.getSelectedDish(id);
      if (response.statusCode === 200) {
        setSelectedDish(response.dishesDTO);
        setTotalPrice(response.dishesDTO.officialPrice);
        setCartItem({ ...cartItem, dishesId: response.dishesDTO.id });
      } else {
        alert(response.message);
      }
    } else {
      alert("Error");
    }
  };

  // Popup handler
  const handleClosePopup = (e) => {
    setSelectedDish({});
    setPopup({
      show: false,
      pizza: false,
      otherDishes: false,
    });
    setTotalPrice(0);
    setCartItem({
      quantity: 1,
    });
    setAllowAdd(false);
  };

  const handleSizeChosing = (e) => {
    const pizzaSize = e.currentTarget.id;
    const selectedPrice = selectedDish.prices.find(
      (value) => value.pizzaSize == pizzaSize
    );
    setTotalPrice(selectedPrice.officialPrice * cartItem.quantity);
    setCartItem({ ...cartItem, selectedSize: parseInt(pizzaSize) });
    setAllowAdd(true);
  };

  const handleSub = () => {
    const newQuantity = cartItem.quantity - 1;

    const officialPrice = totalPrice / cartItem.quantity;
    const currentPrice = officialPrice * newQuantity;
    setTotalPrice(currentPrice);
    setCartItem({ ...cartItem, quantity: newQuantity });
  };

  const handlePlus = () => {
    const newQuantity = cartItem.quantity + 1;

    const officialPrice = totalPrice / cartItem.quantity;
    const currentPrice = officialPrice * newQuantity;
    setTotalPrice(currentPrice);
    setCartItem({ ...cartItem, quantity: newQuantity });
  };

  const handleAddToCart = async () => {
    if (UserService.isUser()) {
      const token = localStorage.getItem("token");
      const response = await OrderService.addToCart(token, cartItem);
      alert(response.message);
    }
  };

  return (
    <>
      <div
        id="carouselExampleAutoplaying"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item position-relative active">
            <img src={slider1} className="d-block w-100" alt="slider" />
            <div className={style["home-content"]}>
              <h1 className="mb-5 text-center">
                <b>Welcome To TTAPizza.</b>
              </h1>
              <a href="#Dishes" className="btn btn-lg btn-outline-success">
                Order Food
              </a>
            </div>
          </div>
          <div className="carousel-item position-relative">
            <img src={slider2} className="d-block w-100" alt="slider" />
            <div className={style["home-content"]}>
              <h1 className="mb-5 text-center w-75 text-success">
                <b>
                  There are lots of pizzas and delicious food waiting for you.
                </b>
              </h1>
            </div>
          </div>
          <div className="carousel-item position-relative">
            <img src={slider3} className="d-block w-100" alt="slider" />
            <div className={style["home-content"]}>
              <h1 className="mb-5 text-center w-75 text-danger">
                <b>Special Discount</b> <br />
                <b>Up To 50%</b>
              </h1>
            </div>
          </div>
        </div>
        <button
          className="btn btn-dark rounded-circle position-absolute top-50 start-0 translate-middle-y pe-3 py-3 ms-3 z-1"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
        </button>

        <button
          className="btn btn-dark rounded-circle position-absolute top-50 end-0 translate-middle-y ps-3 py-3 me-3 z-1"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>
      <nav id="Dishes" className={style["navbar2"]}>
        <div className={style["item"]} id="pizza" onClick={handleSelection}>
          <GiFullPizza size={50} /> <p className="m-0">Pizza</p>
        </div>
        <div className={style["item"]} id="drink" onClick={handleSelection}>
          <LuCupSoda size={50} /> <p className="m-0">Drink</p>
        </div>
        <div className={style["item"]} id="appetizer" onClick={handleSelection}>
          <FaBowlFood size={50} /> <p className="m-0">Appetizer</p>
        </div>
      </nav>
      <div className={`${style["card-container"]} p-4`}>
        {/* Select Pizza */}
        {selection.pizza && (
          <>
            {noPizza.pizza ? (
              <>
                <h2 className="text-danger text-center my-3">
                  {noPizza.message}
                </h2>
              </>
            ) : (
              <>
                {pizzaList.map((value, index) => {
                  return (
                    <div
                      className={`${style["card"]} my-3`}
                      key={index}
                      name="pizza"
                      onClick={(event) => {
                        handleCardClick(event, value.id);
                      }}
                    >
                      {value.discount > 0 && (
                        <div className={style["discount"]}>
                          <b>- {value.discount}%</b>
                        </div>
                      )}
                      <div className={style["img-container"]}>
                        <img src={value.imageBase64} alt="pizza" />
                      </div>
                      <div className={style["dishes-info"]}>
                        <div>
                          <h3>
                            <b>{value.pizzaName}</b>
                          </h3>
                          <small>{value.pizzaDescription}</small>
                        </div>
                        <div>
                          <small>From</small>
                          <h4 className="text-danger">
                            {Converter.toVND(value.prices[0].officialPrice)} VNĐ
                          </h4>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </>
        )}

        {/* Select Drink */}
        {selection.drink && (
          <>
            {noDishes.drink ? (
              <>
                <h2 className="text-danger text-center my-3">
                  {noDishes.message}
                </h2>
              </>
            ) : (
              <>
                {otherDishes
                  .filter((x) => x.dishesType === 0)
                  .map((value, index) => {
                    return (
                      <div
                        className={`${style["card"]} my-3`}
                        key={index}
                        name="otherDishes"
                        onClick={(event) => {
                          handleCardClick(event, value.id);
                        }}
                      >
                        <div className={style["img-container"]}>
                          <img src={value.imageBase64} alt="drink" />
                        </div>
                        <div className={style["dishes-info"]}>
                          <div>
                            <h3>
                              <b>{value.name}</b>
                            </h3>
                            <small>{value.description}</small>
                          </div>
                          <div>
                            <h4 className="text-danger">
                              {Converter.toVND(value.price)} VNĐ
                            </h4>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </>
            )}
          </>
        )}

        {/* Select Appetizer */}
        {selection.appetizer && (
          <>
            {noDishes.appetizer ? (
              <>
                <h2 className="text-danger text-center my-3">
                  {noDishes.message}
                </h2>
              </>
            ) : (
              <>
                {otherDishes
                  .filter((x) => x.dishesType === 1)
                  .map((value, index) => {
                    return (
                      <div
                        className={`${style["card"]} my-3`}
                        key={index}
                        name="otherDishes"
                        onClick={(event) => {
                          handleCardClick(event, value.id);
                        }}
                      >
                        <div className={style["img-container"]}>
                          <img src={value.imageBase64} alt="drink" />
                        </div>
                        <div className={style["dishes-info"]}>
                          <div>
                            <h3>
                              <b>{value.name}</b>
                            </h3>
                            <small>{value.description}</small>
                          </div>
                          <div>
                            <h4 className="text-danger">
                              {Converter.toVND(value.price)} VNĐ
                            </h4>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </>
            )}
          </>
        )}
      </div>

      {/* Popup */}
      {popup.show && (
        <>
          {popup.pizza && (
            <div
              className={style["popup-container"]}
              onClick={handleClosePopup}
            >
              <div
                className={style["popup"]}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className={style["popup-close"]}
                  onClick={handleClosePopup}
                >
                  <IoClose className="fs-3" />
                </button>
                <div className={style["popup-image"]}>
                  <img src={selectedDish.imageBase64} alt="pizza" />
                </div>
                <div className={style["popup-info"]}>
                  <div>
                    <h3>
                      <b>{selectedDish.pizzaName}</b>
                    </h3>
                    <p>{selectedDish.pizzaDescription}</p>
                  </div>

                  <div>
                    <p>
                      <b>Size:</b>
                    </p>
                    <ul className="list-group">
                      {selectedDish.prices?.map((price, index) => {
                        return (
                          <li className="list-group-item" key={index}>
                            <label className="form-check-label">
                              <input
                                className="form-check-input me-3"
                                type="radio"
                                name="listGroupRadio"
                                id={price.pizzaSize}
                                onChange={handleSizeChosing}
                              />

                              {price.sizeString}
                            </label>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <div style={{ display: "flex", alignItems: "center" }}>
                    <b>Quantity: </b>
                    <div className="d-inline-flex ms-3">
                      <button
                        className="btn btn-danger"
                        disabled={cartItem.quantity === 1}
                        onClick={handleSub}
                      >
                        <b>-</b>
                      </button>
                      <input
                        type="number"
                        name="quantity"
                        className="form-control border-secondary text-center mx-1"
                        value={cartItem.quantity}
                        readOnly
                      />
                      <button className="btn btn-success" onClick={handlePlus}>
                        <b>+</b>
                      </button>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center text-danger">
                    <div>
                      <h4 className="m-0">
                        <b className="me-1">Total:</b>{" "}
                        {Converter.toVND(totalPrice)} đ
                      </h4>
                    </div>
                    <button
                      className="btn btn-lg btn-outline-success"
                      disabled={!allowAdd}
                      onClick={handleAddToCart}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {popup.otherDishes && (
            <div
              className={style["popup-container"]}
              onClick={handleClosePopup}
            >
              <div
                className={style["popup"]}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className={style["popup-close"]}
                  onClick={handleClosePopup}
                >
                  <IoClose className="fs-3" />
                </button>
                <div className={style["popup-image"]}>
                  <img src={selectedDish.imageBase64} alt="pizza" />
                </div>
                <div className={style["popup-info"]}>
                  <div>
                    <h3>
                      <b>{selectedDish.name}</b>
                    </h3>
                    <p>{selectedDish.description}</p>
                  </div>

                  <div style={{ display: "flex", alignItems: "center" }}>
                    <b>Quantity: </b>
                    <div className="d-inline-flex ms-3">
                      <button
                        className="btn btn-danger"
                        disabled={cartItem.quantity === 1}
                        onClick={handleSub}
                      >
                        <b>-</b>
                      </button>
                      <input
                        type="number"
                        name="quantity"
                        className="form-control border-secondary text-center mx-1"
                        value={cartItem.quantity}
                        readOnly
                      />
                      <button className="btn btn-success" onClick={handlePlus}>
                        <b>+</b>
                      </button>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center text-danger">
                    <div>
                      <h4 className="m-0">
                        <b className="me-1">Total:</b>{" "}
                        {Converter.toVND(totalPrice)} đ
                      </h4>
                    </div>
                    <button
                      className="btn btn-lg btn-outline-success"
                      onClick={handleAddToCart}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
