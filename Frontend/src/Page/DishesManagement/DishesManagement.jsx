import { LuCupSoda } from "react-icons/lu";
import Navbar from "../../Component/Navbar";
import style from "./DishesManagement.module.css";
import { FaBowlFood } from "react-icons/fa6";
import { GiFullPizza } from "react-icons/gi";
import { useState } from "react";

export default function DishesManagement() {
  const [selection, setSelection] = useState({
    pizza: true,
    drink: false,
    appetizer: false,
  });

  const handleClick = (e) => {
    const id = e.currentTarget.id;
    setSelection({ [id]: true });
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
      </div>
    </>
  );
}
