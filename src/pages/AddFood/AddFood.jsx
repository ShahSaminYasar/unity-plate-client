import { Helmet } from "react-helmet";
import AddFoodForm from "../../components/Forms/AddFoodForm/AddFoodForm";
import Title from "../../components/Title/Title";
import Container from "../../layout/Container";

const AddFood = () => {
  return (
    <Container className="page">
      <Helmet>
        <title>Add Food | Unity Plate</title>
      </Helmet>
      <Title>Add food</Title>
      <p className="w-full max-w-[750px] text-neutral-500 text-center mb-8">Fill up the following fields with authentic information about the food that you are going to donate. Your post will be visible to all users, you can update the details at any time.</p>
      <AddFoodForm />
    </Container>
  );
};
export default AddFood;
