import UserCalorieChecker from "../../components/UserCalorieChecker/UserCalorieChecker";
import TotalCalories from "../../components/TotalCalories/TotalCalories";

export default function HomePage(props) {
    return (
      <>
        <UserCalorieChecker elements = {props} />
        <TotalCalories elements = {props} />
      </>
    );
  }