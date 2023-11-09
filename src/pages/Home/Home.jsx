import { Helmet } from "react-helmet";
import FeaturedFoods from "../../components/FeaturedFoods/FeaturedFoods";
import Banner from "../../components/Banner/Banner";

const Home = () => {
  return (
    <main>
      <Helmet>
        <title>Home | Unity Plate</title>
      </Helmet>
      <Banner />
      <FeaturedFoods />
    </main>
  );
};
export default Home;
