import "./App.css";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import MainLayout from "./layout/MainLayout";
import Loader from "./components/ui/Loader/Loader";
import { PrivateRouter } from "./utils/ router/privateRouter";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";

const FullFurniture = lazy(
  () =>
    import(/* webpachChunkName: "FullFurniture" */ "./pages/FullFurniture/FullFurniture")
);
const FullOrder = lazy(
  () => import(/* webpachChunkName: "FullOrder" */ "./pages/FullOrder/FullOrder")
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
        </Route>

        <Route path="" element={<Home />} />
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
