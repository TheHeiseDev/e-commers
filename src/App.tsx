import "./App.css";
import { Route, Routes } from "react-router-dom";

import FullFurniture from "./pages/FullFurniture/FullFurniture";
import FullOrder from "./pages/FullOrder.jsx/FullOrder";
import Home from "./pages/Home";
import MainLayout from "./layout/MainLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/order" element={<FullOrder />} />
        <Route path="/furniture/:id" element={<FullFurniture />} />
      </Route>
    </Routes>
  );
}

export default App;
