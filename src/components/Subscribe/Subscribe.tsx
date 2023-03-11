import { useState, useEffect, useRef, useCallback } from "react";
import "./Subscribe.css";
import { AiOutlineMail } from "react-icons/ai";
import { selectList, SelectListType } from "../../constants/subscribeItem";
import { useInput } from "../../hooks/validateForm";

const Subscribe = () => {
  const [selectValue, setSelectValue] = useState("Email рассылка");
  const [openDropDown, setOpenDropDown] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const email = useInput("", { isEmpty: true, minLength: 10, emailError: false });
  const phone = useInput("", {
    isEmpty: true,
    minLength: 11,
    maxLength: 11,
    hasStrings: false,
  });

  const titleSelect = selectValue;

  const handleSelect = (el: SelectListType) => {
    setSelectValue(el.value);
    setOpenDropDown(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selectValue === "Email рассылка") {
      email.setValue("");
      email.setDirty(false);
    }
    if (selectValue === "Sms рассылка") {
      phone.setValue("");
      phone.setDirty(false);
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
    email.setDirty(false);
    phone.setDirty(false);
  }, [selectValue]);
  function renderValidationMessage(input: any) {
    const { isDirty, isEmpty, minLengthError, maxLengthError, emailError, hasStrings } =
      input;
    let errorMessage = null;
    if (isDirty) {
      if (isEmpty) errorMessage = "Поле не может быть пустым";
      else if (minLengthError) errorMessage = "Некорректная минимальная длина символов";
      else if (maxLengthError) errorMessage = "Некорректная максимальная длина символов ";
      else if (emailError) errorMessage = "Некорректный email";
      else if (hasStrings) errorMessage = "Поле (Телефон) не должно содержать строки";
      input.inputValid = !errorMessage;
    }
    return errorMessage ? <p style={{ color: "red" }}>{errorMessage}</p> : null;
  }

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
            {selectValue === "Email рассылка" ? (
              <div className="validate">{renderValidationMessage(email)}</div>
            ) : (
              <div className="validate">{renderValidationMessage(phone)}</div>
            )}
            {selectValue === "Email рассылка" ? (
              <input
                onChange={(e) => email.onChange(e)}
                onBlur={(e) => email.onBlur(e)}
                value={email.value}
                type="text"
                placeholder="Email..."
              />
            ) : (
              <input
                onChange={(e) => phone.onChange(e)}
                onBlur={(e) => phone.onBlur(e)}
                value={phone.value}
                type="text"
                placeholder="Телефон в формате 8..."
              />
            )}

            {selectValue === "Email рассылка" ? (
              <button
                className={!email.inputValid ? "form-button-disabled" : ""}
                type="submit"
              >
                ОК
              </button>
            ) : (
              <button
                className={!phone.inputValid ? "form-button-disabled" : ""}
                type="submit"
              >
                ОК
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Subscribe;
