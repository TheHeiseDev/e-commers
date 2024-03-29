import "./Header.css";
import { memo, useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { selectOrderData } from "store/slice/orderSlice/orderSlice";

import { useCalculateTotalPrice } from "hooks/use-totalPrice";
import { useAuth } from "hooks/use-auth";
import { menuList } from "utils/constants/menuList";

import Order from "../Order/Order";
import { FaShoppingBag } from "react-icons/fa";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";



const Header = memo(() => {
  const orders = useSelector(selectOrderData);
  const { pathname } = useLocation();
  const { isAuth } = useAuth();
  const { totalPrice } = useCalculateTotalPrice();

  const [cartOpen, setCartOpen] = useState(false);
  const [cartOpenMobile, setCartOpenMobile] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const orderRef = useRef(null);
  const orderRefDouble = useRef(null);

  const hiddenBody = () => {
    if (openMenu) {
      window.document.body.style.overflow = "hidden";
    } else {
      window.document.body.style.overflow = "";
    }
  };
  const handleGoToCart = () => {
    setCartOpen(false);
    setCartOpenMobile(false);
  };
  const handleBurger = () => {
    if (window.innerWidth <= 567) {
      setOpenMenu(!openMenu);
    } else {
    }
    setCartOpenMobile(false);
  };
  const handleClickEvent = (event: MouseEvent) => {
    const path = orderRef.current && event.composedPath().includes(orderRef.current);
    const pathDouble =
      orderRefDouble.current && event.composedPath().includes(orderRefDouble.current);
    if (!path) {
      setCartOpen(false);
    }
    if (pathDouble) {
      setCartOpen(true);
    }
  };
  const handleKeyEvent = (event: KeyboardEvent) => {
    const path = orderRef.current && event.composedPath().includes(orderRef.current);
    if (event.key === "Escape") {
      if (!path) {
        setCartOpen(false);
      }
    }
  };
  // Closing the pop-up when clicking on body and when clicking on escape
  useEffect(() => {
    document.body.addEventListener("click", handleClickEvent);
    document.body.addEventListener("keyup", handleKeyEvent);

    return () => {
      document.body.removeEventListener("click", handleClickEvent);
      document.body.removeEventListener("keyup", handleKeyEvent);
    };
  }, []);

  useEffect(() => {
    hiddenBody();
  }, [openMenu]);

  const renderTotalCount = () => {
    if (totalPrice > 0 && pathname !== "/order") {
      return <span className="total__price">{totalPrice} $</span>;
    }
  };

  return (
    <header>
      <div className="header__wrapper">
        <FaShoppingBag
          onClick={() => setCartOpenMobile((cartOpenMobile) => !cartOpenMobile)}
          className={`shop-cart-button-mobile ${cartOpenMobile && "active"}`}
        />

        <Link to="/">
          <span className="logo">House Staff</span>
        </Link>

        <nav className={openMenu ? "header__menu active" : "header__menu"}>
          <ul ref={orderRef} className="menu__item nav">
            {pathname !== "/order" && (
              <FaShoppingBag
                onClick={() => setCartOpen((cartOpen) => !cartOpen)}
                className={`shop-cart-button ${cartOpen && "active"}`}
              />
            )}
            {renderTotalCount()}
            {menuList.map((item, index) => (
              <Link key={index} to={item.link}>
                <li className="menu__link" onClick={handleBurger}>
                  {item.title}
                </li>
              </Link>
            ))}
            <Link to="/user">
              <AccountCircleIcon
                onClick={handleBurger}
                className={`header__menu-user ${isAuth ? "active" : ""}`}
              />
            </Link>
          </ul>
        </nav>
        {cartOpen && (
          <div ref={orderRefDouble} className="shop-cart">
            {orders.length > 0 ? (
              orders.map((order) => (
                <Order
                  closeMenu={setCartOpen}
                  closeMenuMobile={setCartOpenMobile}
                  key={order.id}
                  item={order}
                />
              ))
            ) : (
              <div className="empty">
                <h2>В корзине: </h2>
                <h2>0 товаров </h2>
              </div>
            )}
            {orders.length > 0 && (
              <>
                <hr />
                <div className="shop-cart-info">
                  <p className="summa">Сумма: {totalPrice} $</p>
                  <p className="item-count summa">Количество: {orders.length}</p>
                </div>
              </>
            )}
            <Link to="/order">
              <div onClick={handleGoToCart} className="shop-cart-action">
                <p>Перейти в корзину: </p>
                <span>{">"}</span>
              </div>
            </Link>
          </div>
        )}

        {cartOpenMobile && (
          <div className="shop-cart">
            {orders.length > 0 ? (
              orders.map((order) => (
                <Order
                  closeMenu={setCartOpen}
                  closeMenuMobile={setCartOpenMobile}
                  key={order.id}
                  item={order}
                />
              ))
            ) : (
              <div className="empty">
                <h2>В корзине: </h2>
                <h2>0 товаров </h2>
              </div>
            )}

            {orders.length > 0 && (
              <>
                <hr />
                <div className="shop-cart-info">
                  <p className="summa">Сумма: {totalPrice} $</p>
                  <p className="item-count summa">Количество: {orders.length}</p>
                </div>
              </>
            )}
            <Link to="/order">
              <div onClick={handleGoToCart} className="shop-cart-action">
                <p>Перейти в корзину: </p>
                <span>{">"}</span>
              </div>
            </Link>
          </div>
        )}
        <div
          onClick={handleBurger}
          className={openMenu ? "header__burger active" : "header__burger"}
        >
          <span></span>
        </div>
      </div>
    </header>
  );
});

export default Header;
