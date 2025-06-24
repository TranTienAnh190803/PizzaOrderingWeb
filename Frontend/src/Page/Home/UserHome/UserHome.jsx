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

  useEffect(() => {
    fetchPizzaList();
  }, []);

  const handleSelection = (e) => {
    const id = e.currentTarget.id;
    setSelection({ [id]: true });
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
          <div className="carousel-item active">
            <img src={slider1} className="d-block w-100" alt="slider" />
          </div>
          <div className="carousel-item">
            <img src={slider2} className="d-block w-100" alt="slider" />
          </div>
          <div className="carousel-item">
            <img src={slider3} className="d-block w-100" alt="slider" />
          </div>
        </div>
        {/*  */}
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
        {/*  */}
      </div>
      <nav className={style["navbar2"]}>
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
        {selection.pizza && (
          <>
            {pizzaList.map((value, index) => {
              return (
                <div className={`${style["card"]} my-3`} key={index}>
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
      </div>
    </>
  );
}
