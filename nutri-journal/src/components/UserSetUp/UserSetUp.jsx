import { useState } from 'react';
import { UserNutrient, UserPhysique } from '../../components/Data/Data';

export default function UserSetup() {
  
  const [formToggle, setformToggle] = useState(false);

  const [NutrientFormState, setNutrientFormState] = useState({
    carbohydrate: 0,
    protein: 0,
    fat: 0,
    trans_Fat: 0,
    saturated_Fat: 0,
    polyunsaturated_Fat: 0,
    monounsaturated_Fat: 0,
    cholesterol: 0,
    sodium: 0,
    potassium: 0,
    fiber: 0,
    sugar: 0,
    vitamin_A: 0,
    vitamin_C: 0,
    calcium: 0,
    iron: 0,
  });

  const [PhysiqueFormState, setPhysiqueFormState] = useState({
    carbohydrate: 0,
    protein: 0,
    fat: 0,
    trans_Fat: 0,
    saturated_Fat: 0,
    polyunsaturated_Fat: 0,
    monounsaturated_Fat: 0,
    cholesterol: 0,
    sodium: 0,
    potassium: 0,
    fiber: 0,
    sugar: 0,
    vitamin_A: 0,
    vitamin_C: 0,
    calcium: 0,
    iron: 0,
  });

  const handlePhysiqueSubmit = (evt) => {
    evt.preventDefault();
    setformToggle(true);
  }

  const handleBack = (evt) => {
    evt.preventDefault();
    setformToggle(false);
  }

  const handleNutrientSubmit = (evt) => {
    evt.preventDefault();
  }

  function capitalizeFirstLetter(str) {
    return (str.charAt(0).toUpperCase() + str.slice(1)).replace("_", " ");
  }

  return (
    <div>
      <h1>User Set Up</h1>
      {!formToggle ?
        <>
          <form autoComplete="off" onSubmit={handlePhysiqueSubmit}>
            {UserPhysique.map((data) => (

              data == "gender" ?
              <select name="gender" required>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              :
              <>
                <input type='text' placeholder={capitalizeFirstLetter(data)} name={data} required></input>
              </>
            ))}
            <br></br>
            <button type="submit">Submit</button>
          </form>
          <br></br>
        </>
        :
        <>
          <button type="button" onClick={handleBack}>Back</button>
          <form autoComplete="off" onSubmit={handleNutrientSubmit}>
            {UserNutrient.map((data) => (
              <input type='text' placeholder={capitalizeFirstLetter(data)} name={data}></input>
            ))}
            <br></br>
            <button type="submit">Submit</button>
          </form>
        </>
      }
    </div>
  );
}