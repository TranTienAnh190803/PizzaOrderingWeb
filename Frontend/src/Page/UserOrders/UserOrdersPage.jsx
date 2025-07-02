import { useEffect, useState } from "react";
import Footer from "../../Component/Footer";
import Navbar from "../../Component/Navbar";
import Sidebar from "../../Component/Sidebar";
import style from "./UserOrdersPage.module.css";
import UserService from "../../Service/UserService";
import OrderService from "../../Service/OrderService";
import { FaCircle, FaDotCircle } from "react-icons/fa";
import Converter from "../../Service/Converter";
import { IoClose } from "react-icons/io5";

export default function UserOrdersPage() {
  document.title = "Orders";
  const textColor = ["goldenrod", "green", "darkgreen", "red"];
  const [userOrders, setUserOrders] = useState([]);
  const [noOrder, setNoOrder] = useState({
    check: false,
    message: "",
  });
  const [popup, setPopup] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});

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

  const handleShowPopup = async (orderId) => {
    if (UserService.isUser()) {
      const token = localStorage.getItem("token");
      const response = await OrderService.userGetSelectedOrder(token, orderId);

      if (response.statusCode === 200) {
        setSelectedOrder(response.order);
        setPopup(true);
      } else {
        alert(response.message);
      }
    }
  };

  const handleClosePopup = () => {
    setSelectedOrder({});
    setPopup(false);
  };

  const handleCancelOrder = async () => {
    if (confirm("Are You Sure You Want To CANCEL This Order?")) {
      if (UserService.isUser()) {
        const token = localStorage.getItem("token");
        const response = await OrderService.cancelOrder(
          token,
          selectedOrder.orderId
        );

        alert(response.message);
        if (response.statusCode === 200) {
          window.location.reload();
        }
      }
    }
  };

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
                    <div
                      key={index}
                      className={style["order"]}
                      onClick={() => {
                        handleShowPopup(value.orderId);
                      }}
                    >
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
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          alignItems: "end",
                        }}
                      >
                        <div className="text-muted">
                          {`${Converter.getTime(
                            value.orderDate
                          )} | ${Converter.getDate(value.orderDate)}`}
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
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      {popup && (
        <div className={style["popup"]} onClick={handleClosePopup}>
          <div
            className={style["invoice"]}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <button className={style["close-btn"]} onClick={handleClosePopup}>
              <IoClose className="fs-3" />
            </button>
            <h1 className="text-center p-2">
              <b>Invoice</b>
            </h1>
            <hr />
            <div className="px-5">
              <div className="d-flex justify-content-between">
                <div>
                  <p>
                    <b>Order Id: </b> {selectedOrder.orderId}
                  </p>
                  <p>
                    <b>Orderer: </b> {selectedOrder.orderer}
                  </p>
                  <p>
                    <b>Address: </b> {selectedOrder.address}
                  </p>
                  <p>
                    <b>Phone Number: </b> {selectedOrder.phoneNumber}
                  </p>
                </div>
                <div>
                  <p>
                    <b>Order Date: </b>
                    {`${Converter.getTime(
                      selectedOrder.orderDate
                    )} | ${Converter.getDate(selectedOrder.orderDate)}`}
                  </p>
                  <p
                    style={{ color: `${textColor[selectedOrder.orderState]}` }}
                  >
                    <b>State: </b> {selectedOrder.stateString}
                  </p>
                </div>
              </div>
              <div className="my-2">
                <table className="table text-center">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Ammount</th>
                      <th scope="col">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.cartItems.map((value, index) => {
                      return (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>{`${value.name} ${
                            value.sizeString && `(${value.sizeString})`
                          }`}</td>
                          <td>{value.quantity}</td>
                          <td>{Converter.toVND(value.totalPrice)}đ</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-5 mb-3">
                {selectedOrder.orderState === 0 ? (
                  <button
                    className="btn btn-outline-danger"
                    onClick={handleCancelOrder}
                  >
                    Cancel Order
                  </button>
                ) : (
                  <div></div>
                )}

                <h5 className="text-danger">
                  <b>Total: </b> {Converter.toVND(selectedOrder.totalPrice)}đ
                </h5>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
