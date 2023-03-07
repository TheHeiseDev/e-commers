import React from "react";
import { useSelector } from "react-redux";
import FurnitureItem from "../FurnitureItem/FurnitureItem";
import FurnitureSkeleton from "../FurnitureItem/FurnitureSkeleton";
import "./FurnitureList.css";

const FurnitureList = ({ handlePostLimitCart }) => {
  const { items, status } = useSelector((state) => state.furniture);

  return (
    <main className="furniture__wrapper">
      <div className="furniture__wrapper-item">
        {status === "loading" ? (
          [...Array(4)].map((_, index) => <FurnitureSkeleton key={index} />)
        ) : status === "success" ? (
          items.map((item) => <FurnitureItem key={item.id} item={item} />)
        ) : (
          <>
            <h4>Ошибка загрузки данных...</h4>
          </>
        )}
      </div>
      <div className="button__wrapper">
        {items.length < 8 && items.length >= 4 && (
          <button onClick={handlePostLimitCart}>Показать еще</button>
        )}
      </div>
    </main>
  );
};

export default FurnitureList;
