import { useEffect, useState } from "react";
import Footer from "../../Component/Footer";
import Navbar from "../../Component/Navbar";
import Sidebar from "../../Component/Sidebar";
import style from "./UserOrdersPage.module.css";
import UserService from "../../Service/UserService";
import OrderService from "../../Service/OrderService";
import { FaCircle, FaDotCircle } from "react-icons/fa";

export default function UserOrdersPage() {
  const textColor = ["goldenrod", "green", "darkgreen", "red"];
  const [userOrders, setUserOrders] = useState([]);
  const [noOrder, setNoOrder] = useState({
    check: false,
    message: "",
  });

  const fetchUserOrders = async () => {
    if (UserService.isUser()) {
      const token = localStorage.getItem("token");
      const response = await OrderService.getUserOrder(token);
      const orderList = response.orders;

      if (response.statusCode === 200 && orderList.length > 0) {
        setUserOrders(orderList);
      } else if (response.statusCode === 200 && orderList.length === 0) {
        setNoOrder({ check: true, message: response.message });
      } else {
        alert(response.message);
      }
    }
  };

  useEffect(() => {
    fetchUserOrders();
  }, []);

  return (
    <>
      <Navbar />
      <div className={style["wrapper"]}>
        <Sidebar />
        <div className={`${style["orders"]} shadow`}>
          <h1>
            <b>Orders</b>
          </h1>
          <hr />
          <div>
            {noOrder.check ? (
              <div className="text-danger text-center">
                <h3>{noOrder.message}</h3>
              </div>
            ) : (
              <div className="my-4">
                {userOrders.map((value, index) => {
                  return (
                    <div key={index} className={style["order"]}>
                      <div>
                        <h3 className="mb-3">
                          <b>Order ID: </b> {value.orderId}
                        </h3>
                        <p>
                          <b>Orderer: </b> {value.orderer}
                        </p>
                        <p>
                          <b>Phone Number: </b> {value.phoneNumber}
                        </p>
                        <p>
                          <b>Address: </b> {value.address}
                        </p>
                        <p className="my-0">
                          <b>Number Of Dishes: </b> {value.cartItems.length}
                        </p>
                      </div>
                      <div
                        style={{
                          color: `${textColor[value.orderState]}`,
                          height: "fit-content",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <FaDotCircle />{" "}
                        <span className="ms-1">{value.stateString}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
