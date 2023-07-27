import UserCalorieCheckIn from '../../components/UserCalorieCheckIn/UserCalorieCheckIn';
import DeleteMeal from '../../components/DeleteMeal/DeleteMeal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

export default function CaloriesCheckIn(props) {
  return (
    <>
      <Tabs defaultActiveKey="Add" id="justify-tab-example" className="mb-3" justify>
        <Tab eventKey="Add" title="Add Meal">
          <UserCalorieCheckIn elements = {props} />
        </Tab>
        <Tab eventKey="Delete" title="Delete Meal">
          <DeleteMeal elements = {props} />
        </Tab>
      </Tabs>
    </>
  );
}