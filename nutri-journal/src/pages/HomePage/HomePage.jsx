import UserCalorieChecker from "../../components/UserCalorieChecker/UserCalorieChecker";
import TotalCalories from "../../components/TotalCalories/TotalCalories";
import UserWeightChecker from "../../components/UserWeightChecker/UserWeightChecker";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

export default function HomePage(props) {
  return (
    <>
    <Tabs defaultActiveKey="Meals" id="justify-tab-example" className="mb-3" justify>
      <Tab eventKey="Meals" title="Meals">
        <UserCalorieChecker elements = {props} />
      </Tab>
      <Tab eventKey="Calories" title="Calories">
        <TotalCalories elements = {props} />
      </Tab>
      <Tab eventKey="Weight" title="Weight">
        <UserWeightChecker elements = {props} />
      </Tab>
    </Tabs>
    </>
  );
}