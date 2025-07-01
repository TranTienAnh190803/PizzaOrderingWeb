import { useEffect, useState } from "react";
import Footer from "../../Component/Footer";
import Navbar from "../../Component/Navbar";
import style from "./CartPage.module.css";
import UserService from "../../Service/UserService";
import OrderService from "../../Service/OrderService";
import Converter from "../../Service/Converter";
import { IoClose } from "react-icons/io5";

export default function CartPage() {
  document.title = "Cart";
  const [cart, setCart] = useState([]);
  const [noItem, setNoItem] = useState({
    check: false,
    message: "",
  });
  const [remove, setRemove] = useState(false);
  const [popup, setPopup] = useState(false);
  const [orderForm, setOrderForm] = useState({
    orderer: "",
    address: "",
    phoneNumber: "",
  });

  const fetchUserCart = async () => {
    if (UserService.isUser()) {
      const token = localStorage.getItem("token");
      const response = await OrderService.getCart(token);

      if (response.statusCode === 200 && response.cart.length > 0) {
        setCart(response.cart);
      } else if (response.statusCode === 200 && response.cart.length === 0) {
        setNoItem({ check: true, message: response.message });
      } else {
        alert(response.message);
      }
    }
  };

  const fetchUserInfo = async () => {
    if (UserService.isUser()) {
      const token = localStorage.getItem("token");
      const response = await UserService.getProfile(token);

      if (response.statusCode === 200) {
        const user = response.userDTO;
        setOrderForm({
          orderer: user.fullname,
          address: user.address,
          phoneNumber: user.phoneNumber,
        });
      }
    }
  };

  useEffect(() => {
    fetchUserCart();
    fetchUserInfo();
  }, []);

  const handleRemoveItem = async (id) => {
    if (UserService.isUser()) {
      const token = localStorage.getItem("token");
      const response = await OrderService.deleteCartItem(token, id);

      if (response.statusCode === 200) {
        fetchUserCart();
        setRemove(!remove);
      } else {
        alert(response.message);
      }
    }
  };

  const handleClosePopup = () => {
    setPopup(false);
  };

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setOrderForm({ ...orderForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (UserService.isUser()) {
      const token = localStorage.getItem("token");
      const response = await OrderService.orderFood(token, orderForm);
      alert(response.message);

      if (response.statusCode === 200) {
        window.location.reload();
      }
    }
  };

  return (
    <>
      <Navbar updateCart={remove} />
      <div className={style["wrapper"]}>
        <div className={`${style["cart"]} mx-auto`}>
          <h1 className="text-center p-3">
            <b>My Basket</b>
          </h1>
          <hr />
          <div className="mt-5">
            {noItem.check ? (
              <div className="text-center mb-5">
                <h3 className="text-danger">{noItem.message}</h3>
              </div>
            ) : (
              <>
                {cart.map((value, index) => {
                  return (
                    <div className={`${style["items"]} my-3`} key={index}>
                      <div className={style["image-container"]}>
                        <img src={value.imageBase64} alt="Food" />
                      </div>
                      <div className={style["item-info"]}>
                        <div>
                          <h3>
                            <b>{value.name}</b>
                          </h3>
                          {value.pizzaId && (
                            <h5 className="my-3">
                              <b>Size: </b> {value.sizeString}
                            </h5>
                          )}
                          <h5 className="my-3">
                            <b>Quantity: </b> {value.quantity}
                          </h5>
                          <h5 className="text-danger my-3">
                            <b>Price: </b> {Converter.toVND(value.totalPrice)} đ
                          </h5>
                        </div>
                        <div className="text-end w-100">
                          <button
                            className="btn btn-lg btn-outline-danger"
                            onClick={() => {
                              handleRemoveItem(value.id);
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div className="mt-5 p-4 d-flex justify-content-between align-items-center">
                  <h3 className="text-danger m-0">
                    <b>Total: </b>{" "}
                    {Converter.toVND(
                      cart.reduce((total, value) => total + value.totalPrice, 0)
                    )}{" "}
                    đ
                  </h3>
                  <button
                    className={style["custom-btn"]}
                    onClick={() => {
                      setPopup(true);
                    }}
                  >
                    Order
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {popup && (
        <div className={style["popup"]} onClick={handleClosePopup}>
          <div
            className={style["information"]}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <button className={style["popup-close"]} onClick={handleClosePopup}>
              <IoClose className="fs-3" />
            </button>
            <h2 className="p-3 text-center">
              <b>Information</b>
            </h2>
            <hr />
            <form className="p-3" onSubmit={handleSubmit}>
              <div className="mb-4">
                <p>
                  <b>Orderer: </b>
                </p>
                <input
                  type="text"
                  name="orderer"
                  className="form-control border-secondary"
                  value={orderForm.orderer}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <p>
                  <b>Address: </b>
                </p>
                <input
                  type="text"
                  name="address"
                  className="form-control border-secondary"
                  value={orderForm.address}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <p>
                  <b>Phone Number: </b>
                </p>
                <input
                  type="text"
                  name="phoneNumber"
                  className="form-control border-secondary"
                  value={orderForm.phoneNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <button className={style["popup-btn"]}>Order</button>
            </form>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
