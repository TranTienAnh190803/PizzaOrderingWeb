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
import Converter from "../../Service/Converter";

export default function DishesManagement() {
  document.title = "Menu";
  const [selection, setSelection] = useState({
    pizza: true,
    drink: false,
    appetizer: false,
  });
  const [pizzaList, setPizzaList] = useState([]);
  const [dishesList, setDishesList] = useState([]);
  const [noPizza, setNoPizza] = useState({
    check: false,
    message: "",
  });
  const [noDish, setNoDish] = useState({
    drink: false,
    appetizer: false,
    message: "",
  });

  const fetchPizzaList = async () => {
    const response = await DishesService.getPizza();

    if (response.statusCode === 200 && response.pizzas !== null) {
      setPizzaList(response.pizzas);
    } else if (response.pizzas === null) {
      setNoPizza({ check: true, message: response.message });
    } else {
      alert(response.message);
    }
  };

  const fetchDishesList = async () => {
    const response = await DishesService.getAllDishes();

    if (response.statusCode === 200) {
      setDishesList(response.otherDishes);
      if (response.noDrink === true && response.noAppetizer === true) {
        setNoDish({ appetizer: true, drink: true, message: response.message });
      } else if (response.noDrink === true) {
        setNoDish({ ...noDish, drink: true, message: response.message });
      } else if (response.noAppetizer === true) {
        setNoDish({ ...noDish, appetizer: true, message: response.message });
      }
    } else {
      alert(response.message);
    }
  };

  useEffect(() => {
    fetchPizzaList();
    fetchDishesList();
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
          fetchPizzaList();
        } else {
          alert(response.message);
        }
      }
    }
  };

  const handleDeleteDishes = async (dishesId) => {
    if (UserService.isAdmin()) {
      const token = localStorage.getItem("token");
      const response = await DishesService.deleteDishes(token, dishesId);

      if (response.statusCode === 200) {
        alert(response.message);
        fetchDishesList();
      } else {
        alert(response.message);
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
                            <td>
                              <b>{pizza.pizzaName}</b>
                            </td>
                            <td style={{ width: "30%" }}>
                              {pizza.pizzaDescription}
                            </td>
                            <td className="text-center">{pizza.discount}%</td>
                            <td style={{ width: "15%" }}>
                              <Link
                                className="btn btn-primary me-2"
                                to={`/admin/pizza-edit/${pizza.id}`}
                              >
                                View
                              </Link>
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
          {selection.drink && (
            <div className={`${style["dishes-container"]} shadow mx-auto`}>
              <h1>
                <b>Drink</b>
              </h1>
              <hr />
              <div className="my-4 text-end">
                <Link
                  className="btn btn-lg btn-success"
                  to={`/admin/dishes-adding/${0}`}
                >
                  + Add Drink
                </Link>
              </div>
              <div className={style["table-container"]}>
                {noDish.drink ? (
                  <p className="text-center text-danger">{noDish.message}</p>
                ) : (
                  <table className="table">
                    <thead className="fs-5">
                      <tr>
                        <th scope="col"></th>
                        <th scope="col">Drink</th>
                        <th scope="col">Description</th>
                        <th scope="col">Price</th>
                        <th scope="col" className="text-center">
                          Discount
                        </th>
                        <th>Official</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {dishesList
                        .filter((drink) => drink.dishesType === 0)
                        .map((dishes) => {
                          return (
                            <tr key={dishes.id}>
                              <td className={style["image-box"]}>
                                <img src={dishes.imageBase64} alt="dishes" />
                              </td>
                              <td style={{ width: "12%" }}>
                                <b>{dishes.name}</b>
                              </td>
                              <td style={{ width: "20%" }}>
                                {dishes.description}
                              </td>
                              <td>{Converter.toVND(dishes.price)} VNĐ</td>
                              <td className="text-center">
                                {dishes.discount}%
                              </td>
                              <td>
                                {Converter.toVND(dishes.officialPrice)} VNĐ
                              </td>
                              <td style={{ width: "15%" }}>
                                <Link
                                  className="btn btn-primary me-2"
                                  to={`/admin/dishes-edit/${dishes.id}`}
                                >
                                  View
                                </Link>
                                <button
                                  className="btn btn-outline-danger"
                                  onClick={() => {
                                    handleDeleteDishes(dishes.id);
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
          {selection.appetizer && (
            <div className={`${style["dishes-container"]} shadow mx-auto`}>
              <h1>
                <b>Appetizer</b>
              </h1>
              <hr />
              <div className="my-4 text-end">
                <Link
                  className="btn btn-lg btn-success"
                  to={`/admin/dishes-adding/${1}`}
                >
                  + Add Appetizer
                </Link>
              </div>
              <div className={style["table-container"]}>
                {noDish.appetizer ? (
                  <p className="text-center text-danger fs-3">
                    {noDish.message}
                  </p>
                ) : (
                  <table className="table">
                    <thead className="fs-5">
                      <tr>
                        <th scope="col"></th>
                        <th scope="col">Appetizer</th>
                        <th scope="col">Description</th>
                        <th scope="col">Price</th>
                        <th scope="col" className="text-center">
                          Discount
                        </th>
                        <th>Official</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {dishesList
                        .filter((appetizer) => appetizer.dishesType === 1)
                        .map((dishes) => {
                          return (
                            <tr key={dishes.id}>
                              <td className={style["image-box"]}>
                                <img src={dishes.imageBase64} alt="dishes" />
                              </td>
                              <td style={{ width: "12%" }}>
                                <b>{dishes.name}</b>
                              </td>
                              <td style={{ width: "20%" }}>
                                {dishes.description}
                              </td>
                              <td>{Converter.toVND(dishes.price)} VNĐ</td>
                              <td className="text-center">
                                {dishes.discount}%
                              </td>
                              <td>
                                {Converter.toVND(dishes.officialPrice)} VNĐ
                              </td>
                              <td style={{ width: "15%" }}>
                                <Link
                                  className="btn btn-primary me-2"
                                  to={`/admin/dishes-edit/${dishes.id}`}
                                >
                                  View
                                </Link>
                                <button
                                  className="btn btn-outline-danger"
                                  onClick={() => {
                                    handleDeleteDishes(dishes.id);
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
