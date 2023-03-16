import "./FullFurniture.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

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
import { selectFurnitureByIdData } from "../../store/slice/furnitureSlice/furnitureSlice";
import { fetchFurnitureById } from "../../store/slice/furnitureSlice/furnitureThunk";

import { useTitle } from "../../hooks/use-title";
import { searchCardInBasket } from "../../utils/searchCardInBasket";

const FullFurniture = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const orders = useSelector(selectOrderData);
  const { data, status } = useSelector(selectFurnitureByIdData);

  const checkItemInCart = data && searchCardInBasket(orders, data);

  const onAddToCart = () => {
    if (data) {
      dispatch(addOrder(data));
    }
  };
  // Fetching a product card
  useEffect(() => {
    if (id) {
      dispatch(fetchFurnitureById(id));
    }
    window.scrollTo(0, 0);
  }, [id]);

  // If the product was not found by the passed id, then we redirect to the main page
  useEffect(() => {
    if (status === "error") {
      navigate("/", { replace: false });
    }
  }, [status]);

  // Setting the title of the html page
  useTitle(data?.title);

  if (!data) {
    return <Loader />;
  }

  return (
    <>
      <div className="full-furniture">
        <div className="furniture__left">
          <img src={data.imageUrl} alt={data.title} />
        </div>
        <div className="furniture__right">
          <h2>{data.title}</h2>
          <div className="product__info">
            <div>
              <HalfRating rating={data.rating} /> {data.rating}
            </div>
            <span>Артикул: {data.productCode}</span>
          </div>
          <div className="product__price">
            <b className="price">{data.price} $</b>
            {data.oldPrice && <b className="old__price">{data.oldPrice} $</b>}
          </div>

          <div className="product__action">
            <button
              onClick={onAddToCart}
              className={`add-to-cart ${checkItemInCart ? "active" : ""} `}
            >
              <AddShoppingCartIcon />
              {checkItemInCart ? "Из корзины" : "В корзину"}
            </button>
            <button className={`add-to-buy ${data.itemInStock ? "" : "disabled"}`}>
              Купить в 1 клик
            </button>
            <div className="add-to-favorite">
              <FavoriteBorderIcon />
            </div>
          </div>

          <div className="product__delivery">
            <div>
              <VerifiedIcon />
              <span>{data.itemInStock ? "Товар в налии" : "Нет в наличии"}</span>
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
        {data.recomendation
          ? data.recomendation.map((data) => <FurnitureItem key={data.id} item={data} />)
          : [...Array(4)].map((_, index) => <FurnitureSkeleton key={index} />)}
      </Carousel>
    </>
  );
};

export default FullFurniture;
