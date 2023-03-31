import "./Carousel.css";
import { HTMLAttributes } from "react";

const Carousel = ({ children }: HTMLAttributes<HTMLElement>) => {
  return (
    <>
      <h2 className="carousel-title">С этим товаром покупают</h2>
      <div className="carousel-container">
        <div className="carousel-window">
          <div className="carousel-all-pages">{children}</div>
        </div>
      </div>
    </>
  );
};
export default Carousel;
