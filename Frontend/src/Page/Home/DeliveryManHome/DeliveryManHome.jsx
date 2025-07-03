import { useEffect, useState } from "react";
import image from "../../../assets/DeliveryManHome.jpg";
import style from "./DeliveryManHome.module.css";
import UserService from "../../../Service/UserService";
import OrderService from "../../../Service/OrderService";
import Converter from "../../../Service/Converter";
import { FaCheckCircle, FaShippingFast } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

export default function DeliveryManHome() {
  const textColor = ["goldenrod", "darkgreen"];
  const [noWork, setNoWork] = useState({
    check: false,
    message: "",
  });
  const [work, setWork] = useState([]);
  const [popup, setPopup] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});

  const fetchWork = async () => {
    if (UserService.isDeliveryMan()) {
      const token = localStorage.getItem("token");
      const response = await OrderService.viewWork(token);

      if (response.statusCode === 200 && response.orders.length > 0) {
        setWork(response.orders);
      } else if (response.statusCode === 200 && response.orders.length === 0) {
        setNoWork({ check: true, message: response.message });
      } else {
        alert(response.message);
      }
    }
  };

  useEffect(() => {
    fetchWork();
  }, []);

  const handleOrderFiltering = async (e) => {
    if (UserService.isDeliveryMan()) {
      const token = localStorage.getItem("token");
      const selected = e.target.value;
      let response;

      if (selected > 0) {
        response = await OrderService.deliveryFiltering(token, selected);
      } else {
        response = await OrderService.viewWork(token);
      }

      if (response.statusCode === 200 && response.orders.length > 0) {
        setWork(response.orders);
        setNoWork({ check: false, message: "" });
      } else if (response.statusCode === 200 && response.orders.length === 0) {
        setNoWork({ check: true, message: response.message });
      } else {
        alert(response.message);
      }
    }
  };

  const handleShowPopup = async (orderId) => {
    if (UserService.isDeliveryMan()) {
      const token = localStorage.getItem("token");
      const response = await OrderService.dmGetSelectedOrder(token, orderId);

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
  };

  const handleDeliveredOrder = async () => {
    if (UserService.isDeliveryMan()) {
      const token = localStorage.getItem("token");
      const response = await OrderService.deliveryVerifying(
        token,
        selectedOrder.orderId
      );

      alert(response.message);
      if (response.statusCode === 200) {
        window.location.reload();
      }
    }
  };

  return (
    <>
      <div>
        <div className={`${style["image-box"]} shadow`}>
          <img src={image} alt="deliveryMan" style={{ width: "100%" }} />
          <div className={style["home-content"]}>
            <h1 className="mb-5 text-center">
              <b>Welcome back, Employee.</b>
            </h1>
            <div>
              <a className="btn btn-lg btn-outline-success" href="#Work">
                Let's Get To Work
              </a>
            </div>
          </div>
        </div>
        <div className={style["wrapper"]}>
          <div id="Work" className={`${style["orders"]} mx-auto shadow`}>
            <h1 className="text-center p-3">
              <b>Today Work</b>
            </h1>
            <hr />
            <div>
              {noWork.check ? (
                <div className="my-5">
                  <div className="d-flex justify-content-end align-items-end my-4">
                    <h5 className="mx-2">Filter:</h5>
                    <select
                      name="orderState"
                      className="form-select border-secondary w-25"
                      onChange={handleOrderFiltering}
                    >
                      <option value={0} selected>
                        All
                      </option>
                      <option value={1}>Approve</option>
                      <option value={2}>Delivered</option>
                    </select>
                  </div>
                  <h3 className="text-danger text-center">{noWork.message}</h3>
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
                      <option value={0} selected>
                        All
                      </option>
                      <option value={1}>Approve</option>
                      <option value={2}>Delivered</option>
                    </select>
                  </div>
                  {work.map((value, index) => {
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
                              color: `${textColor[value.orderState - 1]}`,
                              height: "fit-content",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            {value.orderState === 1 && <FaShippingFast />}
                            {value.orderState === 2 && <FaCheckCircle />}
                            <span className="ms-1"> {value.stateString}</span>
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
                    style={{
                      color: `${textColor[selectedOrder.orderState - 1]}`,
                    }}
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
              <h5 className=" text-end text-danger">
                <b className="me-1">Total: </b>{" "}
                {Converter.toVND(selectedOrder.totalPrice)}đ
              </h5>
              {selectedOrder.orderState === 1 && (
                <div className="text-end mt-5 mb-3">
                  <button
                    className="btn btn-lg btn-success"
                    onClick={handleDeliveredOrder}
                  >
                    Delivered
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
