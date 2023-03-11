import { ChangeEvent, FocusEvent, useState, useEffect } from "react";

export const useInput = (initialValue: string, validations: any) => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setDirty] = useState(false);
  const valid = useValidation(value, validations);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onBlur = (e: FocusEvent<HTMLInputElement>) => {
    setDirty(true);
  };

  return {
    value,
    setValue,
    onChange,
    setDirty,
    onBlur,
    isDirty,
    ...valid,
  };
};
export const useValidation = (value: string, validations: any) => {
  const [isEmpty, setEmpty] = useState(true);
  const [minLengthError, setMinLengthError] = useState(false);
  const [maxLengthError, setMaxLengthError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [inputValid, setInputValid] = useState(false);

  useEffect(() => {
    for (const validation in validations) {
      if (validation === "minLength") {
        value.length < validations[validation]
          ? setMinLengthError(true)
          : setMinLengthError(false);
      } else if (validation === "maxLength") {
        value.length > 15 ? setMaxLengthError(true) : setMaxLengthError(false);
      } else if (validation === "isEmpty") {
        value ? setEmpty(false) : setEmpty(true);
      } else if (validation === "emailError") {
        const regular =
          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        regular.test(String(value).toLowerCase())
          ? setEmailError(false)
          : setEmailError(true);
      }
    }
  }, [value]);

  useEffect(() => {
    if (isEmpty || maxLengthError || minLengthError || emailError) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [isEmpty, maxLengthError, minLengthError, emailError]);
  return {
    isEmpty,
    minLengthError,
    maxLengthError,
    emailError,
    inputValid,
  };
};