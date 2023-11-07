import toast from "react-hot-toast";
import Title from "../../components/Title/Title";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { updateProfile } from "firebase/auth";
import Container from "../../layout/Container";

const Account = () => {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);

  const update = (e) => {
    e.preventDefault();
    setEditing(false);

    const toastUpdatingProfile = toast.loading("Updating profile info...");

    const form = e.target;
    const email = form.email.value;
    const name = form.name.value;
    const dp = form.dp.value;

    updateProfile(user, { displayName: name, photoURL: dp })
      .then(() => {
        toast.success("Profile updated", { id: toastUpdatingProfile });
        // updateCurrentUser(auth.currentUser);
        // const user = { email, name, dp };
        // fetch("https://mongodb-server-flame.vercel.app/user", {
        //   method: "PUT",
        //   headers: {
        //     "content-type": "application/json",
        //   },
        //   body: JSON.stringify(user),
        // })
        //   .then(() => window.location.reload())
        //   .catch((error) => {
        //     console.error(error);
        //     toast.error(error.message);
        //   });
      })
      .catch((error) => {
        console.error(error);
        toast.error(error?.message, { id: toastUpdatingProfile });
      });
  };

  return (
    <Container
      className={`section mt py-4 px-3 flex flex-col items-center gap-4  text-lg text-slate-800`}
    >
      <Title>Account</Title>
      <form
        onSubmit={update}
        className="w-fit p-5 rounded-lg overflow-hidden border-4 border-slate-100"
      >
        <div className="flex flex-col sm:flex-row gap-5 items-center justify-center">
          <img
            src={
              user?.photoURL ||
              "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
            }
            alt=""
            className="w-[140px] aspect-square object-cover rounded-2xl"
          />

          <div className="flex flex-col gap-3 justify-center items-center w-full max-w-sm">
            {/* Input Div */}
            <div className="w-full flex flex-row gap-2 items-center">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                placeholder="Your name"
                name="name"
                defaultValue={user?.displayName}
                disabled={!editing}
                className={`w-full p-1 rounded-md text-slate-800
                bg-transparent outline-none border-2 focus:border-slate-300 ${
                  editing ? "border-slate-500" : "border-transparent"
                }`}
              />
            </div>
            {/* Input Div */}
            <div className="w-full sm:min-w-[340px] flex flex-row gap-2 items-center">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                placeholder="Your email"
                name="email"
                defaultValue={user?.email}
                disabled
                className={`w-full p-1 rounded-md text-slate-600 bg-transparent outline-none border-2 focus:border-slate-300 border-transparent`}
              />
            </div>
            {/* Input Div */}
            <div className="w-full flex flex-row gap-2 items-center">
              <label htmlFor="dp">DP:</label>
              <input
                type="text"
                placeholder="DP URL"
                name="dp"
                defaultValue={user?.photoURL}
                disabled={!editing}
                className={`w-full p-1 rounded-md text-slate-800
                bg-transparent outline-none border-2 focus:border-slate-300 ${
                  editing ? "border-slate-500" : "border-transparent"
                }`}
              />
            </div>
          </div>
        </div>

        <div className="w-full max-w-sm mx-auto mt-10">
          {editing ? (
            <button
              type="submit"
              className="rounded-md py-2 block mx-auto px-6 leading-1 min-h-fit h-fit bg-green-800 text-slate-300 capitalize text-lg"
            >
              Update
            </button>
          ) : (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setEditing(true);
              }}
              className="rounded-md py-2 block mx-auto px-6 leading-1 min-h-fit h-fit bg-blue-800 text-slate-300 capitalize text-lg"
            >
              Edit
            </button>
          )}
        </div>
      </form>
    </Container>
  );
};
export default Account;
