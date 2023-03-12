import "./FullFurniture.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VerifiedIcon from "@mui/icons-material/Verified"; // товар в наличии
import FmdGoodIcon from "@mui/icons-material/FmdGood"; // на экспозиции
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"; //календарь
import LocalShippingIcon from "@mui/icons-material/LocalShipping"; // доставка

import Loader from "../../components/ui/Loader/Loader";
import LabTabs from "../../components/ui/Tabs/Tabs";
import Carousel from "../../components/ui/Carousel/Carousel";
import HalfRating from "../../components/ui/Rating/Rating";
import FurnitureItem from "../../components/FurnitureItem/FurnitureItem";
import FurnitureSkeleton from "../../components/FurnitureItem/FurnitureSkeleton";

import { useAppDispatch } from "../../store/store";
import { addOrder, selectOrderData } from "../../store/slice/orderSlice/orderSlice";
import { selectFurnitureData } from "../../store/slice/furnitureSlice/furnitureSlice";
import { fetchFurnitureById } from "../../store/slice/furnitureSlice/furnitureThunk";

import { useTitle } from "../../hooks/useTitle";
import { searchCardInBasket } from "../../utils/searchCardInBasket";

const FullFurniture = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const orders = useSelector(selectOrderData);
  const { item, status } = useSelector(selectFurnitureData);

  const checkItemInCart = item && searchCardInBasket(orders, item);

  const onAddToCart = () => {
    if (item) {
      dispatch(addOrder(item));
    }
  };
  // Fetching a product card
  useEffect(() => {
    dispatch(fetchFurnitureById(id!));
    window.scrollTo(0, 0);
  }, [id]);

  // Setting the title of the html page
  useTitle(item?.title);
  if (!item) {
    return <Loader />;
  }
  return status === "loading" ? (
    <Loader />
  ) : status === "error" ? (
    <>
      <div className="full-furniture">
        <h2>Ошибка загрузки данных. Попробуйте обновить страницу</h2>
      </div>
    </>
  ) : status === "success" ? (
    <>
      <div className="full-furniture">
        <div className="furniture__left">
          <img src={item.imageUrl} alt={item.title} />
        </div>
        <div className="furniture__right">
          <h2>{item.title}</h2>
          <div className="product__info">
            <div>
              <HalfRating rating={item.rating} /> {item.rating}
            </div>
            <span>Артикул: {item.productCode}</span>
          </div>
          <div className="product__price">
            <b className="price">{item.price} $</b>
            {item.oldPrice && <b className="old__price">{item.oldPrice} $</b>}
          </div>

          <div className="product__action">
            <button
              onClick={onAddToCart}
              className={`add-to-cart ${checkItemInCart ? "active" : ""} `}
            >
              <AddShoppingCartIcon />
              {checkItemInCart ? "Из корзины" : "В корзину"}
            </button>
            <button className={`add-to-buy ${item.itemInStock ? "" : "disabled"}`}>
              Купить в 1 клик
            </button>
            <div className="add-to-favorite">
              <FavoriteBorderIcon />
            </div>
          </div>

          <div className="product__delivery">
            <div>
              <VerifiedIcon />
              <span>{item.itemInStock ? "Товар в налии" : "Нет в наличии"}</span>
            </div>

            <div>
              <FmdGoodIcon />
              <span>На экспозиции</span>
            </div>
            <div>
              <CalendarMonthIcon />
              <span>Доставка 1-3 дней</span>
            </div>
            <div>
              <LocalShippingIcon />
              <span>Стоимость доставки 690р.</span>
            </div>
          </div>
        </div>
      </div>
      <LabTabs />

      <Carousel>
        {item.recomendation
          ? item.recomendation.map((data) => <FurnitureItem key={data.id} item={data} />)
          : [...Array(4)].map((_, index) => <FurnitureSkeleton key={index} />)}
      </Carousel>
    </>
  ) : null;
};

export default FullFurniture;
