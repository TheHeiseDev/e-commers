import { useEffect, useState } from "react";

import { useAppDispatch } from "../redux/store";
import { fetchFurnitures } from "../redux/slice/furnitureSlice/furnitureThunk";

import FurnitureList from "../components/FurnitureList/FurnitureList";
import Categories from "../components/Categories/Categories";
import Presentation from "../components/Presentation/Presentation";
import PopularCategoryList from "../components/PopularCategoryList/PopularCategoryList";

const Home = () => {
  const dispatch = useAppDispatch();

  const [categoyName, setCategoryName] = useState("");
  const [postLimit, setPostLimit] = useState(4);

  const handlePage = () => {
    setPostLimit((prev) => (prev += 4));
  };

  // fetchData from mockapi.io
  useEffect(() => {
    const category = `&category=${categoyName}`;

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
