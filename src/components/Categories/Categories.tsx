import "./Categories.css";
import { categories } from "utils/constants/productCategories";

interface ICategoriesProps {
  categoyName: string;
  setCategory: (key: string) => void;
}

const Categories = ({ setCategory, categoyName }: ICategoriesProps) => {
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
