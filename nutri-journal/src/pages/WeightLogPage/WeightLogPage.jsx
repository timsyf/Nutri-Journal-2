import WeightLog from '../../components/WeightLog/WeightLog';
import UserWeightChecker from '../../components/UserWeightChecker/UserWeightChecker';

export default function WeightLogPage(props) {

  return (
    <>
      <WeightLog elements = {props} />
      <UserWeightChecker elements = {props} />
    </>
  );
}