import slider1 from "../../../assets/UserSlider1.jpg";
import slider2 from "../../../assets/UserSlider2.jpg";
import slider3 from "../../../assets/UserSlider3.jpg";

export default function UserHome() {
  return (
    <>
      <div id="carouselExampleIndicators" className="carousel slide">
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
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
          class="btn btn-dark rounded-circle position-absolute top-50 start-0 translate-middle-y pe-3 py-3 ms-3 z-1"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon"></span>
        </button>

        <button
          class="btn btn-dark rounded-circle position-absolute top-50 end-0 translate-middle-y ps-3 py-3 me-3 z-1"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon"></span>
        </button>
        {/*  */}
      </div>
    </>
  );
}
