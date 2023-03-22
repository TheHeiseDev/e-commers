import "./App.css";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import MainLayout from "./layout/MainLayout";
import Loader from "./components/ui/Loader/Loader";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import UserPage from "./pages/UserPage/UserPage";
import { PrivateRouter } from "./utils/ router/privateRouter";
// import Catalog from "pages/Catalog/Catalog";

const FullFurniture = lazy(
  () =>
    import(/* webpachChunkName: "FullFurniture" */ "pages/FullFurniture/FullFurniture")
);
const FullOrder = lazy(
  () => import(/* webpachChunkName: "FullOrder" */ "pages/FullOrder/FullOrder")
);
const FullFavorite = lazy(
  () => import(/* webpachChunkName: "FullFavorite" */ "pages/FullFavorite/FullFavorite")
);
const Catalog = lazy(
  () => import(/* webpachChunkName: "Catalog" */ "pages/Catalog/Catalog")
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route element={<PrivateRouter />}>
          <Route
            path="/order"
            element={
              <Suspense fallback={<Loader />}>
                <FullOrder />
              </Suspense>
            }
          />
          <Route
            path="/favorite"
            element={
              <Suspense fallback={<Loader />}>
                <FullFavorite />
              </Suspense>
            }
          />
          <Route path="/user" element={<UserPage />} />
        </Route>

        <Route path="" element={<Home />} />
        <Route
          path="/catalog"
          element={
            <Suspense fallback={<Loader />}>
              {" "}
              <Catalog />
            </Suspense>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/furniture/:id"
          element={
            <Suspense fallback={<Loader />}>
              <FullFurniture />
            </Suspense>
          }
        />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
