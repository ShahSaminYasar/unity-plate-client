import { useState } from "react";
import Container from "../../../layout/Container";
import useSettings from "../../../hooks/useSettings";
import Title from "../../../components/Title/Title";
import GoogleBtn from "../../../components/GoogleBtn/GoogleBtn";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  let location = useLocation();
  location = location?.state || "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { borderColor, bgColorAlt } = useSettings();
  const { loginWithEmailPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastLoggingIn = toast.loading("Logging in...");
    try {
      loginWithEmailPassword(email, password)
        .then(() => {
          toast.success("Logged in", { id: toastLoggingIn });
          navigate(location);
        })
        .catch((error) => toast.error(error?.message, { id: toastLoggingIn }));
    } catch (error) {
      console.error(error);
      toast.error(error?.message, { id: toastLoggingIn });
    }
  };

  return (
    <Container className="section">
      <form
        onSubmit={handleSubmit}
        className={`flex flex-col gap-4 p-4 rounded-lg border-4 border-b-8 ${borderColor} w-full max-w-sm text-lg`}
      >
        <Title>Login</Title>
        <input
          type="email"
          placeholder="Email"
          required
          autoComplete="true"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`border-2 ${borderColor} p-2 rounded-md outline-none`}
        />
        <input
          type="password"
          placeholder="Password"
          required
          autoComplete="true"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`border-2 ${borderColor} p-2 rounded-md outline-none`}
        />
        <button
          type="submit"
          className={`${bgColorAlt} text-white py-3 px-3 rounded-md`}
        >
          Login
        </button>
        <p>
          New to this site?{" "}
          <NavLink className={"text-indigo-700"} to="/register">
            Register
          </NavLink>
        </p>
        <div className="w-full flex flex-row gap-1 items-center justify-center">
          <span className="w-full h-[2px] bg-neutral-300 block"></span>
          <span className="text-neutral-600">or</span>
          <span className="w-full h-[2px] bg-neutral-300 block"></span>
        </div>
        <GoogleBtn />
      </form>
    </Container>
  );
};
export default Login;
