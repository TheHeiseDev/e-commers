import { Link } from "react-router-dom";
import "./Presentation.css";

const Presentation: React.FC = () => {
  return (
    <div className="presentation">
      <Link to="/catalog">
        <button>Каталог товаров</button>
      </Link>
    </div>
  );
};

export default Presentation;
