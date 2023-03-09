import React from "react";
import FurnitureList from "../components/FurnitureList/FurnitureList";
import Categories from "../components/Categories/Categories";
import Presentation from "../components/Presentation/Presentation";
import PopularCategoryList from "../components/PopularCategoryList/PopularCategoryList";
import { fetchFurnitures } from "../redux/slice/furnitureSlice/furnitureSlice";
import { useAppDispatch } from "../redux/store";

const Home = () => {
  const dispatch = useAppDispatch();

  const [categoyName, setCategoryName] = React.useState("");
  const [postLimit, setpostLimit] = React.useState(4);

  const handlePage = () => {
    setpostLimit((prev) => (prev += 4));
  };

  // fetchData from mockapi.io
  React.useEffect(() => {
    const category = categoyName && `&category=${categoyName}`;

    dispatch(fetchFurnitures({ category, postLimit }));
  }, [categoyName, postLimit]);

  // Set the title of the current page
  React.useEffect(() => {
    document.title = "Главная";
  }, []);

  return (
    <>
      <Presentation />
      <Categories setCategory={setCategoryName} categoyName={categoyName} />
      <FurnitureList handlePostLimitCart={handlePage} />
      <PopularCategoryList />
    </>
  );
};

export default Home;
