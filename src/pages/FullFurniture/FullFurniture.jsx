import React from "react";
import "./FullFurniture.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addOrder } from "../../redux/slice/orderSlice";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import VerifiedIcon from "@mui/icons-material/Verified"; // товар в наличии
import FmdGoodIcon from "@mui/icons-material/FmdGood"; // на экспозиции
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"; //календарь
import LocalShippingIcon from "@mui/icons-material/LocalShipping"; // доставка

import LabTabs from "../../components/Tabs/Tabs";
import Carousel from "../../components/Carousel/Carousel";
import FurnitureItem from "../../components/FurnitureItem/FurnitureItem";
import FurnitureSkeleton from "../../components/FurnitureItem/FurnitureSkeleton";
import Loader from "../../components/Loader/Loader";

const FullFurniture = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const orders = useSelector((state) => state.order.items);
  const [item, setItem] = React.useState({});

  const checkItemInCart = orders.some((item) => item.id === id);

  const onAddToCart = () => {
    dispatch(addOrder(item));
  };

  // Fetching a product card
  React.useEffect(() => {
    async function fetchFurnitureById() {
      const { data } = await axios.get(
        `https://63c3b1edf0028bf85f9c9068.mockapi.io/furniture/${id}`
      );

      setItem(data);
    }
    window.scrollTo(0, 0);
    fetchFurnitureById();
  }, [id]);

  // Setting the title of the html page
  React.useEffect(() => {
    document.title = item.title ? item.title : "";
  }, [item]);

  if (Object.keys(item) == false) {
    return <Loader />;
  }

  return (
    <>
      <div className="full-furniture">
        <div className="furniture__left">
          <img src={item.imageUrl} alt="item" />
        </div>
        <div className="furniture__right">
          <h2>{item.title}</h2>
          <div className="product__info">
            <span>Рейтинг: {item.rating}</span>
            <span>Код товара: {item.productCode}</span>
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
  );
};

export default FullFurniture;
