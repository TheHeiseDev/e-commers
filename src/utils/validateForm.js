export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailRegex.test(email)) {
    return true;
  } else {
    return false;
  }
};

export const validatePhone = (phone) => {
  const phoneRegex = /^\+\d{11}$/;

  if (phoneRegex.test(phone)) {
    return true;
  } else {
    return false;
  }
};
