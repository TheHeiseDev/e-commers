import { useState, useEffect, useRef } from "react";
import "./Subscribe.css";
import { AiOutlineMail } from "react-icons/ai";
import { validateEmail, validatePhone } from "../../utils/validateForm";
import { selectList, SelectListType } from "../../constants/subscribeItem";

const Subscribe = () => {
  const [value, setValue] = useState("");
  const [selectValue, setSelectValue] = useState("Email рассылка");
  const [openDropDown, setOpenDropDown] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const titleSelect = selectValue;
  const dynamicPlaceholder =
    selectValue === "Sms рассылка" ? "Введите номер телефона  +7(...)" : "Email";

  const changeInputValue = (value: string) => {
    setValue(value);
  };
  const handleSelect = (el: SelectListType) => {
    setSelectValue(el.value);
    setOpenDropDown(false);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const checkEmail = validateEmail(value);
    const checkPhone = validatePhone(value);

    if (selectValue === "Email рассылка") {
      if (value) {
        if (checkEmail) {
          alert("Подписка оформлена!");
          setValue("");
        } else {
          alert("Введите корректный адрес почты");
        }
      }
    }
    if (selectValue === "Sms рассылка") {
      if (value) {
        if (checkPhone) {
          alert("Спасибо за подписку");
          setValue("");
        } else {
          alert("Номер должен начинаться с +7 и содержать не более 12 символов");
        }
      }
    }
  };

  // Closing the pop-up when clicking on body and when clicking on escape
  useEffect(() => {
    const handleClickEvent = (event: MouseEvent) => {
      const path = selectRef.current && event.composedPath().includes(selectRef.current);

      if (!path) {
        setOpenDropDown(false);
      }
    };
    const handleKeyEvent = (event: KeyboardEvent) => {
      const path = selectRef.current && event.composedPath().includes(selectRef.current);
      if (event.key === "Escape") {
        if (path) {
          setOpenDropDown(false);
        }
      }
    };
    document.body.addEventListener("click", handleClickEvent);
    document.body.addEventListener("keyup", handleKeyEvent);

    return () => {
      document.body.removeEventListener("click", handleClickEvent);
      document.body.removeEventListener("keyup", handleKeyEvent);
    };
  }, []);

  useEffect(() => {
    setValue("");
  }, [selectValue]);

  return (
    <div className="subscripe">
      <div className="subscripe__wrapper">
        <div className="subscribe__title">
          <AiOutlineMail />
          <h3> Узнай об акции первым! Подпишись на нашу рассылку.</h3>
        </div>

        <form action="" className="sub__form" onSubmit={handleSubmit}>
          <div ref={selectRef} className="form-group">
            <div className="dropdown">
              <button
                onClick={() => setOpenDropDown(!openDropDown)}
                className={`dropdown__button ${openDropDown ? "active" : ""}`}
              >
                {titleSelect}
              </button>
              {openDropDown && (
                <ul className="dropdown__list">
                  {selectList.map((el) => (
                    <li
                      key={el.dataValue}
                      className="dropdown__list-item"
                      onClick={() => handleSelect(el)}
                    >
                      {el.value}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="sub__form-input">
            <input
              value={value}
              onChange={(e) => changeInputValue(e.target.value)}
              type="tel"
              placeholder={dynamicPlaceholder}
            />
            <button type="submit">ОК</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Subscribe;
