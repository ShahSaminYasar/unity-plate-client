import { useState } from "react";
import Container from "../../../layout/Container";
import useSettings from "../../../hooks/useSettings";
import Title from "../../../components/Title/Title";
import GoogleBtn from "../../../components/GoogleBtn/GoogleBtn";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import useAxios from "../../../hooks/useAxios";
import { Helmet } from "react-helmet";

const Register = () => {
  const axios = useAxios();
  const navigate = useNavigate();
  let location = useLocation();
  location = location?.state || "/";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo_url, setPhotoUrl] = useState("");
  const { borderColor, bgColorAlt } = useSettings();
  const { createAccountWithEmailPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastSigningUp = toast.loading("Creating account...");
    try {
      createAccountWithEmailPassword(email, password)
        .then((res) => {
          updateProfile(res.user, {
            displayName: name,
            photoURL: photo_url,
          })
            .then(() => {
              const userDetails = {
                email: email,
                name: name,
                dp: photo_url,
              };

              axios
                .put("/user", userDetails)
                .then(() => {
                  toast.success("Signed up", { id: toastSigningUp });
                  navigate(location);
                })
                .catch((error) => {
                  console.error(error?.message);
                  toast.error(error?.message, { id: toastSigningUp });
                });
            })
            .catch((error) =>
              toast.error(error?.message, { id: toastSigningUp })
            );
        })
        .catch((error) => toast.error(error?.message, { id: toastSigningUp }));
    } catch (error) {
      console.error(error);
      toast.error(error?.message, { id: toastSigningUp });
    }
  };

  return (
    <Container className="section">
      <Helmet>
        <title>Register | Unity Plate</title>
      </Helmet>
      <form
        onSubmit={handleSubmit}
        className={`flex flex-col gap-4 p-4 rounded-lg border-4 border-b-8 ${borderColor} w-full max-w-sm text-lg`}
      >
        <Title>Register</Title>
        <input
          type="text"
          placeholder="Name"
          required
          autoComplete="true"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`border-2 ${borderColor} p-2 rounded-md outline-none`}
        />
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
          value={password}
          autoComplete="true"
          onChange={(e) => setPassword(e.target.value)}
          className={`border-2 ${borderColor} p-2 rounded-md outline-none`}
        />
        <input
          type="text"
          placeholder="Photo URL (Optional)"
          value={photo_url}
          autoComplete="true"
          onChange={(e) => setPhotoUrl(e.target.value)}
          className={`border-2 ${borderColor} p-2 rounded-md outline-none`}
        />
        <button
          type="submit"
          className={`${bgColorAlt} text-white py-3 px-3 rounded-md`}
        >
          Create Account
        </button>
        <p>
          Already have an account?{" "}
          <NavLink className={"text-indigo-700"} to="/login">
            Login
          </NavLink>
        </p>
        <div className="w-full flex flex-row gap-1 items-center justify-center">
          <span className="w-full h-[2px] bg-neutral-300 block"></span>
          <span className="text-neutral-600">or</span>
          <span className="w-full h-[2px] bg-neutral-300 block"></span>
        </div>
        <GoogleBtn title="Sign up with Google" />
      </form>
    </Container>
  );
};
export default Register;
