import "./Categories.css";
import React from "react";

const Categories = ({ setCategory, categoyName }) => {
  const categories = [
    {
      key: "",
      name: "Всё",
    },
    {
      key: "chairs",
      name: "Стулья",
    },
    {
      key: "tables",
      name: "Столы",
    },
    {
      key: "sofa",
      name: "Диваны",
    },
    {
      key: "light",
      name: "Свет",
    },
  ];

  return (
    <ul className="categories">
      {categories.map((category) => (
        <li
          onClick={() => setCategory(category.key)}
          key={category.key}
          className={categoyName === category.key ? "active" : ""}
        >
          {category.name}
        </li>
      ))}
    </ul>
  );
};

export default Categories;
