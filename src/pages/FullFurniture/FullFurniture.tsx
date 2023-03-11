import { useEffect, useState } from "react";
import "./FullFurniture.css";
import { useParams } from "react-router-dom";
import axios from "axios";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VerifiedIcon from "@mui/icons-material/Verified"; // товар в наличии
import FmdGoodIcon from "@mui/icons-material/FmdGood"; // на экспозиции
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"; //календарь
import LocalShippingIcon from "@mui/icons-material/LocalShipping"; // доставка
import Loader from "../../components/UI/Loader/Loader";

import LabTabs from "../../components/UI/Tabs/Tabs";
import Carousel from "../../components/UI/Carousel/Carousel";
import FurnitureItem from "../../components/FurnitureItem/FurnitureItem";
import FurnitureSkeleton from "../../components/FurnitureItem/FurnitureSkeleton";

import { useDispatch, useSelector } from "react-redux";
import { addOrder, selectOrderData } from "../../redux/slice/orderSlice/orderSlice";
import { FurnitureType } from "../../redux/slice/furnitureSlice/furnitueTypes";
import { searchCardInBasket } from "../../utils/searchCardInBasket";

const FullFurniture = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const orders = useSelector(selectOrderData);
  const [item, setItem] = useState<FurnitureType>();

  const checkItemInCart = item && searchCardInBasket(orders, item);

  const onAddToCart = () => {
    if (item) {
      dispatch(addOrder(item));
    }
  };

  // Fetching a product card
  useEffect(() => {
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
  useEffect(() => {
    if (item) {
      document.title = item.title ? item.title : "";
    }
  }, [item]);

  if (!item) {
    return <Loader />;
  }

  return (
    <>
      <div className="full-furniture">
        <div className="furniture__left">
          <img src={item.imageUrl} alt={item.title} />
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
