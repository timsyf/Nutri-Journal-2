import WeightLog from '../../components/WeightLog/WeightLog';
import UserWeightChecker from '../../components/UserWeightChecker/UserWeightChecker';
import WeightLogDelete from '../../components/WeightLogDelete/WeightLogDelete';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

export default function WeightLogPage(props) {

  return (
    <>
      <Tabs defaultActiveKey="Weight" id="justify-tab-example" className="mb-3" justify>
        <Tab eventKey="Weight" title="Weight">
          <UserWeightChecker elements = {props} />
        </Tab>
        <Tab eventKey="Add" title="Add">
          <WeightLog elements = {props} />
        </Tab>
        <Tab eventKey="Delete" title="Delete">
          <WeightLogDelete elements = {props} />
          <UserWeightChecker elements = {props} />
        </Tab>
      </Tabs>
    </>
  );
}