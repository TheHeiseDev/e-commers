import { PopulaCategoryType } from "../../../constants/productCategories";

type PopularSmallCardProps = {
  item: PopulaCategoryType[];
};
const PopularSmallCard = ({ item }: PopularSmallCardProps) => {
  return (
    <>
      {item.map((popularItem) => (
        <section key={popularItem.id} className="popular__sofa">
          <img src={popularItem.imageUrl} alt="Товар" />
          <p>{popularItem.title}</p>
          <ul className="category__sofa">
            {popularItem.variable.map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
};

export default PopularSmallCard;