import UserCalorieChecker from "../../components/UserCalorieChecker/UserCalorieChecker";
import TotalCalories from "../../components/TotalCalories/TotalCalories";
import UserWeightChecker from "../../components/UserWeightChecker/UserWeightChecker";

export default function HomePage(props) {
    return (
      <>
        <UserCalorieChecker elements = {props} />
        <TotalCalories elements = {props} />
        <UserWeightChecker elements = {props} />
      </>
    );
  }