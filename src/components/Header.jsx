import React from "react";
import { FaShoppingBag } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Order from "./Order/Order";

const Header = () => {
  const orders = useSelector((state) => state.order.items);

  const [cartOpen, setCartOpen] = React.useState(false);
  const [cartOpenMobile, setCartOpenMobile] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState(false);
  const orderRef = React.useRef(null);
  const orderRefDouble = React.useRef(null);

  const totalPrice = orders
    .reduce((sum, item) => sum + parseFloat(item.price), 0)
    .toFixed(2);

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
    setOpenMenu(!openMenu);
    setCartOpenMobile(false);
  };

  const handleClickEvent = (event) => {
    const path = event.composedPath().includes(orderRef.current);
    const pathDouble = event.composedPath().includes(orderRefDouble.current);
    if (!path) {
      setCartOpen(false);
    }
    if (pathDouble) {
      setCartOpen(true);
    }
  };
  const handleKeyEvent = (event) => {
    const path = event.composedPath().includes(orderRef.current);
    if (event.key === "Escape") {
      if (!path) {
        setCartOpen(false);
      }
    }
  };
  // Closing the pop-up when clicking on body and when clicking on escape
  React.useEffect(() => {
    document.body.addEventListener("click", handleClickEvent);
    document.body.addEventListener("keyup", handleKeyEvent);

    return () => {
      document.body.removeEventListener("click", handleClickEvent);
      document.body.removeEventListener("keyup", handleKeyEvent);
    };
  }, []);

  React.useEffect(() => {
    hiddenBody();
  }, [openMenu]);

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
            <FaShoppingBag
              onClick={() => setCartOpen((cartOpen) => !cartOpen)}
              className={`shop-cart-button ${cartOpen && "active"}`}
            />
            {totalPrice > 0 && <span className="total__price">{totalPrice} $</span>}

            <li className="menu__link">Избранное</li>
            <Link to="/order">
              <li className="menu__link">Корзина</li>
            </Link>
            <li className="menu__link">Кабинет</li>
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
};

export default Header;
