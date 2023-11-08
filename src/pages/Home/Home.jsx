import { Helmet } from "react-helmet";
import FeaturedFoods from "../../components/FeaturedFoods/FeaturedFoods";

const Home = () => {
  return (
    <main>
      <Helmet>
        <title>Home | Unity Plate</title>
      </Helmet>
      <FeaturedFoods />
    </main>
  );
};
export default Home;
