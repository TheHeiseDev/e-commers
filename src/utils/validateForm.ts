export const validateEmail = (email: string): boolean => {
  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailRegex.test(email)) {
    return true;
  } else {
    return false;
  }
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex: RegExp = /^\+\d{11}$/;

  if (phoneRegex.test(phone)) {
    return true;
  } else {
    return false;
  }
};
