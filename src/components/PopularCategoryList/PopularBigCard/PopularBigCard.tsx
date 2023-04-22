import { PopulaCategoryType } from "utils/constants/productCategories";

interface IPopularBigCardProps {
  item: PopulaCategoryType[];
}
const PopularBigCard = ({ item }: IPopularBigCardProps) => {
  return (
    <div className="popular__wrapper-big">
      {item.map((popularItem) => (
        <section key={popularItem.id} className="popular__sofa">
          <img src={popularItem.imageUrl} alt="Диваны" />
          <p>{popularItem.title}</p>
          <ul className="category__sofa">
            {popularItem.variable.map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
};

export default PopularBigCard;
