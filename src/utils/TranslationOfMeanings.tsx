export const categories = {
  sofa: {
    type: "sofa",
    value: "Диваны",
  },
  tables: {
    type: "tables",
    value: "Столы",
  },
  chairs: {
    type: "chairs",
    value: "Стулья",
  },
};
export const setCategiesName = (category: string) => {
  let returnTranslateName = "Другая";
  if (category === categories.sofa.type) {
    returnTranslateName = categories.sofa.value;
  }
  if (category === categories.tables.type) {
    returnTranslateName = categories.tables.value;
  }
  if (category === categories.chairs.type) {
    returnTranslateName = categories.chairs.value;
  }
  return returnTranslateName;
};


export const manufacturers = {
  ukraine: {
    type: "Ukraine",
    value: "Украина",
  },
  france: {
    type: "France",
    value: "Франция",
  },
  germany: {
    type: "Germany",
    value: "Германия",
  },
  italy: {
    type: "Italy",
    value: "Италия",
  },
};
export const setManufacturerName = (manufacturer: string) => {
  let returnTranslateName = "Другая";
  if (manufacturer === manufacturers.ukraine.type) {
    returnTranslateName = manufacturers.ukraine.value;
  }
  if (manufacturer === manufacturers.france.type) {
    returnTranslateName = manufacturers.france.value;
  }
  if (manufacturer === manufacturers.germany.type) {
    returnTranslateName = manufacturers.germany.value;
  }
  if (manufacturer === manufacturers.italy.type) {
    returnTranslateName = manufacturers.italy.value;
  }

  return returnTranslateName;
};
