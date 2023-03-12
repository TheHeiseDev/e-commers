import { HTMLAttributes } from "react";
import "./Carousel.css";

const PAGE_WIDTH = 450;

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
