import { Outlet } from "react-router-dom";
import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";
import Subscribe from "components/Subscribe/Subscribe";

const MainLayout = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Outlet />
      </div>
      <Subscribe />
      <Footer />
    </div>
  );
};

export default MainLayout;
