export const saveInLocalStorage = (name: string, data: object | string | [] | number) => {
  if (data && name) {
    localStorage.setItem(name, JSON.stringify(data));
  }
};

export const clearLocalStorage = () => {
  localStorage.clear();
};
