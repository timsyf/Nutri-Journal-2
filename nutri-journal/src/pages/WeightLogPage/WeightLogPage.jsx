import WeightLog from '../../components/WeightLog/WeightLog';
import UserWeightChecker from '../../components/UserWeightChecker/UserWeightChecker';
import WeightLogDelete from '../../components/WeightLogDelete/WeightLogDelete';

export default function WeightLogPage(props) {

  return (
    <>
      <WeightLog elements = {props} />
      <WeightLogDelete elements = {props} />
      <UserWeightChecker elements = {props} />
    </>
  );
}