import { useEffect, useState } from "react";
import Footer from "../../Component/Footer";
import Navbar from "../../Component/Navbar";
import style from "./CartPage.module.css";
import UserService from "../../Service/UserService";
import OrderService from "../../Service/OrderService";
import Converter from "../../Service/Converter";

export default function CartPage() {
  document.title = "Cart";
  const [cart, setCart] = useState([]);
  const [noItem, setNoItem] = useState({
    check: false,
    message: "",
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

  useEffect(() => {
    fetchUserCart();
  }, []);

  const handleRemoveItem = async (id) => {
    if (UserService.isUser()) {
      const token = localStorage.getItem("token");
      const response = await OrderService.deleteCartItem(token, id);

      if (response.statusCode === 200) {
        fetchUserCart();
      } else {
        alert(response.message);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className={style["wrapper"]}>
        <div className={`${style["cart"]} mx-auto`}>
          <h1 className="text-center p-3">
            <b>My Basket</b>
          </h1>
          <hr />
          <div className="mt-5">
            {noItem.check ? (
              <div className="text-center">
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
                  <button className={style["custom-btn"]}>Order</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
