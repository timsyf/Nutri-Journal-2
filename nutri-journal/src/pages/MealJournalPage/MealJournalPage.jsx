import UserCalorieCheckIn from '../../components/UserCalorieCheckIn/UserCalorieCheckIn';
import DeleteMeal from '../../components/DeleteMeal/DeleteMeal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useState } from "react";

export default function CaloriesCheckIn(props) {
  
  const [updated, setUpdated] = useState(false);

  function getCurrentTime() {
    console.log(updated);
  }
  getCurrentTime();

  return (
    <>
      <Tabs defaultActiveKey="Add" id="justify-tab-example" className="mb-3" justify>
        <Tab eventKey="Add" title="Add Meal">
          <UserCalorieCheckIn elements={props} setUpdated={setUpdated} />
        </Tab>
        <Tab eventKey="Delete" title="Delete Meal">
          <DeleteMeal elements={props} updated={updated} setUpdated={setUpdated} />
        </Tab>
      </Tabs>
    </>
  );
}