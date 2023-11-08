import PropTypes from "prop-types";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import useSettings from "../../../hooks/useSettings";
import toast from "react-hot-toast";
import Loading from "../../Loading/Loading";
import { useQuery } from "@tanstack/react-query";

const EditFoodForm = ({ food_id }) => {
  const { borderColor, bgGradient, primaryColor } = useSettings();
  const axios = useAxios();
  const { user } = useAuth();

  //   const [name, setName] = useState(food?.name);
  //   const [image, setImage] = useState(food?.image);
  //   const [donorEmail, setDonorEmail] = useState(food?.donor?.email);
  //   const [quantity, setQuantity] = useState(food?.quantity);
  //   const [pickup_location, setPickupLocation] = useState(food?.pickup_location);
  //   const [expiry_date, setExpiryDate] = useState(food?.expiry_date);
  //   const [additional_note, setAdditionalNote] = useState(food?.additional_note);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getFoodDetails", food_id],
    queryFn: () => {
      return axios.get(`/get-foods?id=${food_id}`);
    },
  });

  if (isLoading) return <Loading />;
  if (isError) return <h1>Error: {error}</h1>;

  const food = data?.data[0];

  const handleAddProduct = async (e) => {
    e.preventDefault();

    const toastUpdatingFood = toast.loading("Adding food item...");

    const form = e.target;

    const name = form?.food_name.value;
    const image = form?.food_image.value;
    const quantity = form?.food_quantity.value;
    const pickup_location = form?.food_pickup_location.value;
    const expiry_date = form?.food_expiry_date.value;
    const additional_note = form?.food_additional_note.value;

    const food = {
      donor: {
        email: user?.email,
      },
      name,
      image,
      quantity: Number(quantity),
      pickup_location,
      expiry_date,
      additional_note,
      status: "available",
    };

    // console.log(food);

    try {
      axios
        .put(`/edit-food/${food_id}`, food)
        .then((res) => {
          //   console.log(res);
          if (res?.data?.modifiedCount === 1) {
            toast.success("Updated food item", { id: toastUpdatingFood });
          } else {
            toast("Not sure if updated or not...", { id: toastUpdatingFood });
          }
        })
        .catch((error) =>
          toast.error(error?.message, { id: toastUpdatingFood })
        );
    } catch (error) {
      toast.error(error?.message, { id: toastUpdatingFood });
    }
  };

  return (
    <form
      onSubmit={handleAddProduct}
      className="form w-full grid md:grid-cols-2 gap-5"
    >
      <div className="flex flex-col gap-5">
        <input
          type="text"
          required
          placeholder="Food Name"
          defaultValue={food?.name}
          name="food_name"
          className={`${borderColor}`}
        />
        <input
          type="text"
          required
          placeholder="Food Image URL"
          defaultValue={food?.image}
          name="food_image"
          className={`${borderColor}`}
        />
        <div className="grid grid-cols-2 gap-5">
          <input
            type="number"
            required
            placeholder="Quantity"
            defaultValue={food?.quantity}
            name="food_quantity"
            className={`${borderColor}`}
          />
          <input
            type="date"
            required
            defaultValue={food?.expiry_date}
            name="food_expiry_date"
            placeholder="Expiry date"
            className={`${borderColor}`}
          />
        </div>
        <input
          type="text"
          required
          placeholder="Pickup location"
          defaultValue={food?.pickup_location}
          name="food_pickup_location"
          className={`${borderColor}`}
        />
      </div>
      <textarea
        cols="30"
        rows="10"
        placeholder="Additional note"
        defaultValue={food?.additional_note}
        name="food_additional_note"
        className={`${borderColor}`}
      ></textarea>
      <button
        type="submit"
        className={`bg-gradient-to-r ${bgGradient} py-3 px-4 ${primaryColor} rounded-md block w-fit mx-auto col-span-2`}
      >
        Add food item
      </button>
    </form>
  );
};

EditFoodForm.propTypes = {
  food_id: PropTypes.string,
};

export default EditFoodForm;
