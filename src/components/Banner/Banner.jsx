import { NavLink } from "react-router-dom";
import HeroSvg from "../../assets/hero.png"
import Container from "../../layout/Container";
import useSettings from "../../hooks/useSettings";

const Banner = () => {
    const {bgColorAlt} = useSettings()
    return (
      <div className={`${bgColorAlt}`}>
        <Container className="grid md:grid-cols-2 md:py-20 gap-10 items-center py-10 px-3">
          <div>
            <img
              src={HeroSvg}
              alt=""
              className="block w-full max-w-md mx-auto"
            />
          </div>
          <div className="flex flex-col items-start gap-3">
            <h2 className="text-5xl font-bold text-white">
              The November
              <br />
              <span className="text-lime-400">Donation Campaign</span>
              <br />
              is on!
            </h2>
            <p className="text-lg font-medium text-neutral-200 block text-left">
              Donate your excess food for the community. Say no to food wastage
              and help keep a balance in the society.
            </p>
            <NavLink
              to="add-food"
              className="rounded-md py-3 px-4 bg-lime-400 text-lg font-medium text-teal-800 block w-fit"
            >
              Add Food
            </NavLink>
          </div>
        </Container>
      </div>
    );
}
export default Banner;