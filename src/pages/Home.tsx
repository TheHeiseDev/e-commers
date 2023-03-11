import { useEffect, useState } from "react";
import FurnitureList from "../components/FurnitureList/FurnitureList";
import Categories from "../components/Categories/Categories";
import Presentation from "../components/Presentation/Presentation";
import PopularCategoryList from "../components/PopularCategoryList/PopularCategoryList";

import { useAppDispatch } from "../redux/store";
import { fetchFurnitures } from "../redux/slice/furnitureSlice/furnitureThunk";

const Home = () => {
  const dispatch = useAppDispatch();

  const [categoyName, setCategoryName] = useState("");
  const [postLimit, setpostLimit] = useState(4);

  const handlePage = () => {
    setpostLimit((prev) => (prev += 4));
  };

  // fetchData from mockapi.io
  useEffect(() => {
    const category = categoyName && `&category=${categoyName}`;

    dispatch(fetchFurnitures({ category, postLimit }));
  }, [categoyName, postLimit]);

  // Set the title of the current page
  useEffect(() => {
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
