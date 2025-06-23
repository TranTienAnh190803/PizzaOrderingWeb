import { Link } from "react-router-dom";
import Footer from "../../Component/Footer";
import Navbar from "../../Component/Navbar";
import style from "./DMManagement.module.css";
import { useEffect, useState } from "react";
import UserService from "../../Service/UserService";

export default function DMManagement() {
  document.title = "Delivery Man Management";
  const [deliveryManList, setDeliveryManList] = useState([]);

  const fetchDeliveryManList = async () => {
    if (UserService.isAdmin()) {
      const token = localStorage.getItem("token");
      const response = await UserService.getAllDeliveryMan(token);

      if (response.statusCode === 200) {
        setDeliveryManList(response.userList);
      } else {
        alert(response.message);
      }
    }
  };

  useEffect(() => {
    fetchDeliveryManList();
  }, []);

  const handleFired = async (e, id) => {
    e.preventDefault();

    if (UserService.isAdmin()) {
      if (confirm("Are You Sure You Want To FIRED This Delivery Man")) {
        const token = localStorage.getItem("token");
        const response = await UserService.deleteAccount(token, id);

        alert(response.message);
        if (response.statusCode === 200) {
          fetchDeliveryManList();
        }
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className={style["wrapper"]}>
        <div className={`${style["dm-management"]} mx-auto shadow`}>
          <h1>
            <b>Delivery Man Management</b>
          </h1>
          <hr />
          <div className="my-4 text-end">
            <Link
              className="btn btn-lg btn-success"
              to="/admin/dm-registration"
            >
              + Register Delivery Man
            </Link>
          </div>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Fullname</th>
                <th scope="col">Email</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Date Of Birth</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {deliveryManList.map((value, index) => {
                return (
                  <tr key={index}>
                    <th scope="row" style={{ width: "10%" }}>
                      {value.userId}
                    </th>
                    <td>{value.fullname}</td>
                    <td>{value.email}</td>
                    <td>{value.phoneNumber}</td>
                    <td>{value.dateOfBirth}</td>
                    <td>
                      <Link
                        className="btn btn-outline-primary me-2"
                        to={`/admin/dm-info/${value.userId}`}
                      >
                        View
                      </Link>
                      <button
                        className="btn btn-danger ms-2"
                        onClick={(event) => {
                          handleFired(event, value.userId);
                        }}
                      >
                        Fired
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
}
