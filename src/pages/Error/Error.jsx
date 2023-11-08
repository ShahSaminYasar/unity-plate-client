import { NavLink, useRouteError } from "react-router-dom";
import Error404Gif from "../../assets/404.gif";
import Container from "../../layout/Container";
import useSettings from "../../hooks/useSettings";

const Error = () => {
  const error = useRouteError();
  const { primaryColor } = useSettings();

  //   console.error(error);

  return (
    <Container
      className={
        "page min-h-screen flex flex-col items-center justify-center gap-1 text-lg text-slate-900"
      }
    >
      <img src={Error404Gif} alt="" className="block w-full max-w-sm mx-auto" />
      <p>{error?.message}</p>
      <p>
        Back to{" "}
        <NavLink to="/" className={`${primaryColor}`}>
          Home
        </NavLink>
      </p>
    </Container>
  );
};
export default Error;
