import { useRef, useState } from "react";
import Navbar from "../../Component/Navbar";
import style from "./PizzaAdding.module.css";
import defaultImage from "../../assets/DefaultImage.jpg";
import Footer from "../../Component/Footer";

export default function PizzaAdding() {
  document.title = "Pizza Adding";
  const imageRef = useRef();
  const [prices, setPrice] = useState([
    { size: "Small", enum: 0, checkBox: false },
    { size: "Medium", enum: 1, checkBox: false },
    { size: "Large", enum: 2, checkBox: false },
    { size: "Extra Large", enum: 3, checkBox: false },
  ]);

  const handleCheckBox = (e, i) => {
    const check = e.target.checked;

    setPrice((prevPrices) => {
      return prevPrices.map((value, index) => {
        return index === i ? { ...value, checkBox: check } : value;
      });
    });
  };

  return (
    <>
      <Navbar />
      <div className={style["wrapper"]}>
        <div className={`${style["pizza-form"]} shadow my-5`}>
          <h1>
            <b>Add Pizza</b>
          </h1>
          <hr />
          <form>
            <h4 className="mt-4">
              <b>- Basic Information: </b>
            </h4>
            <div className={`${style["input-container"]} p-4`}>
              <div className={style["input-box"]} style={{ flexBasis: "30%" }}>
                <p>
                  <b>Name: </b>
                </p>
                <input
                  type="text"
                  name="pizzaName"
                  className="form-control border-secondary"
                />
              </div>
              <div className={style["input-box"]} style={{ flexBasis: "50%" }}>
                <p>
                  <b>Description: </b>
                </p>
                <input
                  type="text"
                  name="pizzaDescription"
                  className="form-control border-secondary"
                />
              </div>
              <div className={style["input-box"]}>
                <p>
                  <b>Discount (%): </b>
                </p>
                <input
                  type="number"
                  name="discount"
                  min={0}
                  max={100}
                  className="form-control border-secondary"
                />
              </div>
            </div>
            <h4 className="mt-5">
              <b>- Size and Price: </b>
            </h4>
            <div className={`${style["input-container"]} p-4`}>
              {prices.map((value, index) => {
                return (
                  <div className={style["input-box"]}>
                    <p>
                      <label>
                        <input
                          type="checkbox"
                          className="form-check-input border-secondary me-1"
                          value={index}
                          onChange={(e) => {
                            handleCheckBox(e, index);
                          }}
                        />{" "}
                        <b>{value.size}</b>
                      </label>
                    </p>
                    <input
                      type="number"
                      name="price"
                      className="form-control border-secondary"
                      disabled={!value.checkBox}
                    />
                  </div>
                );
              })}
            </div>
            <h4 className="mt-5">
              <b>- Image: </b>{" "}
              <input
                type="file"
                ref={imageRef}
                name="image"
                style={{ display: "none" }}
              />
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={() => {
                  imageRef.current.click();
                }}
              >
                Upload
              </button>
            </h4>
            <div className="text-center">
              <img src={defaultImage} alt="" />
            </div>
            <div className="text-end p-4">
              <button className="btn btn-lg btn-success">Add Pizza</button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
