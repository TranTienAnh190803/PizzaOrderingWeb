import { LuCupSoda } from "react-icons/lu";
import Navbar from "../../Component/Navbar";
import style from "./DishesManagement.module.css";
import { FaBowlFood } from "react-icons/fa6";
import { GiFullPizza } from "react-icons/gi";
import { useEffect, useState } from "react";
import DishesService from "../../Service/DishesService";
import Footer from "../../Component/Footer";
import { Link } from "react-router-dom";
import UserService from "../../Service/UserService";

export default function DishesManagement() {
  document.title = "Menu";
  const [selection, setSelection] = useState({
    pizza: true,
    drink: false,
    appetizer: false,
  });
  const [pizzaList, setPizzaList] = useState([]);
  const [noPizza, setNoPizza] = useState({
    check: false,
    message: "",
  });

  const fetchPizzaList = async () => {
    const response = await DishesService.getPizza();

    if (response.statusCode === 200 && response.pizzas !== null) {
      setPizzaList(response.pizzas);
    } else {
      setNoPizza({ check: true, message: response.message });
    }
  };

  useEffect(() => {
    fetchPizzaList();
  }, []);

  const handleClick = (e) => {
    const id = e.currentTarget.id;
    setSelection({ [id]: true });
  };

  const handleDelete = async (pizzaId) => {
    if (UserService.isAdmin()) {
      if (confirm("Are You Sure You Want To DELETE This Pizza")) {
        const token = localStorage.getItem("token");
        const response = await DishesService.deletePizza(token, pizzaId);

        if (response.statusCode === 200) {
          alert(response.message);
          window.location.reload();
        } else {
          alert(response.message);
        }
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className={style["wrapper"]}>
        <nav className={style["navbar2"]}>
          <div className={style["item"]} id="pizza" onClick={handleClick}>
            <GiFullPizza size={50} /> <p className="m-0">Pizza</p>
          </div>
          <div className={style["item"]} id="drink" onClick={handleClick}>
            <LuCupSoda size={50} /> <p className="m-0">Drink</p>
          </div>
          <div className={style["item"]} id="appetizer" onClick={handleClick}>
            <FaBowlFood size={50} /> <p className="m-0">Appetizer</p>
          </div>
        </nav>
        <div className="my-5">
          {selection.pizza && (
            <div className={`${style["dishes-container"]} shadow mx-auto`}>
              <h1>
                <b>Pizza</b>
              </h1>
              <hr />
              <div className="my-4 text-end">
                <Link
                  className="btn btn-lg btn-success"
                  to={"/admin/pizza-adding"}
                >
                  + Add Pizza
                </Link>
              </div>
              <div className={style["table-container"]}>
                {noPizza.check ? (
                  <p className="text-center text-danger">{noPizza.message}</p>
                ) : (
                  <table className="table">
                    <thead className="fs-5">
                      <tr>
                        <th scope="col"></th>
                        <th scope="col">Pizza</th>
                        <th scope="col">Description</th>
                        <th scope="col" className="text-center">
                          Discount
                        </th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {pizzaList.map((pizza) => {
                        return (
                          <tr key={pizza.id}>
                            <td className={style["image-box"]}>
                              <img src={pizza.imageBase64} alt="pizza" />
                            </td>
                            <td>{pizza.pizzaName}</td>
                            <td style={{ width: "30%" }}>
                              {pizza.pizzaDescription}
                            </td>
                            <td className="text-center">{pizza.discount}%</td>
                            <td style={{ width: "15%" }}>
                              <Link className="btn btn-primary me-2">View</Link>
                              <button
                                className="btn btn-outline-danger"
                                onClick={() => {
                                  handleDelete(pizza.id);
                                }}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
