import "./App.css";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import MainLayout from "./layout/MainLayout";
import Loader from "./components/UI/Loader/Loader";

const FullFurniture = lazy(
  () =>
    import(/* webpachChunkName: "FullFurniture" */ "./pages/FullFurniture/FullFurniture")
);
const FullOrder = lazy(
  () => import(/* webpachChunkName: "FullOrder" */ "./pages/FullOrder.jsx/FullOrder")
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="/order"
          element={
            <Suspense fallback={<Loader />}>
              <FullOrder />
            </Suspense>
          }
        />
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
