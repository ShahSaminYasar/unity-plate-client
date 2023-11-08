import { useParams } from "react-router-dom";
import EditFoodForm from "../../components/Forms/EditFoodForm/EditFoodForm";
import Title from "../../components/Title/Title";
import Container from "../../layout/Container";
import { Helmet } from "react-helmet";

const EditFood = () => {
  const { food_id } = useParams();
  return (
    <Container className="page">
      <Helmet>
        <title>Edit Food | Unity Plate</title>
      </Helmet>
      <Title>Edit food</Title>
      <p className="w-full max-w-[750px] text-neutral-500 text-center mb-8">
        Fill up the following fields with authentic information about the food
        that you are going to donate. Your post will be visible to all users,
        you can update the details at any time.
      </p>
      <EditFoodForm food_id={food_id} />
    </Container>
  );
};
export default EditFood;
