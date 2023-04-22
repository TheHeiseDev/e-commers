import { regexEmail, regexPhone } from "utils/constants/regex";
import React, { ChangeEvent, FocusEvent, useState, useEffect } from "react";

export type UseInputType = {
  isDirty: boolean;
  isEmpty: boolean;
  minLengthError: number;
  maxLengthError: number;
  emailError: boolean;
  inputValid: boolean;
  hasNumber: boolean;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setDirty: React.Dispatch<HTMLInputElement>;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
};
export type UseValidationType = {
  isDirty?: boolean;
  isEmpty: boolean;
  minLengthError: boolean;
  maxLengthError: boolean;
  emailError: boolean;
  inputValid: boolean;
  hasNumber: boolean;
};

export const useInput = (initialValue: string, validations: UseInputType) => {
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

export const useValidation = (
  value: string,
  validations: UseInputType
): UseValidationType => {
  const [isEmpty, setEmpty] = useState(true);
  const [minLengthError, setMinLengthError] = useState(false);
  const [maxLengthError, setMaxLengthError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [inputValid, setInputValid] = useState(false);
  const [hasNumber, setHasNumberError] = useState(false);

  useEffect(() => {
    for (const validation in validations) {
      if (validation === "minLengthError") {
        value.length < validations[validation]
          ? setMinLengthError(true)
          : setMinLengthError(false);
      } else if (validation === "maxLengthError") {
        value.length > 11 ? setMaxLengthError(true) : setMaxLengthError(false);
      }
      if (validation === "isEmpty") {
        value ? setEmpty(false) : setEmpty(true);
      }
      if (validation === "emailError") {
        //regular expression to check the correctness of entering an email address
        const regular = regexEmail;
        regular.test(String(value).toLowerCase())
          ? setEmailError(false)
          : setEmailError(true);
      }
      if (validation === "hasNumber") {
        // regular expression to check if a phone number is entered correctly
        const stringRegex = regexPhone;
        stringRegex.test(value) ? setHasNumberError(false) : setHasNumberError(true);
      }
    }
  }, [value]);

  useEffect(() => {
    if (isEmpty || maxLengthError || minLengthError || emailError || hasNumber) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [isEmpty, maxLengthError, minLengthError, emailError, hasNumber]);
  return {
    isEmpty,
    minLengthError,
    maxLengthError,
    emailError,
    inputValid,
    hasNumber,
  };
};
