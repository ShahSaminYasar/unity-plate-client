import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const PrimaryLayout = () => {
  return (
    <>
      <Header />
      <div className="mt"></div>
      <Outlet />
      <Footer />
    </>
  );
};
export default PrimaryLayout;
