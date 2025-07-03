import { useEffect, useState } from "react";
import Footer from "../../Component/Footer";
import Navbar from "../../Component/Navbar";
import style from "./OrdersManagementPage.module.css";
import UserService from "../../Service/UserService";
import OrderService from "../../Service/OrderService";
import Converter from "../../Service/Converter";
import { FaDotCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

export default function OrdersMangementPage() {
  document.title = "Orders Management";
  const textColor = ["goldenrod", "green", "darkgreen", "red"];
  const [orderList, setOrderList] = useState([]);
  const [noOrderList, setNoOrderList] = useState({
    check: false,
    message: "",
  });
  const [popup, setPopup] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});
  const [deliveryManList, setDeliveryManList] = useState([]);
  const [desginatedDeliveryMan, setDesginatedDeliveryMan] = useState(null);

  const fetchAllOrders = async () => {
    if (UserService.isAdmin()) {
      const token = localStorage.getItem("token");
      const response = await OrderService.getAllOrders(token);

      if (response.statusCode === 200 && response.orders.length > 0) {
        setOrderList(response.orders);
      } else if (response.statusCode === 200 && response.orders.length === 0) {
        setNoOrderList({ check: true, message: response.message });
      } else {
        alert(response.message);
      }
    }
  };

  const fetchDeliveryManList = async () => {
    if (UserService.isAdmin()) {
      if (UserService.isAdmin()) {
        const token = localStorage.getItem("token");
        const response = await UserService.getAllDeliveryMan(token);

        if (response.statusCode === 200) {
          const allDeliveryMan = response.userList.map((value) => {
            return {
              deliveryManId: value.userId,
              deliveryManName: value.fullname,
            };
          });
          setDeliveryManList(allDeliveryMan);
        } else {
          alert(response.message);
        }
      }
    }
  };

  useEffect(() => {
    fetchAllOrders();
    fetchDeliveryManList();
  }, []);

  const handleOrderFiltering = async (e) => {
    if (UserService.isAdmin()) {
      const orderState = e.target.value;
      const token = localStorage.getItem("token");
      let response;

      if (orderState <= -1) {
        response = await OrderService.getAllOrders(token);
      } else {
        response = await OrderService.ordersFiltering(token, orderState);
      }

      if (response.statusCode === 200 && response.orders.length > 0) {
        setOrderList(response.orders);
        setNoOrderList({ check: false, message: "" });
      } else if (response.statusCode === 200 && response.orders.length === 0) {
        setNoOrderList({ check: true, message: response.message });
      } else {
        alert(response.message);
      }
    }
  };

  const handleShowPopup = async (orderId) => {
    if (UserService.isAdmin()) {
      const token = localStorage.getItem("token");
      const response = await OrderService.adminGetSelectedOrder(token, orderId);

      if (response.statusCode === 200) {
        setSelectedOrder(response.order);
        setPopup(true);
      } else {
        alert(response.message);
      }
    }
  };

  const handleClosePopup = () => {
    setPopup(false);
    setSelectedOrder({});
    setDesginatedDeliveryMan(null);
  };

  const handleAppointDeliveryMan = (e) => {
    const deliveryManId = e.target.value;
    setDesginatedDeliveryMan(deliveryManId);
  };

  const handleApproveOrder = async () => {
    if (UserService.isAdmin()) {
      const token = localStorage.getItem("token");
      const response = await OrderService.acceptOrder(
        token,
        selectedOrder.orderId,
        desginatedDeliveryMan
      );

      alert(response.message);
      if (response.statusCode === 200) {
        window.location.reload();
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className={style["wrapper"]}>
        <div className={`${style["orders"]} mx-auto shadow`}>
          <h1>
            <b>Order Mangement</b>
          </h1>
          <hr />
          <div>
            {noOrderList.check ? (
              <div>
                <div className="d-flex justify-content-end align-items-end my-4">
                  <h5 className="mx-2">Filter:</h5>
                  <select
                    name="orderState"
                    className="form-select border-secondary w-25"
                    onChange={handleOrderFiltering}
                  >
                    <option value={-1} selected>
                      All
                    </option>
                    <option value={0}>Pending</option>
                    <option value={1}>Approve</option>
                    <option value={2}>Delivered</option>
                    <option value={3}>Cancel</option>
                  </select>
                </div>
                <h3 className="text-danger text-center">
                  {noOrderList.message}
                </h3>
              </div>
            ) : (
              <div className="my-4">
                <div className="d-flex justify-content-end align-items-end my-4">
                  <h5 className="mx-2">Filter:</h5>
                  <select
                    name="orderState"
                    className="form-select border-secondary w-25"
                    onChange={handleOrderFiltering}
                  >
                    <option value={-1} selected>
                      All
                    </option>
                    <option value={0}>Pending</option>
                    <option value={1}>Approve</option>
                    <option value={2}>Delivered</option>
                    <option value={3}>Cancel</option>
                  </select>
                </div>
                {orderList.map((value, index) => {
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
                          <b>Contact: </b> {value.phoneNumber}
                        </p>
                        <p>
                          <b>Deliver To: </b> {value.address}
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
            className={style["information"]}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <button className={style["close-btn"]} onClick={handleClosePopup}>
              <IoClose className="fs-3" />
            </button>
            <h1 className="text-center p-2">
              <b>Information</b>
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
                    <b>Deliver To: </b> {selectedOrder.address}
                  </p>
                  <p>
                    <b>Contact: </b> {selectedOrder.phoneNumber}
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
                  {selectedOrder.orderState !== 0 &&
                    selectedOrder.orderState !== 3 && (
                      <p>
                        <b>Delivery Man: </b> {selectedOrder.deliveryManName}
                      </p>
                    )}
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
              <h5 className=" text-end text-danger">
                <b className="me-1">Total: </b>{" "}
                {Converter.toVND(selectedOrder.totalPrice)}đ
              </h5>
              {selectedOrder.orderState === 0 && (
                <div className="d-flex justify-content-between align-items-center my-4">
                  <div className="d-flex align-items-center">
                    <p className="mx-2 my-0">
                      <b>Designate:</b>
                    </p>
                    <select
                      name="deliveryManId"
                      className="form-select border-secondary"
                      onChange={handleAppointDeliveryMan}
                    >
                      <option value="" selected disabled hidden>
                        Delivery Man
                      </option>
                      {deliveryManList.map((value, index) => {
                        return (
                          <option key={index} value={value.deliveryManId}>
                            {value.deliveryManName}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <button
                    className="btn btn-lg btn-success"
                    onClick={handleApproveOrder}
                  >
                    Approve
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
