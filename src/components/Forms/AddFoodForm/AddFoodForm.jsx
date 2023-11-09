import { useState } from "react";
import useSettings from "../../../hooks/useSettings";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import toast from "react-hot-toast";

const AddFoodForm = () => {
  const { borderColor, bgGradient, primaryColor } = useSettings();
  const axios = useAxios();
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [donorEmail, setDonorEmail] = useState(user?.email);
  const [quantity, setQuantity] = useState(0);
  const [pickup_location, setPickupLocation] = useState("");
  const [expiry_date, setExpiryDate] = useState("");
  const [additional_note, setAdditionalNote] = useState("");

  const handleAddProduct = async (e) => {
    e.preventDefault();

    const toastAddingFood = toast.loading("Adding food item...");

    const food = {
      donor: {
        email: donorEmail,
      },
      name,
      image,
      quantity: Number(quantity),
      pickup_location,
      expiry_date,
      additional_note,
      status: "available",
    };

    try {
      axios
        .post("/add-food", food)
        .then((res) => {
          toast.success("Added food item", { id: toastAddingFood });
        })
        .catch((error) => toast.error(error?.message, { id: toastAddingFood }));
    } catch (error) {
      toast.error(error?.message, { id: toastAddingFood });
    }
  };

  return (
    <form
      onSubmit={handleAddProduct}
      className="form w-full grid grid-cols-1 md:grid-cols-2 gap-5"
    >
      <div className="flex flex-col gap-5">
        <input
          type="text"
          placeholder="Food Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`${borderColor}`}
        />
        <input
          type="text"
          placeholder="Food Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className={`${borderColor}`}
        />
        <div className="grid grid-cols-2 gap-5">
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className={`${borderColor}`}
          />
          <input
            type="date"
            value={expiry_date}
            onChange={(e) => setExpiryDate(e.target.value)}
            placeholder="Expiry date"
            className={`${borderColor}`}
          />
        </div>
        <input
          type="text"
          placeholder="Pickup location"
          value={pickup_location}
          onChange={(e) => setPickupLocation(e.target.value)}
          className={`${borderColor}`}
        />
      </div>
      <textarea
        cols="30"
        rows="10"
        placeholder="Additional note"
        value={additional_note}
        onChange={(e) => setAdditionalNote(e.target.value)}
        className={`${borderColor}`}
      ></textarea>
      <button
        type="submit"
        className={`bg-gradient-to-r ${bgGradient} py-3 px-4 ${primaryColor} rounded-md block w-full md:w-fit mx-auto md:col-span-2`}
      >
        Add food item
      </button>
    </form>
  );
};
export default AddFoodForm;
