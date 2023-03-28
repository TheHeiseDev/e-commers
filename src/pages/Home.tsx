import { useEffect, useState } from "react";
import { useAppDispatch } from "store/store";
import { fetchFurnitures } from "store/slice/furnitureSlice/furnitureThunk";

import FurnitureList from "components/FurnitureList/FurnitureList";
import Categories from "components/Categories/Categories";
import Presentation from "components/Presentation/Presentation";
import PopularCategoryList from "components/PopularCategoryList/PopularCategoryList";

import { useTitle } from "hooks/use-title";

const Home = () => {
  const dispatch = useAppDispatch();

  const [categoyName, setCategoryName] = useState<string>("");
  const [postLimit, setPostLimit] = useState<number>(4);

  const handlePage = () => {
    setPostLimit((prev) => (prev += 4));
  };

  // fetchData from mockapi.io
  useEffect(() => {
    const category = categoyName;
    dispatch(fetchFurnitures({ category, postLimit }));
  }, [categoyName, postLimit]);

  // Set the title of the current page
  useTitle("House Staff");

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
